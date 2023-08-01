import AbstractSpell from "../../AbstractSpell";
import BlastPackImage from "../../../../../assets/img/agents/raze/Blast_Pack.webp";

export default class BlastPack extends AbstractSpell {
  constructor() {
    super("Raze", "Blast Pack", BlastPackImage, "basic");
  }
}
