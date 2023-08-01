import AbstractSpell from "../../AbstractSpell";
import SnakeBiteImage from "../../../../../assets/img/agents/viper/Snake_Bite.webp";

export default class SnakeBite extends AbstractSpell {
  constructor() {
    super("Viper", "Snake Bite", SnakeBiteImage, "basic");
  }
}
