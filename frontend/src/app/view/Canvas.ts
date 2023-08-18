import Main from "../Main";
import { Point } from "../utils/CoordinateUtils";
import ISubscriber from "../utils/observer/ISubscriber";
import DrawingView from "./DrawingView";
import ElementView from "./ElementView";
import MapView from "./MapView";
import CursorHanlder from "../utils/cursor/CursorHandler";

export default class Canvas implements ISubscriber {
	private _canvasElement: HTMLCanvasElement;

	private _width: number;

	private _height: number;
	private _ctx: CanvasRenderingContext2D;

	private _elementList: ElementView[];
	private _activeElement: ElementView | null;

	private _cameraOffset: Point;
	private _cameraZoom: number;

	private _mapView: MapView;
	private _drawingView: DrawingView;

	private _ZOOM_SENSITIVITY = 0.002;

	private _MAX_ZOOM = 2;
	private _MIN_ZOOM = 1;

	private _cursorHandler: CursorHanlder;

	//TODO: Add functionality to redraw the canvas when window changes size
	constructor(canvas: HTMLCanvasElement) {
		this._canvasElement = canvas;

		this._width = this.canvasElement.clientWidth;
		this._height = this.canvasElement.clientHeight;
		this._ctx = canvas.getContext("2d")!;

		this._elementList = [];
		this._activeElement = null;

		this._mapView = new MapView();
		this._drawingView = new DrawingView();

		this.fixCanvasScaling();

		this._cameraOffset = { x: 0, y: 0 };

		this._cameraZoom = 1;

		this._cursorHandler = new CursorHanlder(this._canvasElement);
	}

	private fixCanvasScaling() {
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
		height: number = -1,
	): void {
		if (width > 0 && height > 0) {
			this._ctx.drawImage(image, x, y, width, height);
			return;
		}
		this._ctx.drawImage(image, x, y);
	}
	public redrawCanvas = () => {
		// Clear whole canvas in order to redraw the whole context
		this._ctx.setTransform(1, 0, 0, 1, 0, 0);
		this.fixCanvasScaling();
		this._ctx.translate(this.cameraOffset.x, this.cameraOffset.y);
		this._ctx.scale(this.cameraZoom, this.cameraZoom);
		this.clearCanvas();
		this.drawCanvas();
		requestAnimationFrame(this.redrawCanvas);
	};

	private drawCanvas(): void {
		this.mapView.loadMap();
		for (let i = this.elementList.length - 1; i >= 0; i--) {
			this.elementList[i].draw();
		}
		this.drawingView.draw();
	}

	public start(): void {
		this.redrawCanvas();
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
	public get activeElement(): ElementView | null {
		return this._activeElement;
	}
	public set activeElement(value: ElementView | null) {
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
	public get ZOOM_SENSITIVITY() {
		return this._ZOOM_SENSITIVITY;
	}
	public get MIN_ZOOM() {
		return this._MIN_ZOOM;
	}
	public get MAX_ZOOM() {
		return this._MAX_ZOOM;
	}
	public get drawingView(): DrawingView {
		return this._drawingView;
	}
	public get cursorHandler(): CursorHanlder {
		return this._cursorHandler;
	}

	update(notification: any): void {}
}
