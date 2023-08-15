import IAction from "../IAction";
import Main from "../../../Main";

export default class StartPenStateAction implements IAction {

    doAction(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
        if (Main.getInstance().drawingStateManager.currentState === null) {
            Main.getInstance().canvas.drawingView.startPenState();
        } else {
            Main.getInstance().canvas.drawingView.startNullState();
        }

    }

}