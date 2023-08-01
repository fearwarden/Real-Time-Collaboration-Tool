import AbstractSpell from "../../AbstractSpell";
import SlowOrbImage from "../../../../../assets/img/agents/sage/Slow_Orb.webp";

export default class SlowOrb extends AbstractSpell {
  constructor() {
    super("Sage", "Slow Orb", SlowOrbImage, "basic");
  }
}
