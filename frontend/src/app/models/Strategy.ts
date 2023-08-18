import DrawingPoint from "./DrawingPoint";
import ElementNode from "./elements/ElementNode";

export default class Strategy {
	private _elements: ElementNode[];

	private _drawingPoints: DrawingPoint[][];

	constructor() {
		this._elements = [];
		this._drawingPoints = [];
	}

	public get elements(): ElementNode[] {
		return this._elements;
	}
	public set elements(value: ElementNode[]) {
		this._elements = value;
	}
	public get drawingPoints(): DrawingPoint[][] {
		return this._drawingPoints;
	}
}
