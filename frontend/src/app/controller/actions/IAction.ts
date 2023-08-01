export default interface IAction {
    doAction(event: React.MouseEvent<HTMLButtonElement, MouseEvent>): void
}