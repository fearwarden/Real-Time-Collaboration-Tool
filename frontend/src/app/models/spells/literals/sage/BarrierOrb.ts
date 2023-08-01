import AbstractSpell from "../../AbstractSpell";
import BarrierOrbImage from "../../../../../assets/img/agents/sage/Barrier_Orb.webp";

export default class BarrierOrb extends AbstractSpell {
  constructor() {
    super("Sage", "Barrier Orb", BarrierOrbImage, "basic");
  }
}
