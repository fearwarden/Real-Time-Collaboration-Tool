import AbstractDrawingState from "../AbstractDrawingState";
import Eraser from "../../../../assets/img/elements/eraser.svg";
import Main from "../../../Main";
import CoordinateUtils from "../../../utils/CoordinateUtils";

export default class EraserState extends AbstractDrawingState {
  private _isErasing: boolean;
  private _isOnLine: boolean;
  constructor() {
    super("#FFFFFF", 10, Eraser);
    this._isErasing = false;
    this._isOnLine = false;
  }

  public onMouseDown(event: MouseEvent): void {
    this._isErasing = true;
  }
  public onMouseMove(event: MouseEvent): void {
    if (!this._isErasing) return;
    const canvas = Main.getInstance().canvas.canvasElement!;
    const mouseX: number = event.clientX - canvas.offsetLeft;
    const mouseY: number = event.clientY - canvas.offsetTop;

    const screenToWorld = CoordinateUtils.screenToWorld(
      { x: mouseX, y: mouseY },
      Main.getInstance().canvas.cameraOffset,
      Main.getInstance().canvas.cameraZoom
    );

    // Determine which line (if any) is being intersected by the eraser
    const intersectedLineIndex = this.findIntersectedLine(
      screenToWorld.x,
      screenToWorld.y
    );

    // If a line is intersected, delete it
    if (intersectedLineIndex !== -1) {
      Main.getInstance().strategyModel.drawingPoints.splice(
        intersectedLineIndex,
        1
      );
    }
  }

  public onMouseUp(): void {
    this._isErasing = false;
  }

  /**
   * Determines if the given mouse position intersects with any line segments.
   *
   * @param mouseX - The x-coordinate of the mouse position (transformed from the screen to the world).
   * @param mouseY - The y-coordinate of the mouse position (transformed from the screen to the world).
   *
   * @returns The index of the intersected line within the drawingPoints list, or -1 if no intersection is found.
   */
  private findIntersectedLine(mouseX: number, mouseY: number): number {
    const drawingPoints = Main.getInstance().strategyModel.drawingPoints;

    // Iterate through each line
    for (let lineIndex = 0; lineIndex < drawingPoints.length; lineIndex++) {
      const line = drawingPoints[lineIndex];

      // Check each segment in the current line
      for (let i = 0; i < line.length - 1; i++) {
        const x1 = line[i].x;
        const y1 = line[i].y;
        const x2 = line[i + 1].x;
        const y2 = line[i + 1].y;

        // If the eraser intersects this segment, return the line's index
        if (
          CoordinateUtils.pointToSegmentDistance(
            mouseX,
            mouseY,
            x1,
            y1,
            x2,
            y2
          ) <= this.thickness
        ) {
          return lineIndex;
        }
      }
    }

    // If no intersection found, return -1
    return -1;
  }
}
