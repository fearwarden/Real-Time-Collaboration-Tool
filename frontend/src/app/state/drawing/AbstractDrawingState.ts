export default abstract class AbstractDrawingState {
  private _color: string;
  private _thickness: number;

  constructor(color: string, thickness: number) {
    this._color = color;
    this._thickness = thickness;
  }

  public abstract onMouseDown(): void;
  public abstract onMouseMove(): void;
  public abstract onMouseUp(): void;
}
