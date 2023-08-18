import Main from "../../../Main";
import CoordinateUtils from "../../../utils/CoordinateUtils";
import AbstractMouseAction from "../AbstractMouseAction";

export default class CanvasZoomAction extends AbstractMouseAction {
  constructor() {
    super(HTMLCanvasElement);
  }
  onMouseMove(e: MouseEvent): void {
    throw new Error("Method not implemented.");
  }
  onMouseEnter(e: MouseEvent): void {
    throw new Error("Method not implemented.");
  }
  onMouseLeave(e: MouseEvent): void {
    throw new Error("Method not implemented.");
  }
  onMouseDown(e: MouseEvent): void {
    throw new Error("Method not implemented.");
  }
  onMouseUp(e: MouseEvent): void {
    throw new Error("Method not implemented.");
  }
  onWheel(e: WheelEvent): void {
    const canvas = Main.getInstance().canvas!;

    const prevMouseWorldCoords = CoordinateUtils.worldToScreen(
      CoordinateUtils.getCanvasMousePosition(e),
      canvas.cameraOffset,
      canvas.cameraZoom,
    );

    canvas.cameraZoom -= e.deltaY * canvas.ZOOM_SENSITIVITY;
    canvas.cameraZoom = Math.min(canvas.cameraZoom, canvas.MAX_ZOOM);
    canvas.cameraZoom = Math.max(canvas.cameraZoom, canvas.MIN_ZOOM);

    const postMouseWorldCoords = CoordinateUtils.worldToScreen(
      CoordinateUtils.getCanvasMousePosition(e),
      canvas.cameraOffset,
      canvas.cameraZoom,
    );

    if (canvas.cameraZoom === 1) {
      canvas.cameraOffset = { x: 0, y: 0 };
      return;
    }

    canvas.cameraOffset.x += prevMouseWorldCoords.x - postMouseWorldCoords.x;
    canvas.cameraOffset.y += prevMouseWorldCoords.y - postMouseWorldCoords.y;
  }
}
