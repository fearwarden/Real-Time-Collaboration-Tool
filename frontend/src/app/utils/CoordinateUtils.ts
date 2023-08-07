import { Geometry } from "../models/elements/ElementNode";

export interface CameraOffset {
  x: number,
  y: number
}
export interface Point {
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

  public static screenToWorld(point: Point, offset: CameraOffset): Point {
    return {
      x: point.x + offset.x,
      y: point.y + offset.y
    }
  }

  public static worldToScreen(point: Point, offset: CameraOffset): Point {
    return {
      x: point.x - offset.x,
      y: point.y - offset.y
    }
  }

  public static getCanvasMousePosition(e: MouseEvent): Point {
    if (!(e.target instanceof HTMLCanvasElement)) throw new Error("Element is not a canvas.");
    return {
      x: e.clientX - e.target.offsetLeft,
      y: e.clientY - e.target.offsetTop
    }
  }

}
