import AbstractSpell from "../../AbstractSpell";
import ParanoiaImage from "../../../../../assets/img/agents/omen/Paranoia.webp";

export default class Paranoia extends AbstractSpell {
  constructor() {
    super("Omen", "Paranoia", ParanoiaImage, "basic");
  }
}
