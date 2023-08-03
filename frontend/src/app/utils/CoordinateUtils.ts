import { Geometry } from "../models/elements/ElementNode";

interface Point {
  x: number;
  y: number;
}

export default class CoordinateUtils {
  public static checkCoordinatesInElement(
    point: Point,
    elementGeometry: Geometry
  ): boolean {
    return (
      point.x > elementGeometry.x &&
      point.x < elementGeometry.x + elementGeometry.width &&
      point.y > elementGeometry.y &&
      point.y < elementGeometry.y + elementGeometry.width
    );
  }
}
