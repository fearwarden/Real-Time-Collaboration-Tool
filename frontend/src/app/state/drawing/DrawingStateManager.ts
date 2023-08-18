import AbstractDrawingState from "./AbstractDrawingState";
import EraserState from "./literals/EraserState";
import PenState from "./literals/PenState";

export default class DrawingStateManager {
	private _penState: PenState;

	private _eraserState: EraserState;
	private _currentState: AbstractDrawingState | null;

	constructor() {
		this._penState = new PenState();
		this._eraserState = new EraserState();
		this._currentState = null;
	}

	public startPenState() {
		this.currentState = this._penState;
	}

	public startEraserState() {
		this._currentState = this._eraserState;
	}

	public startNullState() {
		this.currentState = null;
	}

	public get currentState(): AbstractDrawingState | null {
		return this._currentState;
	}
	public set currentState(value: AbstractDrawingState | null) {
		this._currentState = value;
	}
	public get penState(): PenState {
		return this._penState;
	}
	public set penState(value: PenState) {
		this._penState = value;
	}
	public get eraserState(): EraserState {
		return this._eraserState;
	}
	public set eraserState(value: EraserState) {
		this._eraserState = value;
	}
}
