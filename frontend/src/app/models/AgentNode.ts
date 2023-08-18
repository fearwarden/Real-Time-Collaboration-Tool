import AbstractAgent from "../content/agents/AbstractAgent";
import MovableElementNode from "./elements/MovableElementNode";

export default class AgentNode extends MovableElementNode {
	private _agentContent: AbstractAgent;

	constructor(agent: AbstractAgent, x: number, y: number, width: number, height: number) {
		super(x, y, height, width);
		this._agentContent = agent;
	}

	public get agentContent(): AbstractAgent {
		return this._agentContent;
	}
}
