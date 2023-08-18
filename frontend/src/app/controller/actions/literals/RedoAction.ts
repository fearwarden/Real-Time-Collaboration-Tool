import Main from "../../../Main";
import IAction from "../IAction";

export default class RedoAction implements IAction {
	doAction(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
		if (event.target instanceof HTMLButtonElement) {
			Main.getInstance().commandManager.doCommand();
		}
	}
}
