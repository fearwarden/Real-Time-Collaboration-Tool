import Main from "../../Main";
import { CursorType } from "./CursorType";
import PenState from "../../state/drawing/literals/PenState";
import EraserState from "../../state/drawing/literals/EraserState";
import Pencil from "../../../assets/img/elements/pencil.svg";
import Eraser from "../../../assets/img/elements/eraser.svg";

export default class CursorHanlder {
  private element: HTMLElement;

  constructor(element: HTMLElement) {
    this.element = element;
  }

  public setDefaultCursor() {
    this.element.style.cursor = this.getCursor();
  }

  public setCustomPredefinedCursor(cursor: CursorType) {
    this.element.style.cursor = cursor;
  }

  private getCursor(): string {
    const drawingState = Main.getInstance().drawingStateManager.currentState;
    if (drawingState instanceof PenState) return `url(${Pencil}) 0 40,auto`;
    if (drawingState instanceof EraserState) return `url(${Eraser}) 0 46,auto`;
    return "auto";
  }
}
