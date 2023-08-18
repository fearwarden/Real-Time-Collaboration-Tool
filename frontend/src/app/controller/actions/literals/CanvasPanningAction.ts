import Main from "../../../Main";
import CoordinateUtils, { Point } from "../../../utils/CoordinateUtils";
import AbstractMouseAction from "../AbstractMouseAction";

export default class CanvasPanningAction extends AbstractMouseAction {
	private isPanning: boolean;
	private panningStart: Point;

	constructor() {
		super(HTMLCanvasElement);
		this.panningStart = { x: 0, y: 0 };
		this.isPanning = false;
	}

	onMouseMove(e: MouseEvent): void {
		const canvas = Main.getInstance().canvas!;
		if (Main.getInstance().drawingStateManager.currentState) return;
		if (!this.isPanning || canvas.activeElement !== null) return;
		const mousePosition = CoordinateUtils.getCanvasMousePosition(e);
		canvas.cameraOffset.x = mousePosition.x - this.panningStart.x;
		canvas.cameraOffset.y = mousePosition.y - this.panningStart.y;
		canvas.cameraOffset = {
			x: Math.min(canvas.cameraOffset.x, canvas.width * 1.5),
			y: Math.min(canvas.cameraOffset.y, canvas.height * 1.5),
		};
		canvas.cameraOffset = {
			x: Math.max(canvas.cameraOffset.x, -canvas.width * 1.5),
			y: Math.max(canvas.cameraOffset.y, -canvas.height * 1.5),
		};
	}
	onMouseEnter(): void {
		throw new Error("Method not implemented.");
	}
	onMouseLeave(): void {
		this.isPanning = false;
	}
	onMouseDown(e: MouseEvent): void {
		if (Main.getInstance().drawingStateManager.currentState) return;
		const canvas = Main.getInstance().canvas!;
		const mousePosition = CoordinateUtils.getCanvasMousePosition(e);
		this.panningStart = {
			x: mousePosition.x - canvas.cameraOffset.x,
			y: mousePosition.y - canvas.cameraOffset.y,
		};
		this.isPanning = true;
		canvas.cursorHandler.setCustomPredefinedCursor("grab");
	}
	onMouseUp(): void {
		const canvas = Main.getInstance().canvas!;
		this.isPanning = false;
		canvas.cursorHandler.setDefaultCursor();
	}
	onWheel(): void {
		throw new Error("Method not implemented.");
	}
}
