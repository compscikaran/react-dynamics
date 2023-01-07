# Project Emerald


![workflow](https://github.com/compscikaran/emerald-toolkit/actions/workflows/npm-publish.yml/badge.svg)


## How the idea came about

I started my career mainly working on the backend with Java and we had a monitoring tool called AppDynamics setup where I worked. This tool captured all kinds of metrics, errors, usage statistics etc which were very helpful in diagnosing issues. One day a light bulb went off in my head as to why we cannot have a simillar solution for Frontend apps which is lightweight and does not have performance impact.


![App architecture](https://i.ibb.co/JnZC5yr/Emerald.png)


------------------------
## How to set it up

1. Use included HOC to wrap the components for which you would like to collect metrics

    ```js
    const Sample1 =  () => {
        return (
        ...
        )
    }

    export default withEmerald(Sample1, 'sample1');
    ```
    This HOC Allows the component to communicate with our telemetry capture services

2. Included Emerald Worker into your application's public folder.

    > public/emeraldWorker.js 

    The worker is responsible for dispatching the telemetry to your backend

3. Configure the application to use Emerald Toolkit by calling below method in application's index file.
    
    ```js
    configureEmerald({
        applicationName: 'SampleApplication1',
        captureEvents: [EmeraldEvents.MOUNT, EmeraldEvents.ERROR],
        apiUrl: 'https://google/com',
        devConsole: true
    });

    ```


----------------------------

This project was proudly bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
