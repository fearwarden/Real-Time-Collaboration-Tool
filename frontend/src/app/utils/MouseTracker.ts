import Main from "../Main";

interface MousePositionInterface {
    x: number;
    y: number;
}

export default class MouseTracker {
    private _mousePosition: MousePositionInterface;

    constructor() {
        this._mousePosition = { x: 0, y: 0 };
        this.setupListener();
    }

    private updateMousePosition(e: MouseEvent) {
        if (e.target instanceof HTMLCanvasElement) {
            const x: number = e.clientX - e.target.offsetLeft;
            const y: number = e.clientY - e.target.offsetTop;
            this.mousePosition = {
                x,
                y,
            };
        }
    }

    private setupListener() {
        Main.getInstance().canvas?.canvasElement.addEventListener(
            "mousemove",
            (e) => {
                this.updateMousePosition(e);
            }
        );
    }

    public get mousePosition() {
        return this._mousePosition;
    }

    private set mousePosition(value: MousePositionInterface) {
        this._mousePosition = {
            x: value.x,
            y: value.y,
        };
    }
}