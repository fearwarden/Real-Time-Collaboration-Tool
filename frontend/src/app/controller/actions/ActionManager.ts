import AddAgentAction from "./literals/AddAgentAction";
import CanvasPanningAction from "./literals/CanvasPanningAction";
import CanvasZoomAction from "./literals/CanvasZoomAction";
import DragElementAction from "./literals/DragElementAction";
import MousePositionTrackerAction from "./literals/MousePositionTrackerAction";
import SelectHoveredElementAction from "./literals/SelectHoveredElementAction";
import AddSpellAction from "./literals/AddSpellAction";
import RedoAction from "./literals/RedoAction";
import UndoAction from "./literals/UndoAction";

export default class ActionManager {
  private _addAgentAction: AddAgentAction;
  private _selectHoveredElementAction: SelectHoveredElementAction;
  private _dragElementAction: DragElementAction;
  private _canvasPanningAction: CanvasPanningAction;
  private _canvasZoomAction: CanvasZoomAction;
  private _mousePositionTrackerAction: MousePositionTrackerAction;
  private _addSpellAction: AddSpellAction;
  private _undoAction: UndoAction;
  private _redoAction: RedoAction;

  constructor() {
    this._addAgentAction = new AddAgentAction();
    this._selectHoveredElementAction = new SelectHoveredElementAction();
    this._dragElementAction = new DragElementAction();
    this._canvasPanningAction = new CanvasPanningAction();
    this._canvasZoomAction = new CanvasZoomAction();
    this._mousePositionTrackerAction = new MousePositionTrackerAction();
    this._addSpellAction = new AddSpellAction();
    this._undoAction = new UndoAction();
    this._redoAction = new RedoAction();
  }

  public get addAgentAction(): AddAgentAction {
    return this._addAgentAction;
  }
  public get selectHoveredElementAction(): SelectHoveredElementAction {
    return this._selectHoveredElementAction;
  }
  public get dragElementAction(): DragElementAction {
    return this._dragElementAction;
  }
  public get canvasPanningAction(): CanvasPanningAction {
    return this._canvasPanningAction;
  }
  public get canvasZoomAction(): CanvasZoomAction {
    return this._canvasZoomAction;
  }
  public get mousePositionTrackerAction(): MousePositionTrackerAction {
    return this._mousePositionTrackerAction;
  }
  public get addSpellAction(): AddSpellAction {
    return this._addSpellAction;
  }
  public get undoAction(): UndoAction {
    return this._undoAction;
  }
  public get redoAction(): RedoAction {
    return this._redoAction;
  }
}
