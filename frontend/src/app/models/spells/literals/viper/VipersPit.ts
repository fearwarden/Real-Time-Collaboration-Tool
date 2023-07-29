import AbstractSpell from "../../AbstractSpell";
import VipersPitImage from "../../../../../assets/img/agents/viper/Viper%27s_Pit.webp";

export default class VipersPit extends AbstractSpell {
  constructor() {
    super("Viper", "Viper's Pit", VipersPitImage, "ultimate");
  }
}
