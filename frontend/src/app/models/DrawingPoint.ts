export default class DrawingPoint {
	private _x: number;
	private _y: number;
	private _thickness: number;
	private _color: string;

	constructor(x: number, y: number, thickness: number, color: string) {
		this._x = x;
		this._y = y;
		this._thickness = thickness;
		this._color = color;
	}

	public get x(): number {
		return this._x;
	}
	public set x(value: number) {
		this._x = value;
	}
	public get y(): number {
		return this._y;
	}
	public set y(value: number) {
		this._y = value;
	}
	public get thickness(): number {
		return this._thickness;
	}
	public set thickness(value: number) {
		this._thickness = value;
	}
	public get color(): string {
		return this._color;
	}
	public set color(value: string) {
		this._color = value;
	}
}
