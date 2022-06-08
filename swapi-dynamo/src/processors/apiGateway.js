module.exports.requestProcessor = (event) => {
  console.log('Begin Processing Request Api Gateway Proxy');

  const context = event.requestContext;
  const params = event.queryStringParameters || {};

  const payload = {
      headers: event.headers,
      context,
      httpMethod: String(context.http.method).toUpperCase(),
      params,
      path: context.http.path,
    };

  return payload
}