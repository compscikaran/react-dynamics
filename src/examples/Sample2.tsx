import React from 'react';
import withDynamics from "../lib/DynamicsWrapper"

const Sample2 = () => {
  return (
    <div style={{height: '100px', width: '100px'}}>This is Sample Component 2</div>
  )
}

export default withDynamics(Sample2, 'sample2')