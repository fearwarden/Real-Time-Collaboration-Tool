import AbstractSpell from "../../AbstractSpell";
import SpycamImage from "../../../../../assets/img/agents/cypher/Spycam.webp";

export default class Spycam extends AbstractSpell {
  constructor() {
    super("Cypher", "Spycam", SpycamImage, "signature");
  }
}
