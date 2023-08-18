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
    elementGeometry: Geometry,
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
    zoom: number,
  ): Point {
    return {
      x: (point.x - offset.x) / zoom,
      y: (point.y - offset.y) / zoom,
    };
  }

  public static worldToScreen(
    point: Point,
    offset: CameraOffset,
    zoom: number,
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

  /**
   * Computes the minimum Euclidean distance from a point to a line segment.
   *
   * @param px, py - The x and y coordinates of the mouse.
   * @param x1, y1 - The x and y coordinates of the first endpoint of the line segment.
   * @param x2, y2 - The x and y coordinates of the second endpoint of the line segment.
   *
   * @returns The shortest distance from the point (px, py) to the line segment defined by (x1, y1) and (x2, y2).
   */
  public static pointToSegmentDistance(
    px: number,
    py: number,
    x1: number,
    y1: number,
    x2: number,
    y2: number,
  ): number {
    // Calculate the squared length of the line segment
    const l2 = (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);

    // If the length is zero, the segment is actually a point
    // In this case, return the Euclidean distance between the point (px, py) and (x1, y1)
    if (l2 === 0)
      return Math.sqrt((px - x1) * (px - x1) + (py - y1) * (py - y1));

    // Project the point (px, py) onto the line segment, determining where it falls between (x1, y1) and (x2, y2)
    // The variable 't' represents the relative position of the projection on the segment
    let t = ((px - x1) * (x2 - x1) + (py - y1) * (y2 - y1)) / l2;

    // Ensure t is clamped between 0 and 1
    // If t=0, it means the projection falls on (x1, y1)
    // If t=1, it means the projection falls on (x2, y2)
    t = Math.max(0, Math.min(1, t));

    // Compute the coordinates of the projection of (px, py) onto the segment
    const projX = x1 + t * (x2 - x1);
    const projY = y1 + t * (y2 - y1);

    // Return the Euclidean distance between the point (px, py) and its projection onto the segment
    return Math.sqrt((px - projX) * (px - projX) + (py - projY) * (py - projY));
  }
}
