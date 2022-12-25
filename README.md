# Project Emerald

## How the idea came about

I started my career mainly working on the backend with Java and we had a monitoring tool called AppDynamics setup where I worked. This tool captured all kinds of metrics, errors, usage statistics etc which were very helpful in diagnosing issues. One day a light bulb went off in my head as to why we cannot have a simillar solution for Frontend apps which is lightweight and does not have performance impact.

------------------------
## How the solution is designed

![image](./design.png)


The basic idea is to allow the consuming application to setup collection of metrics in a generic way. The telemetry is then batched up into the browser storage and sent at regular intervals to a configurable application endpoint by a Service Worker.

------------------------
## How to set it up

1. Register the application with Emerald by calling below method in application's index file.
    
    ```js
        registerEmerald('SampleApplication1');
    ```

2. Use included HOC to wrap the components for which you would like to collect metrics

    ```js
    const Sample1 =  () => {
        return (
        ...
        )
    }

    export default withEmerald(Sample1, 'sample1');
    ```
    This HOC Allows the component to deposit the telemetry into the browser storage.

3. Included Service Worker into your application's public folder.

    > public/emeraldWorker.js 

----------------------------

This project was proudly bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
