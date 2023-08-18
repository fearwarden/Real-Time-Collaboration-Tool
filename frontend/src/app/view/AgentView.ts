import Main from "../Main";
import AgentFactory from "../content/agents/AgentFactory";
import AgentNode from "../models/AgentNode";
import ElementNode, { Geometry } from "../models/elements/ElementNode";
import CoordinateUtils, { Point } from "../utils/CoordinateUtils";
import ElementView from "./ElementView";

export default class AgentView implements ElementView {
  private _agentNode: AgentNode;
  private agentImageLoaded: boolean;
  private agentImage: HTMLImageElement;

  constructor(agentName: string) {
    //Spawn agent in the center of the screen

    const screenCoords: Point = {
      x: Main.getInstance().canvas!.width / 2,
      y: Main.getInstance().canvas!.height / 2,
    };

    const worldCoords = CoordinateUtils.screenToWorld(
      screenCoords,
      Main.getInstance().canvas!.cameraOffset,
      Main.getInstance().canvas!.cameraZoom,
    );

    this._agentNode = new AgentNode(
      AgentFactory.createAgent(agentName),
      worldCoords.x,
      worldCoords.y,
      20,
      20,
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
      this.agentNode.width = this.agentImage.width;
      this.agentNode.height = this.agentImage.height;
      Main.getInstance().canvas?.redrawCanvas();
    };
  }

  public get agentNode(): AgentNode {
    return this._agentNode;
  }
}
