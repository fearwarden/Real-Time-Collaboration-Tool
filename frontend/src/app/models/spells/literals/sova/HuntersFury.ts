import AbstractSpell from "../../AbstractSpell";
import HuntersFuryImage from "../../../../../assets/img/agents/sova/Hunter%27s_Fury.webp";

export default class HuntersFury extends AbstractSpell {
  constructor() {
    super("Sova", "Hunter's Fury", HuntersFuryImage, "ultimate");
  }
}
