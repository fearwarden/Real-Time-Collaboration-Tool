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
          <div className="w-1/5 h-full bg-white">
            <p>Hellow</p>
          </div>
          <canvas className="grow" ref={canvas} id="myCanvas" width="100%" height="100%" style={{background: "grey"}}></canvas>
        </div>
      </>
    );
}

export default StrategyPage