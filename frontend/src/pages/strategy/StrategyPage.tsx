import React, { useEffect, useRef } from "react";
import Main from "../../app/Main";
import SideMenu from "./components/SideMenu";

function StrategyPage() {
	const canvas = useRef<HTMLCanvasElement | null>(null);

	useEffect(() => {
		if (canvas.current != null) {
			Main.getInstance().canvas = canvas.current!;
			Main.getInstance().stompClient.connect();
		}
	}, [canvas]);

	return (
		<>
			<div className="flex w-full h-full">
				<div className="w-1/5 h-full bg-white">
					<SideMenu></SideMenu>
				</div>
				<canvas
					className="grow"
					ref={canvas}
					id="myCanvas"
					width="500"
					height="500"
					style={{ background: "grey" }}></canvas>
			</div>
		</>
	);
}

export default StrategyPage;
