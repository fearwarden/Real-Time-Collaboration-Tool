import Main from "../Main";

export default class Canvas {

    private canvas: HTMLCanvasElement;

    private width: number;
    private height: number;

    //TODO: Add functionality to redraw the canvas when window changes size
    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;

        this.redrawCanvas();

        this.setupMousePositionTracker();
    }

    public drawDot(x: number, y: number) { // x and y are procentages of the cursor position to account for different screen sizes
        const dotSize = 10;

        //Validate it is inside boundaries
        x = Math.max(dotSize, Math.min(this.width - dotSize, x * this.width));
        y = Math.max(dotSize, Math.min(this.height - dotSize, y * this.height));

        const ctx = this.canvas.getContext('2d')!;
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.beginPath();
        ctx.arc(x, y, dotSize, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }

    private setupMousePositionTracker() {
        this.canvas.addEventListener("mousemove", (e) => {
            if (e.target instanceof HTMLCanvasElement) {
                Main.getInstance().getStompClient.send("/live/mouse-position", {
                    userId: Main.getInstance().getUserId,
                    x: (e.clientX - e.target!.offsetLeft) / this.width,
                    y: (e.clientY - e.target!.offsetTop) / this.height
                })
            }
        })
    }

    private redrawCanvas() {
        this.width = this.canvas.clientWidth;
        this.height = this.canvas.clientHeight;
        this.canvas.width = this.width; // Fix canvas scalling - https://stackoverflow.com/questions/1664785/resize-html5-canvas-to-fit-window
        this.canvas.height = this.height;
    }
}