import Main from "../Main";

export default class Canvas {

    private _canvasElement: HTMLCanvasElement;
    
    private _width: number;
    
    private _height: number;
    

    //TODO: Add functionality to redraw the canvas when window changes size
    constructor(canvas: HTMLCanvasElement) {
        this._canvasElement = canvas;
        
        this._width = this.canvasElement.clientWidth;
        this._height = this.canvasElement.clientHeight;

        this.fixCanvasScalling();

        this.setupMousePositionTracker();
    }

    public drawDot(x: number, y: number) { // x and y are procentages of the cursor position to account for different screen sizes
        const dotSize = 10;

        //Validate it is inside boundaries
        x = Math.max(dotSize, Math.min(this.width - dotSize, x * this.width));
        y = Math.max(dotSize, Math.min(this.height - dotSize, y * this.height));

        const ctx = this.canvasElement.getContext('2d')!;
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }

    private setupMousePositionTracker() {
        this.canvasElement.addEventListener("mousemove", (e) => {
            if (e.target instanceof HTMLCanvasElement) {
                Main.getInstance().stompClient.send("/live/mouse-position", {
                    userId: Main.getInstance().userId,
                    x: (e.clientX - e.target!.offsetLeft) / this.width,
                    y: (e.clientY - e.target!.offsetTop) / this.height
                })
            }
        })
    }

    private fixCanvasScalling() {
        this.width = this.canvasElement.clientWidth;
        this.height = this.canvasElement.clientHeight;
        this.canvasElement.width = this.width; // Fix canvas scalling - https://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
        this.canvasElement.height = this.height;
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
}