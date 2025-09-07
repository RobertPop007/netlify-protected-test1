/**
 * CommonJS Netlify Function: password-protected download of test1.mp4
 * Auth: robert / 1234
 * URL: /download/test1.mp4
 */
exports.handler = async (event, context) => {
  try {
    const url = new URL(event.rawUrl);
    const name = decodeURIComponent(url.pathname.split("/").pop() || "");
    if (name !== "test1.mp4") return { statusCode: 404, body: "Not found" };

    const expected = "Basic " + Buffer.from("robert:1234").toString("base64");
    const auth = event.headers.authorization || "";
    if (auth !== expected) {
      return {
        statusCode: 401,
        headers: { "WWW-Authenticate": 'Basic realm="Protected"' },
        body: "Auth required",
      };
    }

    const fs = require("fs");
    const path = require("path");
    const filePath = path.join(process.cwd(), "assets", "test1.mp4");
    const data = fs.readFileSync(filePath);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "video/mp4",
        "Content-Disposition": 'attachment; filename="test1.mp4"',
        "Cache-Control": "no-store",
      },
      body: Buffer.from(data).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (e) {
    return { statusCode: 500, body: e };
  }
};