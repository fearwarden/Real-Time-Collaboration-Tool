import Main from "../../../Main";
import ISubscription from "../ISubscription";

export interface MousePosition {
  userId: string;
  x: number;
  y: number;
}

export default class MousePositionSubscription implements ISubscription {
  constructor() {}

  get topic(): string {
    return "/topic/strategies/mouse-position";
  }
  callback(message: any): void {
    const data: MousePosition = JSON.parse(message.body);
    if (data.userId === Main.getInstance().userId) return;
    // Keep the dot within the canvas boundaries
    //Main.getInstance().canvas!.drawDot(data.x, data.y);
  }
}
