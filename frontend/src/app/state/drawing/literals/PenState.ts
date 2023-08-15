import AbstractDrawingState from "../AbstractDrawingState";
import Pencil from "../../../../assets/img/elements/pencil.svg";
import Main from "../../../Main";

export default class PenState extends AbstractDrawingState {
  private isDrawing: boolean;
  constructor() {
    super("#FFFFFF", 1, Pencil);
    this.isDrawing = false;
  }

  public onMouseDown(event: MouseEvent): void {
    const canvas = Main.getInstance().canvas.canvasElement!;
    const ctx = canvas.getContext("2d")!;
    this.isDrawing = true;
    ctx.strokeStyle = this.color;
    ctx.lineWidth = this.thickness;
    ctx.lineCap = "round";
    canvas.style.cursor = `url(${this.cursor}), auto`;
    ctx.beginPath();
    const mouseX: number = event.clientX - canvas.offsetLeft;
    const mouseY: number = event.clientY - canvas.offsetTop;
    ctx.moveTo(mouseX, mouseY);
  }
  public onMouseMove(event: MouseEvent): void {
    if (!this.isDrawing) return;
    const canvas = Main.getInstance().canvas.canvasElement!;
    const ctx = canvas.getContext("2d")!;
    const mouseX: number = event.clientX - canvas.offsetLeft;
    const mouseY: number = event.clientY - canvas.offsetTop;
    ctx.lineTo(mouseX, mouseY);
    ctx.stroke();
  }
  public onMouseUp(): void {
    this.isDrawing = false;
    const canvas = Main.getInstance().canvas.canvasElement!;
    const ctx = canvas.getContext("2d")!;
    ctx.closePath();
  }
}
