# React Dynamics


![workflow](https://github.com/compscikaran/react-dynamics/actions/workflows/npm-publish.yml/badge.svg)


## How the idea came about

The idea is kind of is inspired by a monitoring tool called AppDynamics which is used for monitoring Java applications and I thought why not have something simillar for React. This tool captures metrics such as errors, mounts, mouse clicks etc which could be helpful for diagnosing errors and inform product decisions. The tool is lightweight and will not have much impact on application performance.

![Emerald](https://user-images.githubusercontent.com/15171039/230698828-801ba4e8-f1d3-4bba-ab47-6ef103f3d83b.png)

------------------------
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
        apiUrl: 'https://google/com',
        devConsole: true
    });

    ```

| Parameter      | Value |
| ----------- | ----------- |
| applicationName      | Unique app name used while capturing telemetry      |
| captureEvents   | Which events should be captured at component level. e.g. MOUNT, ERROR, MOUSECLICK      |
| apiUrl | Backend URL where telemetry data is to be sent |
| devConsole | Allows telemetry data to be printed in Chrome dev console |

----------------------------

This project was proudly bootstrapped with [Create React App](https://github.com/facebook/create-react-app).
