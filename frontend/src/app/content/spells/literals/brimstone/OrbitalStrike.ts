import AbstractSpell from "../../AbstractSpell";
import OrbitalStrikeImage from "../../../../../assets/img/agents/brimstone/Orbital_Strike.webp";

export default class OrbitalStrike extends AbstractSpell {
  constructor() {
    super("Brimstone", "Orbital Strike", OrbitalStrikeImage, "ultimate");
  }
}
