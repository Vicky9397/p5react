import React, { useState } from 'react';
import P5Wrapper from './components/p5wrapper/P5wrapper';
import { sketches } from './components/utils/sketchList';
import './App.css';

function App() {
  // State to store the selected sketch
  const [selectedSketch, setSelectedSketch] = useState('Simple');

  // Function to handle dropdown selection change
  const handleSketchChange = (event) => {
    setSelectedSketch(event.target.value); // Update the selected sketch based on user input
  };

  return (
    <div className='app-container'>
      <h1>p5.js in React</h1>
      
      {/* p5.js Wrapper rendering the selected sketch */}
      <P5Wrapper sketch={sketches[selectedSketch]} />

      {/* Dropdown to select sketch */}
      <div className="dropdown-container">
        <label htmlFor="sketch-select">Choose a sketch: </label>
        <select
          id="sketch-select"
          value={selectedSketch}
          onChange={handleSketchChange}
        >
          {/* Render options dynamically based on available sketches */}
          {Object.keys(sketches).map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}

export default App;