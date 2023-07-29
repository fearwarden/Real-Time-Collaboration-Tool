import AbstractSpell from "../../AbstractSpell";
import BlazeImage from "../../../../../assets/img/agents/phoenix/Blaze.webp";

export default class Blaze extends AbstractSpell {
  constructor() {
    super("Phoenix", "Blaze", BlazeImage, "basic");
  }
}
