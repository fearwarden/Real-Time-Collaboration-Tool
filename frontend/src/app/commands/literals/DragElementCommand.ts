import ElementNode from "../../models/elements/ElementNode";
import { Point } from "../../utils/CoordinateUtils";
import ICommand from "../ICommand";

export default class DragElementCommand implements ICommand {

    private element: ElementNode;
    private startingPoint: Point;
    private endPoint: Point;

    constructor(startingPoint: Point, endPoint: Point, element: ElementNode) {
        this.element = element;
        this.startingPoint = startingPoint;
        this.endPoint = endPoint;
    }

    doCommand(): void {
        this.element.x = this.endPoint.x;
        this.element.y = this.endPoint.y;
    }
    undoCommand(): void {
        this.element.x = this.startingPoint.x;
        this.element.y = this.startingPoint.y;
    }

}