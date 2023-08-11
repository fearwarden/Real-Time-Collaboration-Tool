import Main from "../../Main";
import AgentView from "../../view/AgentView";
import ICommand from "../ICommand";

export default class AddAgentCommand implements ICommand {
  private readonly agent: AgentView;

  constructor(agentName: AgentView) {
    this.agent = agentName;
  }

  doCommand(): void {
    this.agent.agentNode.addSubscriber(Main.getInstance().canvas!);
    Main.getInstance().canvas?.elementList.unshift(this.agent); // Dodaje na pocetak liste
    Main.getInstance().canvas?.redrawCanvas();
  }
  undoCommand(): void {
    const element = Main.getInstance().canvas?.elementList[
      Main.getInstance().canvas!.elementList.indexOf(this.agent)
    ];
    if (!element) return;
    element.elementNode.removeSubscriber(Main.getInstance().canvas!);
    Main.getInstance().canvas?.elementList.splice(
      Main.getInstance().canvas!.elementList.indexOf(this.agent),
      1
    );
    //Main.getInstance().canvas?.redrawCanvas();
  }
}
