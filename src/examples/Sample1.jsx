import React from 'react';
import withDynamics from "../lib/DynamicsWrapper";

const Sample1 = () => {
  return (
    <div style={{height: '100px', width: '100px'}}>This is Sample Component 1</div>
  )
}

export default withDynamics(Sample1, 'sample1');