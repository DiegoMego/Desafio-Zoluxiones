module.exports.requestProcessor = (event) => {
  console.log('Begin Processing Request Api Gateway Proxy');

  const context = event.requestContext;
  let params = {};
  if (context.http.method === 'POST')
    params = event.body ? JSON.parse(event.body) : {};
  else if (context.http.method === 'GET')
    params = event.queryStringParameters || {};

  const payload = {
      headers: event.headers,
      context,
      httpMethod: String(context.http.method).toUpperCase(),
      params,
      path: context.http.path,
    };

  return payload
}