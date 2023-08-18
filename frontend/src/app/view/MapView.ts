import testMap from "../../assets/img/maps/ascent_map.svg";
import Main from "../Main";

export default class MapView {
	private _loadedImage: HTMLImageElement;
	private imageLoaded: boolean;
	private _mapWidth: number;
	private _mapHeight: number;

	constructor() {
		this._loadedImage = new Image();
		this.imageLoaded = false;
		this._mapWidth = 0;
		this._mapHeight = 0;
	}

	public loadMap() {
		if (!this.imageLoaded) {
			this.loadedImage.src = testMap;
			this.loadedImage.onload = () => {
				this.imageLoaded = true;
				this.mapWidth = this.loadedImage.width;
				this.mapHeight = this.loadedImage.height;
				this.drawMap();
			};
		} else {
			this.drawMap();
		}
	}

	private drawMap() {
		if (!this.imageLoaded) return;
		const centerX = Main.getInstance().canvas!.width / 2 - this.mapWidth / 2;
		const centerY = Main.getInstance().canvas!.height / 2 - this.mapHeight / 2;
		Main.getInstance().canvas?.drawImage(this.loadedImage, centerX, centerY);
	}

	private get loadedImage(): HTMLImageElement {
		return this._loadedImage;
	}

	private set loadedImage(value: HTMLImageElement) {
		this._loadedImage = value;
	}
	public get mapWidth(): number {
		return this._mapWidth;
	}
	public set mapWidth(value: number) {
		this._mapWidth = value;
	}
	public get mapHeight(): number {
		return this._mapHeight;
	}
	public set mapHeight(value: number) {
		this._mapHeight = value;
	}
}
