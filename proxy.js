const http = require("http");
const { createProxyMiddleware } = require("http-proxy-middleware");

const targets = {
  default: "http://localhost:8080",
  bot: "http://localhost:8081",
  unknown: "http://google.com",
};

const server = http.createServer((req, res) => {
  const userAgent = req.headers["user-agent"];
  const referer = req.headers?.["referer"];

  if (
    userAgent &&
    (userAgent.toLocaleLowerCase().includes("googlebot") ||
      userAgent.toLocaleLowerCase().includes("yandexbot") ||
      userAgent.toLocaleLowerCase().includes("bingbot"))
  ) {
    console.log("Bot tespit edildi! bot sunucusuna yönlendiriliyor...");
    createProxyMiddleware({ target: targets.bot })(req, res);
    return;
  }

  if (!referer) {
    console.log("Girmemesi gereken birisi siteye erişti");
    createProxyMiddleware({ target: targets.unknown })(req, res);
    return;
  }

  console.log(
    "Normal kullanıcı tespit edildi! Varsayılan sunucuya yönlendiriliyor..."
  );
  createProxyMiddleware({ target: targets.default })(req, res);
});

const PORT = 1453;
server.listen(PORT, () => {
  console.log(`Proxy sunucusu ${PORT} portunda çalışıyor...`);
});
