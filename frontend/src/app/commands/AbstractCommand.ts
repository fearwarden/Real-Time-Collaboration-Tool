export default interface AbstractCommand {
    doCommand(): void;
    undoCommand(): void;
}