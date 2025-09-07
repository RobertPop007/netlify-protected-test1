exports.handler = async (event, context) => {
  const url = new URL(event.rawUrl);
  return {
    statusCode: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Protected"' },
    body: "Debug: 401 from function at " + url.pathname
  };
};