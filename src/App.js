import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Sample1 from './examples/Sample1';
import Sample2 from './examples/Sample2';
import Sample3 from './examples/Sample3';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/component1" element={<Sample1/>}/>
        <Route exact path="/component2" element={<Sample2/>}/>
        <Route exact path="/component3" element={<Sample3/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App