import AbstractDrawingState from "../AbstractDrawingState";
import Pencil from "../../../../assets/img/elements/pencil.svg";
import Main from "../../../Main";
import DrawingPoint from "../../../models/DrawingPoint";
import CoordinateUtils from "../../../utils/CoordinateUtils";

export default class PenState extends AbstractDrawingState {
  private isDrawing: boolean;
  private temp: DrawingPoint[];
  constructor() {
    super("#FFFFFF", 3, Pencil);
    this.isDrawing = false;
    this.temp = [];
  }

  public onMouseDown(event: MouseEvent): void {
    this.isDrawing = true;
    this.temp = [];

  }
  public onMouseMove(event: MouseEvent): void {
    if (!this.isDrawing) return;
    const canvas = Main.getInstance().canvas.canvasElement!;
    const mouseX: number = event.clientX - canvas.offsetLeft;
    const mouseY: number = event.clientY - canvas.offsetTop;
    const worldCoords = CoordinateUtils.screenToWorld({ x: mouseX, y: mouseY }, Main.getInstance().canvas.cameraOffset, Main.getInstance().canvas.cameraZoom);
    if (Main.getInstance().strategyModel.drawingPoints.indexOf(this.temp) !== -1) {
      Main.getInstance().strategyModel.drawingPoints.splice(Main.getInstance().strategyModel.drawingPoints.indexOf(this.temp), 1);
    }
    this.temp.push(new DrawingPoint(worldCoords.x, worldCoords.y, this.thickness, this.color));
    Main.getInstance().strategyModel.drawingPoints.push(this.temp);
  }
  public onMouseUp(): void {
    this.isDrawing = false;
  }
}
