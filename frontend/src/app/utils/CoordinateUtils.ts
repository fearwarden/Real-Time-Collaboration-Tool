import { Geometry } from "../models/elements/ElementNode";

export interface CameraOffset {
  x: number;
  y: number;
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

  public static screenToWorld(
    point: Point,
    offset: CameraOffset,
    zoom: number
  ): Point {
    return {
      x: (point.x - offset.x) / zoom,
      y: (point.y - offset.y) / zoom,
    };
  }

  public static worldToScreen(
    point: Point,
    offset: CameraOffset,
    zoom: number
  ): Point {
    return {
      x: (point.x + offset.x) * zoom,
      y: (point.y + offset.y) * zoom,
    };
  }

  public static getCanvasMousePosition(e: MouseEvent): Point {
    if (!(e.target instanceof HTMLCanvasElement))
      throw new Error("Element is not a canvas.");
    return {
      x: e.clientX - e.target.offsetLeft,
      y: e.clientY - e.target.offsetTop,
    };
  }

  public static pointToSegmentDistance(
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number
  ): number {
    const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
    if (l2 === 0)
      return Math.sqrt((px - x1) * (px - x1) + (py - y1) * (py - y1)); // ako je 0 znaci da je tacka u pitanju i vracamo euclidian distance izmedju misa i tacke na liniji

    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;
    t = Math.max(0, Math.min(1, t));

    const projX = x1 + t * (x2 - x1);
    const projY = y1 + t * (y2 - y1);

    return Math.sqrt((px - projX) * (px - projX) + (py - projY) * (py - projY));
  }
}
