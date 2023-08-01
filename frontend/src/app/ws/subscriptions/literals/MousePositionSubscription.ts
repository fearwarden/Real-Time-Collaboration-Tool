import Main from "../../../Main";
import AbstractSubscription from "../AbstractSubscription";

export interface MousePosition {
    userId: string,
    x: number,
    y: number,
}

export default class MousePositionSubscription extends AbstractSubscription {

    constructor() {
        super("/topic/strategies/mouse-position", (message: any) => {
            const data: MousePosition = JSON.parse(message.body);
            if(data.userId === Main.getInstance().userId) return;
            // Keep the dot within the canvas boundaries
            Main.getInstance().canvas!.drawDot(data.x, data.y);
        });
    }
}