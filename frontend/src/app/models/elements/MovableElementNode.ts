import ElementNode from "./ElementNode";

export default abstract class MovableElementNode extends ElementNode {

    constructor(x: number, y: number, height: number, width: number){
        super(x, y, height, width);
    }

    public handleDrag(x: number, y: number){
        super.x = x;
        super.y = y
        super.notifySubscribers(this);
    }
}