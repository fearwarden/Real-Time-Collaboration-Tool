import Main from "../Main";
import ElementNode from "../models/elements/ElementNode";
import MovableElementNode from "../models/elements/MovableElementNode";
import CoordinateUtils from "../utils/CoordinateUtils";
import MouseTracker from "../utils/MouseTracker";
import ISubscriber from "../utils/observer/ISubscriber";
import ElementView from "./ElementView";

interface CameraOffsetInterface {
  x: number;
  y: number;
}

export default class Canvas implements ISubscriber {
  private _canvasElement: HTMLCanvasElement;

  private _width: number;

  private _height: number;
  private _ctx: CanvasRenderingContext2D;
  private cameraZoom: number;
  private maxZoom: number;
  private minZoom: number;
  private scrollSensitivity: number;
  private lastZoom: number;
  private mouseTracker: MouseTracker | null = null;
  private zoomCenterX = this.width / 2;
  private zoomCenterY = this.height / 2;

  private _elementList: ElementView[];
  private _activeElement: ElementView | null;

  //TODO: Add functionality to redraw the canvas when window changes size
  constructor(canvas: HTMLCanvasElement) {
    this._canvasElement = canvas;

    this._width = this.canvasElement.clientWidth;
    this._height = this.canvasElement.clientHeight;
    this._ctx = canvas.getContext("2d")!;
    this.cameraZoom = 1;
    this.maxZoom = 5;
    this.minZoom = 0.1;
    this.scrollSensitivity = 0.005;
    this.lastZoom = this.cameraZoom;

    this._elementList = [];
    this._activeElement = null;

    this.fixCanvasScalling();

    this.setupMousePositionTracker();
    this.setupHoveredElementTracker();
    this.setupElementDragging();
    this.setupListeners();
  }
  update(notification: any): void {}

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
        const x: number = e.clientX - e.target.offsetLeft;
        const y: number = e.clientY - e.target.offsetTop;

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

  private setupListeners() {
    this.canvasElement.addEventListener("wheel", (e) =>
      this.adjustZoom(e.deltaY * this.scrollSensitivity)
    );
  }

  private fixCanvasScalling() {
    this.width = this.canvasElement.clientWidth;
    this.height = this.canvasElement.clientHeight;
    this.canvasElement.width = this.width; // Fix canvas scalling - https://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
    this.canvasElement.height = this.height;
  }

  public drawImage(image: HTMLImageElement, x: number, y: number): void {
    this._ctx.drawImage(image, x, y);
  }
  public redrawCanvas = () => {
    // Clear whole canvas in order to redraw the whole context
    this.clearCanvas();
    this.drawCanvas();
    requestAnimationFrame(this.redrawCanvas);
  };

  private drawCanvas(): void {
    this._ctx.save();
    const mousePos = this.mouseTracker!.mousePosition;
    this._ctx.translate(this.zoomCenterX, this.zoomCenterY);
    this._ctx.scale(this.cameraZoom, this.cameraZoom);
    this._ctx.translate(-this.zoomCenterX, -this.zoomCenterY);

    for (let i = this.elementList.length - 1; i >= 0; i--) {
      this.elementList[i].draw();
    }
    this._ctx.restore();
  }

  private adjustZoom(zoomAmount?: number, zoomFactor: number = 1) {
    if (zoomAmount) {
      this.cameraZoom -= zoomAmount;
    } else if (zoomFactor) {
      this.cameraZoom = zoomFactor * this.lastZoom;
    }

    this.cameraZoom = Math.min(this.cameraZoom, this.maxZoom);
    this.cameraZoom = Math.max(this.cameraZoom, this.minZoom);

    // Capture the center of zoom when we start zooming
    if (this.cameraZoom !== this.lastZoom) {
      this.zoomCenterX = this.mouseTracker!.mousePosition.x;
      this.zoomCenterY = this.mouseTracker!.mousePosition.y;
      this.lastZoom = this.cameraZoom;
    }
  }

  public start(): void {
    this.mouseTracker = new MouseTracker();
    requestAnimationFrame(this.redrawCanvas);
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
}
