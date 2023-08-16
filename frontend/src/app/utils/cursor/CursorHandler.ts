import Main from "../../Main";
import PenState from "../../state/drawing/literals/PenState";
import Pencil from "../../../assets/img/elements/pencil.svg";
import { CursorType } from "./CursorType";

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
        const drawingState = Main.getInstance().drawingStateManager.currentState
        if (drawingState instanceof PenState) return `url(${Pencil}),auto`;
        return "auto";
    }
}

