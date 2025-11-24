import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/proxy", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("URL não fornecida.");
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    if (contentType) res.set("content-type", contentType);

    response.body.pipe(res);
  } catch (error) {
    res.status(500).send("Erro ao carregar stream.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log("Proxy rodando na porta " + PORT));
