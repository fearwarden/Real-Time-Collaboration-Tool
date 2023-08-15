import Main from "../../../Main";
import AbstractMouseAction from "../AbstractMouseAction";

export default class DrawAction extends AbstractMouseAction {
  constructor() {
    super(HTMLCanvasElement);
  }

  onMouseMove(e: MouseEvent): void {
    const drawingState = Main.getInstance().drawingStateManager.currentState;
    if (!drawingState) return;
    drawingState.onMouseMove(e);
  }
  onMouseEnter(e: MouseEvent): void {
    throw new Error("Method not implemented.");
  }
  onMouseLeave(e: MouseEvent): void {
    throw new Error("Method not implemented.");
  }
  onMouseDown(e: MouseEvent): void {
    const drawingState = Main.getInstance().drawingStateManager.currentState;
    if (!drawingState) return;
    drawingState.onMouseDown(e);
  }
  onMouseUp(e: MouseEvent): void {
    const drawingState = Main.getInstance().drawingStateManager.currentState;
    if (!drawingState) return;
    drawingState.onMouseUp();
  }
  onWheel(e: WheelEvent): void {
    throw new Error("Method not implemented.");
  }
}
