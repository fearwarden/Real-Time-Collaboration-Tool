import ElementNode from "./ElementNode";

export default abstract class MovableElementNode extends ElementNode {

    constructor(x: number, y: number, height: number, width: number){
        super(x, y, height, width);
    }

    handleDrag(e: MouseEvent){
        if(e.target instanceof HTMLCanvasElement){
            super.setX = e.clientX - e.target!.offsetLeft;
            super.setY = e.clientY - e.target!.offsetTop;
        }
    }

}