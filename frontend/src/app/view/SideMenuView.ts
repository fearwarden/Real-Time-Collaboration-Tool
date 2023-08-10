import Main from "../Main";

export interface SideMenuElementes {
  undo: HTMLButtonElement;
  redo: HTMLButtonElement;
}

export default class SideMenuView {
  private _undoElement: HTMLButtonElement;
  private _redoElement: HTMLButtonElement;

  constructor(elements: SideMenuElementes) {
    this._undoElement = elements.undo;
    this._redoElement = elements.redo;
  }

  public enableUndoButton() {
    Main.getInstance().sideMenuView.undoElement.disabled = false;
    Main.getInstance().sideMenuView.undoElement.innerHTML = "undo";
  }
  public disableUndoButton() {
    Main.getInstance().sideMenuView.undoElement.disabled = true;
    Main.getInstance().sideMenuView.undoElement.innerHTML = "disabled";
  }

  public enableRedoButton() {
    Main.getInstance().sideMenuView.redoElement.disabled = false;
    Main.getInstance().sideMenuView.redoElement.innerHTML = "redo";
  }
  public disableRedoButton() {
    Main.getInstance().sideMenuView.redoElement.disabled = true;
    Main.getInstance().sideMenuView.redoElement.innerHTML = "disabled";
  }

  public get undoElement(): HTMLButtonElement {
    return this._undoElement;
  }
  public set undoElement(value: HTMLButtonElement) {
    this._undoElement = value;
  }
  public get redoElement(): HTMLButtonElement {
    return this._redoElement;
  }
  public set redoElement(value: HTMLButtonElement) {
    this._redoElement = value;
  }
}
