import AbstractSpell from "../../AbstractSpell";
import HealingOrbImage from "../../../../../assets/img/agents/sage/Healing_Orb.webp";

export default class HealingOrb extends AbstractSpell {
  constructor() {
    super("Sage", "Healing Orb", HealingOrbImage, "signature");
  }
}
