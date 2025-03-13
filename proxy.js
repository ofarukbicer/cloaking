require("dotenv").config();
const http = require("http");
const { createProxyMiddleware } = require("http-proxy-middleware");

const targets = {
  default: process.env.DEFAULT_URL,
  bot: process.env.BOT_URL,
  unknown: process.env.UNKNOWN_URL,
};

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

const server = http.createServer((req, res) => {
  const userIP = req.connection.remoteAddress || req.socket.remoteAddress;
  const userAgent = req.headers["user-agent"];
  const referer = req.headers["referer"];

  console.log(`📡 New Request: IP: ${userIP}, User-Agent: ${userAgent}`);

  if (
    userAgent &&
    (userAgent.toLowerCase().includes("googlebot") ||
      userAgent.toLowerCase().includes("yandexbot") ||
      userAgent.toLowerCase().includes("bingbot"))
  ) {
    console.log("🤖 Bot detected! Redirecting to bot server...");
    return createProxyMiddleware({ target: targets.bot })(req, res);
  }

  if (!referer) {
    console.log(
      "🚨 Suspicious access detected! Redirecting to unknown server..."
    );
    return createProxyMiddleware({ target: targets.unknown })(req, res);
  }

  console.log("👤 Normal user detected! Redirecting to default server...");
  return createProxyMiddleware({ target: targets.default })(req, res);
});

const PORT = 8080;
server.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Proxy server is running on port ${PORT}...`);
});
