import Main from "./Main";

export default class Canvas {

    private canvas: HTMLCanvasElement;

    private width: number;
    private height: number;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        this.setupMousePositionTracker();
    }

    public drawDot(x: number, y: number) {
        const dotSize = 10;

        //Validate it is inside boundaries
        x = Math.max(dotSize, Math.min(this.width - dotSize, x));
        y = Math.max(dotSize, Math.min(this.height - dotSize, y));

        const ctx = this.canvas.getContext('2d')!;
        ctx.clearRect(0, 0, this.width, this.height);
        ctx.beginPath();
        ctx.arc(x, y, 10, 0, 2 * Math.PI);
        ctx.fillStyle = 'blue';
        ctx.fill();
        ctx.closePath();
    }

    private setupMousePositionTracker() {
        this.canvas.addEventListener("mousemove", (e) => {
            Main.getInstance().getStompClient.send("/live/mouse-position", {
                userId: Main.getInstance().getUserId,
                x: e.clientX,
                y: e.clientY
              })
        })
    }



}