import Main from "../../../Main";
import EraserState from "../../../state/drawing/literals/EraserState";
import IAction from "../IAction";

export default class StartEraserStateAction implements IAction {
  doAction(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
    if (
      Main.getInstance().drawingStateManager.currentState instanceof EraserState
    ) {
      Main.getInstance().canvas.drawingView.startNullState();
    } else {
      Main.getInstance().canvas.drawingView.startEraserState();
    }
  }
}
