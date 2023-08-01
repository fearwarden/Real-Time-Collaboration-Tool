import AbstractSpell from "../../AbstractSpell";
import DevourImage from "../../../../../assets/img/agents/reyna/Devour.webp";

export default class Devour extends AbstractSpell {
  constructor() {
    super("Reyna", "Devour", DevourImage, "signature");
  }
}
