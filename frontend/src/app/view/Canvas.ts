import Main from "../Main";
import ElementNode from "../models/elements/ElementNode";
import CoordinateUtils from "../utils/CoordinateUtils";
import ISubscriber from "../utils/observer/ISubscriber";
import AgentView from "./AgentView";
import ElementView from "./ElementView";

export default class Canvas implements ISubscriber {
	private _canvasElement: HTMLCanvasElement;

	private _width: number;

	private _height: number;
	private _ctx: CanvasRenderingContext2D;

	private _elementList: ElementView[];
	private _activeElement: ElementView | null;

	//TODO: Add functionality to redraw the canvas when window changes size
	constructor(canvas: HTMLCanvasElement) {
		this._canvasElement = canvas;

		this._width = this.canvasElement.clientWidth;
		this._height = this.canvasElement.clientHeight;
		this._ctx = canvas.getContext("2d")!;

		this._elementList = [];
		this._activeElement = null;

		this.fixCanvasScalling();

		this.setupMousePositionTracker();
		this.setupHoveredElementTracker();
	}
	update(notification: any): void {
		if (notification instanceof ElementNode) {
			this.redrawCanvas();
		}
	}

	public drawDot(x: number, y: number) {
		// x and y are procentages of the cursor position to account for different screen sizes
		const dotSize = 10;

		//Validate it is inside boundaries
		x = Math.max(dotSize, Math.min(this.width - dotSize, x * this.width));
		y = Math.max(dotSize, Math.min(this.height - dotSize, y * this.height));

		this.clearCanvas();
		this._ctx.beginPath();
		this._ctx.arc(x, y, dotSize, 0, 2 * Math.PI);
		this._ctx.fillStyle = "blue";
		this._ctx.fill();
		this._ctx.closePath();
	}

	private setupMousePositionTracker() {
		this.canvasElement.addEventListener("mousemove", (e) => {
			if (e.target instanceof HTMLCanvasElement) {
				Main.getInstance().stompClient.send("/live/mouse-position", {
					userId: Main.getInstance().userId,
					x: (e.clientX - e.target!.offsetLeft) / this.width,
					y: (e.clientY - e.target!.offsetTop) / this.height,
				});
			}
		});
	}

	private setupHoveredElementTracker() {
		this.canvasElement.addEventListener("mousemove", (e) => {
			if (e.target instanceof HTMLCanvasElement) {
				const x: number = e.clientX - e.target.offsetLeft;
				const y: number = e.clientY - e.target.offsetTop;

				for (let element of this.elementList) {
					const elementGeometry = element.getGeometry();
					if (
						CoordinateUtils.checkCoordinatesInElement({ x, y }, elementGeometry)
					) {
						this.activeElement = element;
						return;
					}
				}
				this.activeElement = null;
			}
		});
	}

	private fixCanvasScalling() {
		this.width = this.canvasElement.clientWidth;
		this.height = this.canvasElement.clientHeight;
		this.canvasElement.width = this.width; // Fix canvas scalling - https://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
		this.canvasElement.height = this.height;
	}

	public drawImage(image: string, x: number, y: number, callback: (h: number, w: number) => void = (height, width) => { }): void {
		const drawableImage = new Image();
		drawableImage.src = image;
		drawableImage.onload = () => {
			this._ctx.drawImage(drawableImage, x, y);
			callback(drawableImage.height, drawableImage.width);
		};
	}
	public redrawCanvas() {
		// Clear whole canvas in order to redraw the whole context
		this.clearCanvas();
		this.drawCanvas();
	}

	private drawCanvas(): void {
		this.elementList.forEach((element: ElementView) => {
			element.draw();
		});
	}

	private clearCanvas(): void {
		this._ctx?.clearRect(0, 0, this.width, this.height);
	}

	public get canvasElement(): HTMLCanvasElement {
		return this._canvasElement;
	}
	public set canvasElement(value: HTMLCanvasElement) {
		this._canvasElement = value;
	}
	public get width(): number {
		return this._width;
	}
	public set width(value: number) {
		this._width = value;
	}
	public get height(): number {
		return this._height;
	}
	public set height(value: number) {
		this._height = value;
	}
	public get elementList(): ElementView[] {
		return this._elementList;
	}
	public set elementList(value: ElementView[]) {
		this._elementList = value;
	}
	private set activeElement(value: ElementView | null) {
		this._activeElement = value;
	}
}
