import AbstractSpell from "../../AbstractSpell";
import EmpressImage from "../../../../../assets/img/agents/reyna/Empress.webp";

export default class Empress extends AbstractSpell {
  constructor() {
    super("Reyna", "Empress", EmpressImage, "ultimate");
  }
}
