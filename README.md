## Initialize app

```bash
npm i
func extensions install
cp local.settings.SAMPLE.json local.settings.json
# Add storage connection string to local.settings.json
func start
```

## callHttp failing

1. Call `http://localhost:7071/api/orchestrators/DurableFunctionsOrchestratorJS` to start the orchestrator that makes an http call.
1. Get the `statusQueryGetUri` in the response and use it to check the status. It should show an error:
    ```json
    {
        "name":"DurableFunctionsOrchestratorJS","instanceId":"d38d33aea86342c28a27b571def7e720",
        "runtimeStatus":"Failed",
        "input":null,
        "customStatus":null,
        "output":"Unexpected token while deserializing object: PropertyName. Path 'actions[0][0].actionType', line 12, position 21.",
        "createdTime":"2019-11-17T06:54:36Z",
        "lastUpdatedTime":"2019-11-17T06:54:37Z"
    }
    ```

## Attempting to start an orchestrator that doesn't exist does not return a useful error message

1. Attempt to start a non-existent orchestrator: `http://localhost:7071/api/orchestrators/foo`.
1. A 500 error is returned and the function returns an error message that doesn't explain the problem:
    ```
    [2019-11-17 7:00:36 AM] Executed 'Functions.DurableFunctionsHttpStart' (Failed, Id=03d3aa5b-23f2-4ca3-b0de-a282adb4a52d)
    [2019-11-17 7:00:36 AM] System.Private.CoreLib: Exception while executing function: Functions.DurableFunctionsHttpStart. System.Private.CoreLib: Result: Failure
    [2019-11-17 7:00:36 AM] Exception: Error: [object Object]
    [2019-11-17 7:00:36 AM] Stack: Error: [object Object]
    [2019-11-17 7:00:36 AM]     at DurableOrchestrationClient.<anonymous> (/Users/antchu/source/temp/test-durable-js/node_modules/durable-functions/lib/src/durableorchestrationclient.js:340:43)
    [2019-11-17 7:00:36 AM]     at Generator.next (<anonymous>)
    [2019-11-17 7:00:36 AM]     at fulfilled (/Users/antchu/source/temp/test-durable-js/node_modules/durable-functions/lib/src/durableorchestrationclient.js:4:58)
    [2019-11-17 7:00:36 AM]     at process._tickCallback (internal/process/next_tick.js:68:7).
    ```