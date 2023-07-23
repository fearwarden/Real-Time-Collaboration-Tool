import { useEffect, useState, useRef } from "react";
import SockJS from "sockjs-client";
import { CompatClient, Stomp } from "@stomp/stompjs";
import { v4 as generateUUID} from "uuid";
import React from "react";

function App() {
  
  const [stompClient, setStompClient] = useState<CompatClient | null>(null);
  const [uuid, setUuid] = useState(generateUUID());

  const canvas = useRef<HTMLCanvasElement | null>(null);

  // Set the initial position of the dot
  let x = 250;
  let y = 250;

  let dotSize = 10;
  

  function connect() {
    console.log("Connected")
    var socket = new SockJS('http://localhost:8080/ws');
    let sc = Stomp.over(socket);
    sc.debug = () => {};

    sc.connect({}, function (frame: any) {
        //console.log('Connected: ' + frame);
        sc.subscribe('/topic/strategies', function (message) {
          const data = JSON.parse(message.body)
          if(data.userId === uuid) return;
          // Keep the dot within the canvas boundaries
          x = data.x;
          y = data.y;
          x = Math.max(dotSize, Math.min(500 - dotSize, x));
          y = Math.max(dotSize, Math.min(500- dotSize, y));

          // Redraw the dot at the new position
          drawDot();
          console.log(data);
        });
    });
    setStompClient(sc);
  }

  function disconnect() {
      if (stompClient !== null) {
          stompClient.disconnect();
      }
      console.log("Disconnected");
  }

  function send(endpoint: string, message: object) {
    if(stompClient == null) return;   
    stompClient.send(endpoint, {}, JSON.stringify(message));
  }

  function drawDot() {
    if(canvas.current == undefined) return;
    const ctx = canvas.current.getContext('2d');
    if(ctx == null) return;
    ctx.clearRect(0, 0, 500, 500);
    ctx.beginPath();
    ctx.arc(x, y, 10, 0, 2 * Math.PI);
    ctx.fillStyle = 'blue';
    ctx.fill();
    ctx.closePath();
  }
  


  useEffect(() => {
    if(!stompClient) {
      connect();
    }
  }, [])

  
  return (
    <canvas ref={canvas} id="myCanvas" width="500" height="500" style={{background: "grey"}} onMouseMove={(e) => {
      send("/live/mouse-position", {
        userId: uuid,
        x: e.clientX,
        y: e.clientY
      })
    }}></canvas>
  );
}

export default App;
