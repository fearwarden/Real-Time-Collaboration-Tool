import BladeStormImage from "../../../../../assets/img/agents/jett/Blade_Storm.webp";
import AbstractSpell from "../../AbstractSpell";

export default class BladeStorm extends AbstractSpell {
  constructor() {
    super("Jett", "Blade Storm", BladeStormImage, "ultimate");
  }
}
