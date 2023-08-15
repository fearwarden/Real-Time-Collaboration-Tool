import AbstractDrawingState from "./AbstractDrawingState";
import PenState from "./literals/PenState";

export default class DrawingStateManager {
  private _penState: PenState;

  //   private _eraserState;
  private _currentState: AbstractDrawingState | null;

  constructor() {
    this._penState = new PenState();
    this._currentState = null;
  }

  public startPenState() {
    this.currentState = this._penState;
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
}
