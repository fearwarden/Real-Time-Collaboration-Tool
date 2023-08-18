import Main from "../../Main";
import DrawingPoint from "../../models/DrawingPoint";
import ICommand from "../ICommand";

export default class DrawLineCommand implements ICommand {
  private _drawingPoints: DrawingPoint[];

  constructor(drawingPoints: DrawingPoint[]) {
    this._drawingPoints = drawingPoints;
  }

  doCommand(): void {
    if (
      Main.getInstance().strategyModel.drawingPoints.indexOf(
        this._drawingPoints,
      ) > -1
    ) {
      Main.getInstance().strategyModel.drawingPoints.splice(
        Main.getInstance().strategyModel.drawingPoints.indexOf(
          this._drawingPoints,
        ),
        1,
      );
    }
    Main.getInstance().strategyModel.drawingPoints.push(this._drawingPoints);
  }
  undoCommand(): void {
    if (
      Main.getInstance().strategyModel.drawingPoints.indexOf(
        this._drawingPoints,
      ) > -1
    ) {
      Main.getInstance().strategyModel.drawingPoints.splice(
        Main.getInstance().strategyModel.drawingPoints.indexOf(
          this._drawingPoints,
        ),
        1,
      );
    }
  }
}
