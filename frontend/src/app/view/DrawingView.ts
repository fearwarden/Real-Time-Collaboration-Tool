import Main from "../Main";
import DrawingPoint from "../models/DrawingPoint";
import { Point } from "../utils/CoordinateUtils";

export default class DrawingView {
	private points: DrawingPoint[][];

	constructor() {
		this.points = Main.getInstance().strategyModel.drawingPoints;
	}

	public startPenState() {
		Main.getInstance().drawingStateManager.startPenState();
		Main.getInstance().canvas.cursorHandler.setDefaultCursor();
	}

	public startEraserState() {
		Main.getInstance().drawingStateManager.startEraserState();
		Main.getInstance().canvas.cursorHandler.setDefaultCursor();
	}

	public startNullState() {
		Main.getInstance().drawingStateManager.startNullState();
		Main.getInstance().canvas.cursorHandler.setDefaultCursor();
	}

	public draw() {
		const canvas = Main.getInstance().canvas.canvasElement!;
		const ctx = canvas.getContext("2d")!;

		let coords: Point | null = null;

		this.points.forEach((pointList) => {
			pointList.forEach((point) => {
				ctx.strokeStyle = point.color;
				ctx.lineWidth = point.thickness;
				ctx.lineCap = "round";

				ctx.beginPath();
				if (coords === null) {
					//U slucaju da je prva tacka
					coords = { x: point.x, y: point.y };
					return;
				}
				ctx.moveTo(coords.x, coords.y);
				ctx.lineTo(point.x, point.y);
				ctx.stroke();
				coords = { x: point.x, y: point.y };
			});
			coords = null;
			ctx.closePath();
		});
	}
}
