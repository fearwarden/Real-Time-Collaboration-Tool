import Main from "../Main";
import ElementNode from "../models/elements/ElementNode";
import MovableElementNode from "../models/elements/MovableElementNode";
import CoordinateUtils, { Point } from "../utils/CoordinateUtils";
import MouseTracker from "../utils/MouseTracker";
import ISubscriber from "../utils/observer/ISubscriber";
import ElementView from "./ElementView";
import MapView from "./MapView";

export default class Canvas implements ISubscriber {
	private _canvasElement: HTMLCanvasElement;

	private _width: number;

	private _height: number;
	private _ctx: CanvasRenderingContext2D;

	private _elementList: ElementView[];
	private _activeElement: ElementView | null;

	private _cameraOffset: Point;
	private _cameraZoom: number;

	private panningStart: Point;
	private isPanning: boolean;

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

		this._cameraOffset = { x: 0, y: 0 }
		this.panningStart = { x: 0, y: 0 }
		this.isPanning = false;

		this._cameraZoom = 1;

		this.setupMousePositionTracker();
		this.setupHoveredElementTracker();
		this.setupElementDragging();
		this.setupPanning();
		this.setupZoom();
	}
	update(notification: any): void {
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
		let isMouseDown = false;
		this.canvasElement.addEventListener("mousemove", (e) => {
			if (isMouseDown) return;
			if (e.target instanceof HTMLCanvasElement) {
				const x: number = (e.clientX - e.target.offsetLeft - this.cameraOffset.x) / this.cameraZoom;
				const y: number = (e.clientY - e.target.offsetTop - this.cameraOffset.y) / this.cameraZoom;

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
		})
		this.canvasElement.addEventListener("mouseup", () => {
			isMouseDown = false;
		})
		/*this.canvasElement.addEventListener("click", (e) => {
			console.log("Mouse screen coords: " + JSON.stringify(CoordinateUtils.getCanvasMousePosition(e)));
			console.log("World coords: " + JSON.stringify(CoordinateUtils.screenToWorld(CoordinateUtils.getCanvasMousePosition(e), this.cameraOffset, this.cameraZoom)));
			console.log("Offset", JSON.stringify(this.cameraOffset))
			console.log(this.elementList)
		})*/
	}

	private setupElementDragging() {
		// When mouse is pressed
		this.canvasElement.addEventListener("mousedown", (e) => {
			if (this.activeElement?.elementNode instanceof MovableElementNode) {
				if (e.target instanceof HTMLCanvasElement) {

					const worldCoorindates = CoordinateUtils.screenToWorld(CoordinateUtils.getCanvasMousePosition(e), this.cameraOffset, this.cameraZoom);

					this.activeElement.elementNode.handleMousePressed(worldCoorindates.x, worldCoorindates.y);

					const elementMoving = this.elementList.splice(this.elementList.indexOf(this.activeElement), 1)[0];
					this.elementList.unshift(elementMoving);
				}
			}
		});

		// When mouse is pressed and moving
		this.canvasElement.addEventListener("mousemove", (e) => {
			if (this.activeElement?.elementNode instanceof MovableElementNode) {
				if (e.target instanceof HTMLCanvasElement) {

					const worldCoorindates = CoordinateUtils.screenToWorld(CoordinateUtils.getCanvasMousePosition(e), this.cameraOffset, this.cameraZoom);

					this.activeElement.elementNode.handleMouseMove(worldCoorindates.x, worldCoorindates.y);
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

	private setupPanning() {
		this.canvasElement.addEventListener("mousedown", (e) => {
			const mousePosition = CoordinateUtils.getCanvasMousePosition(e);
			this.panningStart = { x: mousePosition.x - this.cameraOffset.x, y: mousePosition.y - this.cameraOffset.y };
			this.isPanning = true;
		})

		this.canvasElement.addEventListener("mouseup", (e) => {
			this.isPanning = false;
		})

		this.canvasElement.addEventListener("mouseleave", (e) => {
			this.isPanning = false;
		})

		this.canvasElement.addEventListener("mousemove", (e) => {
			if (!this.isPanning || this.activeElement !== null) return;
			const mousePosition = CoordinateUtils.getCanvasMousePosition(e);
			this.cameraOffset.x = mousePosition.x - this.panningStart.x;
			this.cameraOffset.y = mousePosition.y - this.panningStart.y;
			this.cameraOffset = { x: Math.min(this.cameraOffset.x, this.width * 1.5), y: Math.min(this.cameraOffset.y, this.height * 1.5) }
			this.cameraOffset = { x: Math.max(this.cameraOffset.x, -this.width * 1.5), y: Math.max(this.cameraOffset.y, -this.height * 1.5) }
		})
	}

	private setupZoom() {
		const ZOOM_SENSITIVITY = 0.002;
		const MAX_ZOOM = 2;
		const MIN_ZOOM = 1;

		this.canvasElement.addEventListener("wheel", (e) => {

			const prevMouseWorldCoords = CoordinateUtils.worldToScreen(CoordinateUtils.getCanvasMousePosition(e), this.cameraOffset, this.cameraZoom);

			this.cameraZoom -= e.deltaY * ZOOM_SENSITIVITY;
			this.cameraZoom = Math.min(this.cameraZoom, MAX_ZOOM);
			this.cameraZoom = Math.max(this.cameraZoom, MIN_ZOOM);

			const postMouseWorldCoords = CoordinateUtils.worldToScreen(CoordinateUtils.getCanvasMousePosition(e), this.cameraOffset, this.cameraZoom);

			if (this.cameraZoom === 1) {
				this.cameraOffset = { x: 0, y: 0 };
				return;
			}

			this.cameraOffset.x += (prevMouseWorldCoords.x - postMouseWorldCoords.x);
			this.cameraOffset.y += (prevMouseWorldCoords.y - postMouseWorldCoords.y);
		})
	}

	private fixCanvasScalling() {
		this.width = this.canvasElement.clientWidth;
		this.height = this.canvasElement.clientHeight;
		this.canvasElement.width = this.width; // Fix canvas scalling - https://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
		this.canvasElement.height = this.height;
	}

	public drawImage(image: HTMLImageElement, x: number, y: number, width: number = -1, height: number = -1): void {
		if (width > 0 && height > 0) {
			this._ctx.drawImage(image, x, y, width, height);
			return;
		}
		this._ctx.drawImage(image, x, y);
	}
	public redrawCanvas = () => {
		// Clear whole canvas in order to redraw the whole context
		this._ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.fixCanvasScalling();
		this._ctx.translate(this.cameraOffset.x, this.cameraOffset.y);
		this._ctx.scale(this.cameraZoom, this.cameraZoom);
		this.clearCanvas();
		this.drawCanvas();
		requestAnimationFrame(this.redrawCanvas);
	}

	private drawCanvas(): void {
		this.mapView.loadMap();
		for (let i = this.elementList.length - 1; i >= 0; i--) {
			this.elementList[i].draw();
		}
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
	public get cameraOffset(): Point {
		return this._cameraOffset;
	}
	public set cameraOffset(value: Point) {
		this._cameraOffset = value;
	}
	public get cameraZoom(): number {
		return this._cameraZoom;
	}
	public set cameraZoom(value: number) {
		this._cameraZoom = value;
	}
}
