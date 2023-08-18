import IAction from "../IAction";

export default class ChangePenColorAction implements IAction {
	doAction(event: React.MouseEvent<HTMLElement, MouseEvent>): void {
		throw new Error("Method not implemented.");
	}
}
