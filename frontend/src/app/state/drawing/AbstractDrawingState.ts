export default abstract class AbstractDrawingState {
  private _color: string;
  private _thickness: number;
  private _cursor: string | null;

  constructor(color: string, thickness: number, cursor: string) {
    this._color = color;
    this._thickness = thickness;
    this._cursor = cursor;
  }

  public abstract onMouseDown(event: MouseEvent): void;
  public abstract onMouseMove(event: MouseEvent): void;
  public abstract onMouseUp(): void;

  public get color(): string {
    return this._color;
  }
  public set color(value: string) {
    this._color = value;
  }
  public get thickness(): number {
    return this._thickness;
  }
  public set thickness(value: number) {
    this._thickness = value;
  }
  public get cursor(): string | null {
    return this._cursor;
  }
  public set cursor(value: string | null) {
    this._cursor = value;
  }
}
