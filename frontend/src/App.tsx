import { useEffect, useRef } from "react";
import React from "react";
import Main from "./app/Main";

function App() {
  const canvas = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if(canvas.current != null) {
      Main.getInstance().setCanvas = canvas.current!;
      Main.getInstance().getStompClient.connect();
    }
  }, [canvas])
  
  return (
    <canvas ref={canvas} id="myCanvas" width="500" height="500" style={{background: "grey"}}></canvas>
  );
}

export default App;
