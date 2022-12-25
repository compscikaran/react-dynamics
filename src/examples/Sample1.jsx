import React from 'react';
import withEmerald from "../lib/EmeraldWrapper";

const Sample1 = () => {
  return (
    <div style={{height: '100px', width: '100px'}}>This is Sample Component 1</div>
  )
}

export default withEmerald(Sample1, 'sample1');