import Main from "../Main";
import ElementNode from "../models/elements/ElementNode";
import MovableElementNode from "../models/elements/MovableElementNode";
import CoordinateUtils from "../utils/CoordinateUtils";
import ISubscriber from "../utils/observer/ISubscriber";
import ElementView from "./ElementView";
import MapView from "./MapView";

export default class Canvas implements ISubscriber {
	private _canvasElement: HTMLCanvasElement;

	private _width: number;
	private _height: number;
	private _ctx: CanvasRenderingContext2D;

	// Camera zoom variables
	private cameraOffset: { x: number; y: number };
	private cameraZoom = 1;
	private MAX_ZOOM = 2;
	private MIN_ZOOM = 1;
	private SCROLL_SENSITIVITY = 0.005;
	private lastZoom = this.cameraZoom;
	private isDragging = false;
	private dragStart = { x: 0, y: 0 };

	private _elementList: ElementView[];
	private _activeElement: ElementView | null;

	private _mapView: MapView;

	//TODO: Add functionality to redraw the canvas when window changes size
	constructor(canvas: HTMLCanvasElement) {
		this._canvasElement = canvas;

		this._width = this.canvasElement.clientWidth;
		this._height = this.canvasElement.clientHeight;
		this._ctx = canvas.getContext("2d")!;

		this._elementList = [];
		this._activeElement = null;

		this._mapView = new MapView();

		this.fixCanvasScalling();

		this.cameraOffset = { x: 0, y: 0 };

		this.setupMousePositionTracker();
		this.setupHoveredElementTracker();
		this.setupElementDragging();
		this.setupCameraZoom();
	}
	update(notification: any): void { }

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
		let isMouseDown = false;
		this.canvasElement.addEventListener("mousemove", (e) => {
			if (isMouseDown) return;
			if (e.target instanceof HTMLCanvasElement) {
				// const x: number = e.clientX - e.target.offsetLeft;
				// const y: number = e.clientY - e.target.offsetTop;

				const x: number = (e.clientX - e.target.offsetLeft) / this.cameraZoom - this.cameraOffset.x;
				const y: number = (e.clientY - e.target.offsetTop) / this.cameraZoom - this.cameraOffset.y;

				for (let element of this.elementList) {
					const elementGeometry = element.getGeometry();
					if (
						CoordinateUtils.checkCoordinatesInElement({ x, y }, elementGeometry)
					) {
						this.activeElement = element;
						this.enableCursor();
						return;
					}
				}
				this.activeElement = null;
				this.disableCursor();
			}
		});
		this.canvasElement.addEventListener("mousedown", () => {
			isMouseDown = true;
		});
		this.canvasElement.addEventListener("mouseup", () => {
			isMouseDown = false;
		});
	}

	private setupElementDragging() {
		// When mouse is pressed
		this.canvasElement.addEventListener("mousedown", (e) => {
			if (this.activeElement?.elementNode instanceof MovableElementNode) {
				if (e.target instanceof HTMLCanvasElement) {
					const x: number = e.clientX - e.target.offsetLeft;
					const y: number = e.clientY - e.target.offsetTop;

					this.activeElement.elementNode.handleMousePressed(x, y);

					const elementMoving = this.elementList.splice(
						this.elementList.indexOf(this.activeElement),
						1
					)[0];
					this.elementList.unshift(elementMoving);
				}
			}
		});

		// When mouse is pressed and moving
		this.canvasElement.addEventListener("mousemove", (e) => {
			if (this.activeElement?.elementNode instanceof MovableElementNode) {
				if (e.target instanceof HTMLCanvasElement) {
					const x: number = e.clientX - e.target.offsetLeft;
					const y: number = e.clientY - e.target.offsetTop;
					this.activeElement.elementNode.handleMouseMove(x, y);
				}
			}
		});

		// When mouse is released
		this.canvasElement.addEventListener("mouseup", () => {
			if (this.activeElement?.elementNode instanceof MovableElementNode) {
				this.activeElement.elementNode.handleMouseReleased();
			}
		});
	}

	private setupCameraZoom() {
		this.canvasElement.addEventListener("mousedown", (e) => {
			if (e.target instanceof HTMLCanvasElement) {
				//Mouse down
				this.isDragging = true;
				this.dragStart.x =
					(e.clientX - e.target.offsetLeft) / this.cameraZoom -
					this.cameraOffset.x;
				this.dragStart.y =
					(e.clientY - e.target.offsetTop) / this.cameraZoom -
					this.cameraOffset.y;
			}
		});

		this.canvasElement.addEventListener("mouseup", (e) => {
			//Mouse up
			this.isDragging = false;
			this.lastZoom = this.cameraZoom;
		});

		this.canvasElement.addEventListener("mouseleave", (e) => {
			//Mouse up
			this.isDragging = false;
			this.lastZoom = this.cameraZoom;
		});

		this.canvasElement.addEventListener("mousemove", (e) => {
			if (e.target instanceof HTMLCanvasElement) {
				//Mouse move
				if (
					this.isDragging &&
					this.activeElement === null &&
					this.cameraZoom !== 1
				) {
					this.cameraOffset.x =
						(e.clientX - e.target.offsetLeft) / this.cameraZoom -
						this.dragStart.x;
					this.cameraOffset.y =
						(e.clientY - e.target.offsetTop) / this.cameraZoom -
						this.dragStart.y;
				}
			}
		});

		this.canvasElement.addEventListener("wheel", (e) =>
			this.adjustZoom(e.deltaY * this.SCROLL_SENSITIVITY)
		);
	}

	private adjustZoom(zoomAmount?: number, zoomFactor?: number) {
		if (!this.isDragging) {
			if (zoomAmount) {
				this.cameraZoom -= zoomAmount;
			} else if (zoomFactor) {
				this.cameraZoom = zoomFactor * this.lastZoom;
			}

			this.cameraZoom = Math.min(this.cameraZoom, this.MAX_ZOOM);
			this.cameraZoom = Math.max(this.cameraZoom, this.MIN_ZOOM);

			if (this.cameraZoom == 1) {
				this.cameraOffset.x = 0;
				this.cameraOffset.y = 0;
			}
		}
	}

	private fixCanvasScalling() {
		this.width = this.canvasElement.clientWidth;
		this.height = this.canvasElement.clientHeight;
		this.canvasElement.width = this.width; // Fix canvas scalling - https://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
		this.canvasElement.height = this.height;
	}

	public drawImage(
		image: HTMLImageElement,
		x: number,
		y: number,
		width: number = -1,
		height: number = -1
	): void {
		if (width > 0 && height > 0) {
			this._ctx.drawImage(image, x, y, width, height);
			return;
		}
		this._ctx.drawImage(image, x, y);
	}
	public redrawCanvas = () => {
		// Clear whole canvas in order to redraw the whole context

		this.scaleAndTranslateCanvas();
		this.clearCanvas();
		this.drawCanvas();
		requestAnimationFrame(this.redrawCanvas);
	};

	private drawCanvas(): void {
		this.mapView.loadMap();
		for (let i = this.elementList.length - 1; i >= 0; i--) {
			this.elementList[i].draw();
		}
	}

	private scaleAndTranslateCanvas() {
		this._ctx.setTransform(1, 0, 0, 1, 0, 0);
		this._ctx.translate(this.cameraOffset.x, this.cameraOffset.y);
		this._ctx.scale(this.cameraZoom, this.cameraZoom);
		// this._ctx.translate(
		// 	-this.width / 2 + this.cameraOffset.x,
		// 	-this.height / 2 + this.cameraOffset.y
		// );
	}

	public start(): void {
		this.redrawCanvas();
	}

	private clearCanvas(): void {
		this._ctx?.clearRect(0, 0, this.width, this.height);
	}

	private enableCursor() {
		this.canvasElement.style.cursor = "pointer";
	}

	private disableCursor() {
		this.canvasElement.style.cursor = "auto";
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
	private get activeElement(): ElementView | null {
		return this._activeElement;
	}
	private set activeElement(value: ElementView | null) {
		this._activeElement = value;
	}
	public get mapView(): MapView {
		return this._mapView;
	}
	public set mapView(value: MapView) {
		this._mapView = value;
	}
}
