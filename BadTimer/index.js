const df = require("durable-functions");

module.exports = df.orchestrator(function* (context) {
    const inOneMinute = new Date(new Date().getTime() + 60000);
    yield context.df.createTimer(inOneMinute);
    context.log('The above line should fail during replay.')
});