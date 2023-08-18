import IPublisher from "../utils/observer/IPublisher";
import ISubscriber from "../utils/observer/ISubscriber";
import DrawingPoint from "./DrawingPoint";
import ElementNode from "./elements/ElementNode";

export default class Strategy implements IPublisher {
  private _elements: ElementNode[];

  private _drawingPoints: DrawingPoint[][];

  constructor() {
    this._elements = [];
    this._drawingPoints = [];
  }

  notifySubscribers(notification: any): void {
    throw new Error("Method not implemented.");
  }
  addSubscriber(subscriber: ISubscriber): void {
    throw new Error("Method not implemented.");
  }
  removeSubscriber(subscriber: ISubscriber): void {
    throw new Error("Method not implemented.");
  }

  public get elements(): ElementNode[] {
    return this._elements;
  }
  public set elements(value: ElementNode[]) {
    this._elements = value;
  }
  public get drawingPoints(): DrawingPoint[][] {
    return this._drawingPoints;
  }
}
