# React Dynamics


![workflow](https://github.com/compscikaran/react-dynamics/actions/workflows/npm-publish.yml/badge.svg)


## How the idea came about

The idea is kind of is inspired by a monitoring tool called AppDynamics which is used for monitoring Java applications, the tool captures metrics such as errors, mounts, mouse clicks etc which could be helpful for diagnosing errors and inform product decisions. The tool is lightweight and will not have much impact on application performance.

## What is ReactDynamics

Here is some documentation - https://github.com/compscikaran/react-dynamics/wiki

Key Features -
1. Built around components so granularity at which data is captured is fully controlled. It can be configured at page level, sections or even individual fields
2. Stores telemetry in the browser itself hence backend calls are not required for each and every event being captured in the system
3. Captures lifecycle events such as mounting, unmounting which can be used for performance analysis
4. Captures error stacktraces using Error Boundary which can be used for debugging

## How to set it up

1. Install the agent library
   > npm i react-dynamics-agent

2. Use included HOC to wrap the components for which you would like to collect metrics

    ```js
    const Sample1 =  () => {
        return (
        ...
        )
    }

    export default withDynamics(Sample1, 'sample1');
    ```
    This HOC Allows the component to communicate with our telemetry capture services

3. Include Service Worker into your application's public folder.

    > public/dynamicsWorker.js 

    The worker is responsible for dispatching the telemetry to your backend

4. Configure the application to use ReactDynamics by calling below method in application's index file.
    
    ```js
    configureAnalytics({
        applicationName: 'SampleApplication1',
        captureEvents: [DynamicEvents.MOUNT, DynamicEvents.ERROR],
        captureAnonymizedId: true
    });

    ```

----------------------------

This project was proudly bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
