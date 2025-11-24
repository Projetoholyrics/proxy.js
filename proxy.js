// Proxy anti-CORS para IPTV
// Permite carregar .m3u8 no navegador sem bloqueio

const express = require("express");
const fetch = require("node-fetch");
const app = express();

app.get("/proxy", async (req, res) => {
  const url = req.query.url;

  if (!url) {
    return res.status(400).send("URL não definida");
  }

  try {
    const response = await fetch(url);
    const contentType = response.headers.get("content-type");

    res.set("Access-Control-Allow-Origin", "*");
    res.set("Content-Type", contentType);

    response.body.pipe(res);
  } catch (err) {
    res.status(500).send("Erro ao carregar stream");
  }
});

// Porta padrão
app.listen(3000, () => {
  console.log("Proxy IPTV rodando em http://localhost:3000/proxy?url=");
});
