import AddAgentAction from "./literals/AddAgentAction";
import AddSpellAction from "./literals/AddSpellAction";
import RedoAction from "./literals/RedoAction";
import UndoAction from "./literals/UndoAction";

export default class ActionManager {
  private _addAgentAction: AddAgentAction;
  private _addSpellAction: AddSpellAction;
  private _undoAction: UndoAction;
  private _redoAction: RedoAction;

  constructor() {
    this._addAgentAction = new AddAgentAction();
    this._addSpellAction = new AddSpellAction();
    this._undoAction = new UndoAction();
    this._redoAction = new RedoAction();
  }
  public get addAgentAction(): AddAgentAction {
    return this._addAgentAction;
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
