import AddAgentAction from "./literals/AddAgentAction";

export default class ActionManager {
    private _addAgentAction: AddAgentAction;

    constructor() {
        this._addAgentAction = new AddAgentAction();
    }
    public get addAgentAction(): AddAgentAction {
        return this._addAgentAction;
    }
}