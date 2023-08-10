import Main from "../../../Main";
import CoordinateUtils from "../../../utils/CoordinateUtils";
import AbstractMouseAction from "../AbstractMouseAction";

export default class SelectHoveredElementAction extends AbstractMouseAction {

    private isMouseDown: boolean = false;

    constructor() {
        super(HTMLCanvasElement);
    }

    onMouseMove(e: MouseEvent): void {
        if (this.isMouseDown) return;
        const canvas = Main.getInstance().canvas!;
        if (!(e.target instanceof HTMLCanvasElement)) return;
        const x: number = (e.clientX - e.target.offsetLeft - canvas.cameraOffset.x) / canvas.cameraZoom;
        const y: number = (e.clientY - e.target.offsetTop - canvas.cameraOffset.y) / canvas.cameraZoom;
        for (let element of canvas.elementList) {
            const elementGeometry = element.getGeometry();
            if (
                CoordinateUtils.checkCoordinatesInElement({ x, y }, elementGeometry)
            ) {
                canvas.activeElement = element;
                this.enableCursor();
                return;
            }
        }
        canvas.activeElement = null;
        this.disableCursor();
    }
    onMouseEnter(e: MouseEvent): void {
        throw new Error("Method not implemented.");
    }
    onMouseLeave(e: MouseEvent): void {
        throw new Error("Method not implemented.");
    }
    onMouseDown(e: MouseEvent): void {
        this.isMouseDown = true;
    }
    onMouseUp(e: MouseEvent): void {
        this.isMouseDown = false;
    }
    onWheel(e: WheelEvent): void {
        throw new Error("Method not implemented.");
    }

    private enableCursor() {
        Main.getInstance().canvas!.canvasElement.style.cursor = "pointer";
    }

    private disableCursor() {
        Main.getInstance().canvas!.canvasElement.style.cursor = "auto";
    }

}