import Main from "../../../Main";
import DragElementCommand from "../../../commands/literals/DragElementCommand";
import MovableElementNode from "../../../models/elements/MovableElementNode";
import CoordinateUtils, { Point } from "../../../utils/CoordinateUtils";
import AbstractMouseAction from "../AbstractMouseAction";

export default class DragElementAction extends AbstractMouseAction {
	private startingPoint: Point;

	constructor() {
		super(HTMLCanvasElement);
		this.startingPoint = { x: 0, y: 0 };
	}

	onMouseMove(e: MouseEvent): void {
		const canvas = Main.getInstance().canvas!;
		if (
			!(canvas.activeElement?.elementNode instanceof MovableElementNode) ||
			!(e.target instanceof HTMLCanvasElement)
		)
			return;

		const worldCoorindates = CoordinateUtils.screenToWorld(
			CoordinateUtils.getCanvasMousePosition(e),
			canvas.cameraOffset,
			canvas.cameraZoom,
		);
		canvas.activeElement.elementNode.handleMouseMove(worldCoorindates.x, worldCoorindates.y);
	}
	onMouseEnter(): void {
		throw new Error("Method not implemented.");
	}
	onMouseLeave(): void {
		throw new Error("Method not implemented.");
	}
	onMouseDown(e: MouseEvent): void {
		const canvas = Main.getInstance().canvas!;
		if (
			!(canvas.activeElement?.elementNode instanceof MovableElementNode) ||
			!(e.target instanceof HTMLCanvasElement)
		)
			return;

		const worldCoorindates = CoordinateUtils.screenToWorld(
			CoordinateUtils.getCanvasMousePosition(e),
			canvas.cameraOffset,
			canvas.cameraZoom,
		);

		canvas.activeElement.elementNode.handleMousePressed(worldCoorindates.x, worldCoorindates.y);

		this.startingPoint = {
			x: canvas.activeElement.elementNode.x,
			y: canvas.activeElement.elementNode.y,
		};

		const elementMoving = canvas.elementList.splice(
			canvas.elementList.indexOf(canvas.activeElement),
			1,
		)[0];
		canvas.elementList.unshift(elementMoving);
	}
	onMouseUp(): void {
		const canvas = Main.getInstance().canvas!;
		if (!(canvas.activeElement?.elementNode instanceof MovableElementNode)) return;

		canvas.activeElement.elementNode.handleMouseReleased();

		const command = new DragElementCommand(
			this.startingPoint,
			{
				x: canvas.activeElement.elementNode.x,
				y: canvas.activeElement.elementNode.y,
			},
			canvas.activeElement.elementNode,
		);
		Main.getInstance().commandManager.addCommand(command);
	}
	onWheel(): void {
		throw new Error("Method not implemented.");
	}
}
