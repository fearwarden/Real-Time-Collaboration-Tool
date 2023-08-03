import ElementNode, { Geometry } from "../models/elements/ElementNode";

export default interface ElementView {
  draw(): void;
  get elementNode(): ElementNode;
  getGeometry(): Geometry;
}
