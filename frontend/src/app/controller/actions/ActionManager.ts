import AddAgentAction from "./literals/AddAgentAction";
import AddSpellAction from "./literals/AddSpellAction";

export default class ActionManager {
  private _addAgentAction: AddAgentAction;
  private _addSpellAction: AddSpellAction;

  constructor() {
    this._addAgentAction = new AddAgentAction();
    this._addSpellAction = new AddSpellAction();
  }
  public get addAgentAction(): AddAgentAction {
    return this._addAgentAction;
  }
  public get addSpellAction(): AddSpellAction {
    return this._addSpellAction;
  }
}
