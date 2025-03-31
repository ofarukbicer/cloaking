require("dotenv").config();
const http = require("http");
const httpProxy = require("http-proxy");

const targets = {
  default: process.env.DEFAULT_URL,
  bot: process.env.BOT_URL,
  unknown: process.env.UNKNOWN_URL,
};

// Çevre değişkenlerini kontrol et
function checkEnvVariables(targets) {
  Object.entries(targets).forEach(([key, value]) => {
    if (!value) {
      console.warn(
        `⚠️ WARNING: Environment variable "${key.toUpperCase()}" is missing!`
      );
    } else {
      console.log(`✅ "${key.toUpperCase()}" is set: ${value}`);
    }
  });
}

checkEnvVariables(targets);

// Proxy sunucusunu oluştur
const proxy = httpProxy.createProxyServer();

const server = http.createServer((req, res) => {
  const userIP = req.connection.remoteAddress || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const referer = req.headers["referer"];

  console.log(`📡 New Request: IP: ${userIP}, User-Agent: ${userAgent}`);

  let target = targets.default; // Varsayılan hedef

  if (userAgent && /googlebot|yandexbot|bingbot/i.test(userAgent)) {
    console.log("🤖 Bot detected! Redirecting to bot server...");
    target = targets.bot;
  } else if (!referer) {
    console.log(
      "🚨 Suspicious access detected! Redirecting to unknown server..."
    );
    target = targets.unknown;
  } else {
    console.log("👤 Normal user detected! Redirecting to default server...");
  }

  proxy.web(
    req,
    res,
    { target: target + req?.url ?? "", changeOrigin: true },
    (err) => {
      console.error("❌ Proxy error:", err);
      res.writeHead(500, { "Content-Type": "text/plain" });
      res.end("Proxy error occurred.");
    }
  );
});

const PORT = 8080;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Proxy server is running on port ${PORT}...`);
});
