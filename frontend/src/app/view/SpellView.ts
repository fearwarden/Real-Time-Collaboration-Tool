import Main from "../Main";
import SpellFactory from "../content/spells/SpellFactory";
import SpellNode from "../models/SpellNode";
import ElementNode, { Geometry } from "../models/elements/ElementNode";
import CoordinateUtils, { Point } from "../utils/CoordinateUtils";
import ElementView from "./ElementView";

export default class SpellView implements ElementView {
	private _spellNode: SpellNode;
	private spellImageLoaded: boolean;
	private spellImage: HTMLImageElement;

	constructor(agentName: string, spellName: string) {
		const screenCoords: Point = {
			x: Main.getInstance().canvas!.width / 2,
			y: Main.getInstance().canvas!.height / 2,
		};

		const worldCoords = CoordinateUtils.screenToWorld(
			screenCoords,
			Main.getInstance().canvas!.cameraOffset,
			Main.getInstance().canvas!.cameraZoom,
		);

		this._spellNode = new SpellNode(
			SpellFactory.getSpell(agentName, spellName),
			worldCoords.x,
			worldCoords.y,
			20,
			20,
		);
		this.spellImage = new Image();
		this.spellImageLoaded = false;

		this.loadImage();
	}

	draw(): void {
		if (!this.spellImageLoaded) return;
		Main.getInstance().canvas?.drawImage(this.spellImage, this.spellNode.x, this.spellNode.y);
	}
	get elementNode(): ElementNode {
		return this.spellNode as ElementNode;
	}
	getGeometry(): Geometry {
		return {
			x: this.spellNode.x,
			y: this.spellNode.y,
			width: this.spellNode.width,
			height: this.spellNode.height,
		};
	}

	private loadImage() {
		this.spellImage.src = this.spellNode.spellContent.image;
		this.spellImage.onload = () => {
			this.spellImageLoaded = true;
			this.spellNode.width = this.spellImage.width;
			this.spellNode.height = this.spellImage.height;
			Main.getInstance().canvas?.redrawCanvas();
		};
	}

	public get spellNode(): SpellNode {
		return this._spellNode;
	}
}
