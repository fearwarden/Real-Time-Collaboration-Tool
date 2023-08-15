import AbstractDrawingState from "./AbstractDrawingState";
import PenState from "./literals/PenState";

export default class DrawingStateManager {
  private _penState: PenState;
  //   private _eraserState;
  private _currentState: AbstractDrawingState | null;

  constructor() {
    this._penState = new PenState();
    this._currentState = this._penState;
  }

  public get currentState(): AbstractDrawingState | null {
    return this._currentState;
  }
  public set currentState(value: AbstractDrawingState | null) {
    this._currentState = value;
  }
}
