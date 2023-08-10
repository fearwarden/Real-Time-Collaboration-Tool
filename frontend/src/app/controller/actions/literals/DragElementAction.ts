import Main from "../../../Main";
import MovableElementNode from "../../../models/elements/MovableElementNode";
import CoordinateUtils from "../../../utils/CoordinateUtils";
import AbstractMouseAction from "../AbstractMouseAction";

export default class DragElementAction extends AbstractMouseAction {

    constructor() {
        super(HTMLCanvasElement);
    }

    onMouseMove(e: MouseEvent): void {
        const canvas = Main.getInstance().canvas!;
        if (!(canvas.activeElement?.elementNode instanceof MovableElementNode) || !(e.target instanceof HTMLCanvasElement)) return;

        const worldCoorindates = CoordinateUtils.screenToWorld(CoordinateUtils.getCanvasMousePosition(e), canvas.cameraOffset, canvas.cameraZoom);
        canvas.activeElement.elementNode.handleMouseMove(worldCoorindates.x, worldCoorindates.y);
    }
    onMouseEnter(e: MouseEvent): void {
        throw new Error("Method not implemented.");
    }
    onMouseLeave(e: MouseEvent): void {
        throw new Error("Method not implemented.");
    }
    onMouseDown(e: MouseEvent): void {
        const canvas = Main.getInstance().canvas!;
        if (!(canvas.activeElement?.elementNode instanceof MovableElementNode) || !(e.target instanceof HTMLCanvasElement)) return;

        const worldCoorindates = CoordinateUtils.screenToWorld(CoordinateUtils.getCanvasMousePosition(e), canvas.cameraOffset, canvas.cameraZoom);

        canvas.activeElement.elementNode.handleMousePressed(worldCoorindates.x, worldCoorindates.y);

        const elementMoving = canvas.elementList.splice(canvas.elementList.indexOf(canvas.activeElement), 1)[0];
        canvas.elementList.unshift(elementMoving);
    }
    onMouseUp(e: MouseEvent): void {
        const canvas = Main.getInstance().canvas!;
        if (!(canvas.activeElement?.elementNode instanceof MovableElementNode)) return;

        canvas.activeElement.elementNode.handleMouseReleased();
    }
    onWheel(e: WheelEvent): void {
        throw new Error("Method not implemented.");
    }

}