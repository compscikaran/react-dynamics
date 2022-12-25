import React from 'react';
import withEmerald from "../lib/EmeraldWrapper";

const Sample2 = () => {
  return (
    <div style={{height: '100px', width: '100px'}}>This is Sample Component 2</div>
  )
}

export default withEmerald(Sample2, 'sample2');