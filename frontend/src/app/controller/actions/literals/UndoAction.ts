import Main from "../../../Main";
import IAction from "../IAction";

export default class UndoAction implements IAction {
  doAction(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
    if (event.target instanceof HTMLButtonElement) {
      Main.getInstance().commandManager.undoCommand();
    }
  }
}
