import Main from "../Main";
import AgentFactory from "../content/agents/AgentFactory";
import AgentNode from "../models/AgentNode";
import ElementNode, { Geometry } from "../models/elements/ElementNode";
import ElementView from "./ElementView";

export default class AgentView implements ElementView {
  private _agentNode: AgentNode;
  private agentImageLoaded: boolean;
  private agentImage: HTMLImageElement;

  constructor(agentName: string) {
    // TODO: change the coordinates
    this._agentNode = new AgentNode(
      AgentFactory.createAgent(agentName),
      0,
      0,
      20,
      20
    );
    this.agentImage = new Image();
    this.agentImageLoaded = false;

    this.loadImage();
  }

  get elementNode(): ElementNode {
    return this.agentNode as ElementNode;
  }

  getGeometry(): Geometry {
    return {
      x: this.agentNode.x,
      y: this.agentNode.y,
      width: this.agentNode.width,
      height: this.agentNode.height,
    };
  }

  draw(): void {
    if (!this.agentImageLoaded) return;
    Main.getInstance().canvas?.drawImage(
      this.agentImage,
      this.agentNode.x,
      this.agentNode.y,
    );
  }

  private loadImage() {
    this.agentImage.src = this.agentNode.agentContent.image;
    this.agentImage.onload = () => {
      this.agentImageLoaded = true;
      Main.getInstance().canvas?.redrawCanvas();
    }
  }

  public get agentNode(): AgentNode {
    return this._agentNode;
  }
}
