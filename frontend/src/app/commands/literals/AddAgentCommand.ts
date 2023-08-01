import Main from "../../Main";
import AgentView from "../../view/AgentView";
import ICommand from "../ICommand";

export default class AddAgentCommand implements ICommand {
    private readonly agent: AgentView;

    constructor(agentName: AgentView) {
        this.agent = agentName;
    }

    doCommand(): void {
        Main.getInstance().canvas?.elementList.push(this.agent);
        Main.getInstance().canvas?.redrawCanvas();
    }
    undoCommand(): void {
        Main.getInstance().canvas?.elementList.splice(Main.getInstance().canvas!.elementList.indexOf(this.agent), 1);
        Main.getInstance().canvas?.redrawCanvas();
    }

}