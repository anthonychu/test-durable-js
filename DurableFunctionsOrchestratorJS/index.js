const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const req = new df.DurableHttpRequest('GET', 'https://api.github.com/users/anthonychu/events');
    const response = yield context.df.callHttp(req);
    return response;
});