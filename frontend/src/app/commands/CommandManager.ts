import Main from "../Main";
import SideMenuView from "../view/SideMenuView";
import AbstractCommand from "./ICommand";

export default class CommandManager {
  private commands: AbstractCommand[];
  private currentCommand: number = -1;
  private _isUndoDisabled: boolean;
  private _isRedoDisabled: boolean;

  constructor() {
    this.commands = [];
    this._isRedoDisabled = true;
    this._isUndoDisabled = true;
  }

  public addCommand(command: AbstractCommand): void {
    for (let i = this.currentCommand + 1; i < this.commands.length; i++) {
      //Deletes every command to the right of the pointer
      this.commands.splice(this.currentCommand, 1);
    }

    this.commands.push(command);
    this.doCommand();
  }

  public doCommand() {
    if (this.currentCommand != this.commands.length - 1) {
      this.currentCommand++;
    }
    if (this.currentCommand == this.commands.length - 1) {
      // Disable redo button
      Main.getInstance().sideMenuView.disableRedoButton();
    }
    this.commands[this.currentCommand].doCommand();
    //Enable undo button
    Main.getInstance().sideMenuView.enableUndoButton();
  }

  public undoCommand() {
    this.commands[this.currentCommand].undoCommand();
    this.currentCommand--;

    //Enable redo button
    Main.getInstance().sideMenuView.enableRedoButton();

    if (this.currentCommand == -1) {
      //Disable undo button
      Main.getInstance().sideMenuView.disableUndoButton();
    }
  }

  public get isUndoDisabled(): boolean {
    return this._isUndoDisabled;
  }
  public set isUndoDisabled(value: boolean) {
    this._isUndoDisabled = value;
  }
  public get isRedoDisabled(): boolean {
    return this._isRedoDisabled;
  }
  public set isRedoDisabled(value: boolean) {
    this._isRedoDisabled = value;
  }
}
