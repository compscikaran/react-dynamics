import _ from 'lodash';
import React, { lazy, Suspense, useState } from 'react'
import withDynamics from "../lib/DynamicsWrapper";

const Sample3 = () => {

  const [x, setX] = useState(false);
  setTimeout(() => setX(true), 5000);
  const testMethod = (param) => {
    if(typeof param == 'object') {
        throw "400 Error";
    } else if(typeof param == 'string') {
        throw new Error("Hello");
    }
    return param;   
  }
  return (
    <Suspense>
        <div style={{height: '100px', width: '100px'}}>
            This is Sample Component 3 with value
            <br/>
            {x && testMethod({hello: 'hello'})}
        </div>
    </Suspense>
  )
}

export default withDynamics(Sample3, 'component3');