import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Sample1 from './Sample1';
import Sample2 from './Sample2';
import Sample3 from './Sample3';
import Menu from './Menu';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Menu/>}/>
        <Route exact path="/component1" element={<Sample1/>}/>
        <Route exact path="/component2" element={<Sample2/>}/>
        <Route exact path="/component3" element={<Sample3/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App