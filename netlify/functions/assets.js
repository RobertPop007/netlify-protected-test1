/**
 * Production Netlify Function (CommonJS) for /assets/:name
 * - Basic Auth per file via CREDENTIALS
 * - Serves files from /private_assets
 */
const fs = require("fs");
const path = require("path");

const CREDENTIALS = {
  // filename: { user, pass, mime }
  "test1.mp4": { user: "robert", pass: "1234", mime: "video/mp4" },
  // Add new entries below, e.g.:
  // "anim1.gif": { user: "ana",  pass: "1111", mime: "image/gif" },
  // "clip2.mp4": { user: "mihai", pass: "2222", mime: "video/mp4" },
};

function guessMime(name) {
  if (CREDENTIALS[name]?.mime) return CREDENTIALS[name].mime;
  const ext = (name.split(".").pop() || "").toLowerCase();
  if (ext === "gif") return "image/gif";
  if (ext === "mp4") return "video/mp4";
  return "application/octet-stream";
}

function resolveAsset(name) {
  const candidates = [
    path.join(__dirname, "..", "..", "private_assets", name),
    path.join(__dirname, "..", "private_assets", name),
    path.join(process.cwd(), "private_assets", name),
    path.join(process.env.LAMBDA_TASK_ROOT || __dirname, "private_assets", name),
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) return p;
  }
  return null;
}

exports.handler = async (event, context) => {
  try {
    const url = new URL(event.rawUrl);
    const name = decodeURIComponent(url.pathname.split("/").pop() || "");

    const entry = CREDENTIALS[name];
    if (!entry) return { statusCode: 404, body: "Not found" };

    // BASIC AUTH
    const expected = "Basic " + Buffer.from(`${entry.user}:${entry.pass}`).toString("base64");
    const auth = event.headers.authorization || "";
    if (auth !== expected) {
      return {
        statusCode: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Protected"' },
        body: "Auth required",
      };
    }

    // READ FILE
    const filePath = resolveAsset(name);
    if (!filePath) return { statusCode: 500, body: "Asset not found at runtime" };

    const data = fs.readFileSync(filePath);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": guessMime(name),
        "Content-Disposition": `attachment; filename="${name}"`,
        "Cache-Control": "no-store",
      },
      body: Buffer.from(data).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (e) {
    return { statusCode: 500, body: "Server error" };
  }
};