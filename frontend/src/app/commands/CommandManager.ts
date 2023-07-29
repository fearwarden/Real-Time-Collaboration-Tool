import AbstractCommand from "./AbstractCommand";

export default class CommandManager {
    private commands: AbstractCommand[];
    private currentCommand: number = -1;

    constructor() {
        this.commands = [];
    }

    public addCommand(command: AbstractCommand): void {
        for(let i = this.currentCommand; i < this.commands.length; i++) { //Deletes every command to the right of the pointer
            this.commands.splice(this.currentCommand, 1);
        }

        this.commands.push(command);
        this.currentCommand++;
        this.doCommand();
    }

    public doCommand() {
        if(this.currentCommand != this.commands.length - 1){
            this.currentCommand++;
        }
        if(this.currentCommand == this.commands.length - 1) {
            // Disable redo button
        }

        this.commands[this.currentCommand].doCommand();
        //Enable undo button
    }

    public undoCommand() {
        this.commands[this.currentCommand].undoCommand();
        this.currentCommand--;

        //Enable redo button

        if(this.currentCommand == -1) {
            //Disable undo button
        }
    }

}