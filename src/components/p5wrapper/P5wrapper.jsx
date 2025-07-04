// P5Wrapper.js
import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

const P5Wrapper = ({ sketch }) => {
  const sketchRef = useRef();

  useEffect(() => {
    const canvas = new p5(sketch, sketchRef.current);
    
    return () => {
      canvas.remove(); // Clean up the sketch on component unmount
    };
  }, [sketch]);
  useEffect(() => {
  const handler = (e) => {
    const arrowKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '];
    if (arrowKeys.includes(e.key)) {
      e.preventDefault(); // ✅ Stop arrow keys from affecting dropdown
    }
  };

  window.addEventListener('keydown', handler);
  return () => {
    window.removeEventListener('keydown', handler); // Cleanup on unmount
  };
}, []);

  return <div ref={sketchRef}></div>;
};

export default P5Wrapper;
