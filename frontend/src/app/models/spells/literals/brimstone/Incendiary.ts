import AbstractSpell from "../../AbstractSpell";
import IncendiaryImage from "../../../../../assets/img/agents/brimstone/Incendiary.webp";

export default class Incendiary extends AbstractSpell {
  constructor() {
    super("Brimstone", "Incendiary", IncendiaryImage, "basic");
  }
}
