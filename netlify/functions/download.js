/**
 * Single-file protected download: test1.mp4
 * Auth: robert / 1234
 * URL: https://<site>.netlify.app/download/test1.mp4
 */
export default async (event, context) => {
  const url = new URL(event.rawUrl);
  const name = decodeURIComponent(url.pathname.split("/").pop() || "");

  // Only allow exact file name
  if (name !== "test1.mp4") {
    return { statusCode: 404, body: "Not found" };
  }

  // Basic Auth (robert:1234)
  const expected = "Basic " + Buffer.from("robert:1234").toString("base64");
  const auth = event.headers.authorization || "";
  if (auth !== expected) {
    return {
      statusCode: 401,
      headers: { "WWW-Authenticate": 'Basic realm="Protected"' },
      body: "Auth required",
    };
  }

  try {
    const fs = await import("fs/promises");
    const path = await import("path");
    const filePath = path.join(process.cwd(), "assets", "test1.mp4");
    const data = await fs.readFile(filePath);

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
    return { statusCode: 500, body: "File read error" };
  }
};