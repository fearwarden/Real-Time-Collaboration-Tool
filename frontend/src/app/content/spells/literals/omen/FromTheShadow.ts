import AbstractSpell from "../../AbstractSpell";
import FromTheShadowImage from "../../../../../assets/img/agents/omen/From_the_Shadows.webp";

export default class FromTheShadow extends AbstractSpell {
  constructor() {
    super("Omen", "From the Shadow", FromTheShadowImage, "ultimate");
  }
}
