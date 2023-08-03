import ElementNode from "./ElementNode";

export default abstract class MovableElementNode extends ElementNode {
  private mousePressed: boolean;
  private distanceX: number;
  private distanceY: number;

  constructor(x: number, y: number, height: number, width: number) {
    super(x, y, height, width);
    this.mousePressed = false;
    this.distanceX = 0;
    this.distanceY = 0;
  }

  public handleMouseMove(x: number, y: number) {
    if (!this.mousePressed) return;
    super.x = x - this.distanceX;
    super.y = y - this.distanceY;
    super.notifySubscribers(this);
  }

  public handleMousePressed(x: number, y: number) {
    this.distanceX = x - super.x;
    this.distanceY = y - super.y;
    this.mousePressed = true;
  }

  public handleMouseReleased() {
    this.distanceX = 0;
    this.distanceY = 0;
    this.mousePressed = false;
  }
}
