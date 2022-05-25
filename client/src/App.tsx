import React, { useEffect, useRef, useState } from 'react';
import { createEngine, engine } from './modules';
import "./App.css"
import Duri from './components/Duri';

function App() {
  const canvas = useRef<HTMLCanvasElement>(null);
  const [load, setLoad] = useState(false)
  useEffect(()=> {
    if (canvas.current && !load) {
      createEngine(canvas.current);
      setLoad(true);
    }
  }, [load])
  return (
    <>
      <canvas id='myCanvas' ref={canvas}></canvas>
      <Duri Engineloaded={load} />
    </>
  );
}

export default App;
