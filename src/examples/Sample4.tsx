import React from 'react'
import { useDynamics } from '../lib/useDynamics'

const Sample4 = () => {

  const ref = useDynamics('sample4')

  return (
    <div style={{height: '100px', width: '100px'}} ref={ref}>This is Sample Component 4</div>
  )
}

export default Sample4