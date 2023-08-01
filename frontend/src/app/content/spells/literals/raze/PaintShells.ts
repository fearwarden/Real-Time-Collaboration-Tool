import AbstractSpell from "../../AbstractSpell";
import PaintShellsImage from "../../../../../assets/img/agents/raze/Paint_Shells.webp";

export default class PaintShells extends AbstractSpell {
  constructor() {
    super("Raze", "Paint Shells", PaintShellsImage, "signature");
  }
}
