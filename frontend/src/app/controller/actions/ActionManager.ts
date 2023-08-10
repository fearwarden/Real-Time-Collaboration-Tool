import AddAgentAction from "./literals/AddAgentAction";
import CanvasPanningAction from "./literals/CanvasPanningAction";
import CanvasZoomAction from "./literals/CanvasZoomAction";
import DragElementAction from "./literals/DragElementAction";
import MousePositionTrackerAction from "./literals/MousePositionTrackerAction";
import SelectHoveredElementAction from "./literals/SelectHoveredElementAction";

export default class ActionManager {
    private _addAgentAction: AddAgentAction;
    private _selectHoveredElementAction: SelectHoveredElementAction;
    private _dragElementAction: DragElementAction;
    private _canvasPanningAction: CanvasPanningAction;
    private _canvasZoomAction: CanvasZoomAction;
    private _mousePositionTrackerAction: MousePositionTrackerAction;

    constructor() {
        this._addAgentAction = new AddAgentAction();
        this._selectHoveredElementAction = new SelectHoveredElementAction();
        this._dragElementAction = new DragElementAction();
        this._canvasPanningAction = new CanvasPanningAction();
        this._canvasZoomAction = new CanvasZoomAction();
        this._mousePositionTrackerAction = new MousePositionTrackerAction();
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
}