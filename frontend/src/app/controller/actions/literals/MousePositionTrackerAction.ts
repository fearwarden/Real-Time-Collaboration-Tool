import Main from "../../../Main";
import AbstractMouseAction from "../AbstractMouseAction";

export default class MousePositionTrackerAction extends AbstractMouseAction {
	constructor() {
		super(HTMLCanvasElement);
	}

	onMouseMove(e: MouseEvent): void {
		if (!(e.target instanceof HTMLCanvasElement)) return;
		const canvas = Main.getInstance().canvas!;
		Main.getInstance().stompClient.send("/live/mouse-position", {
			userId: Main.getInstance().userId,
			x: (e.clientX - e.target!.offsetLeft) / canvas.width,
			y: (e.clientY - e.target!.offsetTop) / canvas.height,
		});
	}
	onMouseEnter(): void {
		throw new Error("Method not implemented.");
	}
	onMouseLeave(): void {
		throw new Error("Method not implemented.");
	}
	onMouseDown(): void {
		throw new Error("Method not implemented.");
	}
	onMouseUp(): void {
		throw new Error("Method not implemented.");
	}
	onWheel(): void {
		throw new Error("Method not implemented.");
	}
}
