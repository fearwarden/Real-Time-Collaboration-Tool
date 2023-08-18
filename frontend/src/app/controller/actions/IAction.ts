export default interface IAction {
  doAction(event: React.MouseEvent<HTMLElement, MouseEvent>): void;
}
