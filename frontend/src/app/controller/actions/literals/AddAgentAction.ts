import Main from "../../../Main";
import AddAgentCommand from "../../../commands/literals/AddAgentCommand";
import AgentView from "../../../view/AgentView";
import IAction from "../IAction";

export default class AddAgentAction implements IAction {
  doAction(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
    if (event.target instanceof HTMLImageElement) {
      const agentName = event.target.dataset.agentname;
      if (!agentName) return;
      const agentView = new AgentView(agentName);
      Main.getInstance().commandManager.addCommand(
        new AddAgentCommand(agentView),
      );
    }
  }
}
