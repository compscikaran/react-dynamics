import _ from 'lodash';
import React, { lazy, Suspense, useEffect, useState } from 'react'
import withDynamics from "../lib/DynamicsWrapper";


type TestInput = {
  hello: string;
}

const Sample3 = () => {

  const [x, setX] = useState(false);
  const testMethod = (param: TestInput) => {
    throw new Error("Hello");
  }

  useEffect(() => {
    setX(true);
  }, []);

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