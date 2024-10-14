// App.js
import React from 'react';
import P5Wrapper from './components/p5wrapper/P5wrapper';
import { simpleSketch } from './components/sketches/simpleSketch';
import './App.css'

function App() {
  return (
    <div className='app-container'>
      <h1>p5.js in React</h1>
      <P5Wrapper sketch={simpleSketch} />
    </div>
  );
}

export default App;
