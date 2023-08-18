import IAction from "../IAction";
import Main from "../../../Main";
import PenState from "../../../state/drawing/literals/PenState";

export default class StartPenStateAction implements IAction {
	doAction(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
		if (Main.getInstance().drawingStateManager.currentState instanceof PenState) {
			Main.getInstance().canvas.drawingView.startNullState();
		} else {
			Main.getInstance().canvas.drawingView.startPenState();
		}
	}
}
