export default abstract class ElementNode {
    private _x: number;
    
    private _y: number;
    
    private _height: number;
    
    private _width: number;
    

    constructor(x: number, y: number, height: number, width: number) {
        this._x = x;
        this._y = y;
        this._height = height;
        this._width = width;
    }

    public set setX(x: number) {
        this.x = x;
    }

    public set setY(y: number) {
        this.y = y;
    }

    public get height(): number {
        return this._height;
    }
    public set height(value: number) {
        this._height = value;
    }

    public get width(): number {
        return this._width;
    }
    public set width(value: number) {
        this._width = value;
    }
    public get y(): number {
        return this._y;
    }
    public set y(value: number) {
        this._y = value;
    }
    public get x(): number {
        return this._x;
    }
    public set x(value: number) {
        this._x = value;
    }
}