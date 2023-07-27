import React, {useEffect, useRef} from 'react';
import Main from '../../app/Main';

function StrategyPage() {
    const canvas = useRef<HTMLCanvasElement | null>(null);

    useEffect(() => {
      if(canvas.current != null) {
        Main.getInstance().setCanvas = canvas.current!;
        Main.getInstance().getStompClient.connect();
      }
    }, [canvas])
    
    return (
      <>
        <div className="flex w-full h-full">
          <div className=" h-full bg-white">
          </div>
          <canvas ref={canvas} id="myCanvas" width="auto" height="auto" style={{background: "grey"}}></canvas>
        </div>
      </>
    );
}

export default StrategyPage