import Main from "../Main";
import AgentFactory from "../content/agents/AgentFactory";
import AgentNode from "../models/AgentNode";
import ElementView from "./ElementView";

export default class AgentView implements ElementView {
  private _agentNode: AgentNode;

  constructor(agentName: string) {
    // TODO: change the coordinates
    this._agentNode = new AgentNode(
      AgentFactory.createAgent(agentName),
      0,
      0,
      20,
      20
    );
  }

  draw(): void {
    Main.getInstance().canvas?.drawImage(
      this.agentNode.agentContent.image,
      this.agentNode.x,
      this.agentNode.y
    );
  }

  public get agentNode(): AgentNode {
    return this._agentNode;
  }
}
