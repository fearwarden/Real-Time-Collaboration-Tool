export default interface ICommand {
  doCommand(): void;
  undoCommand(): void;
}
