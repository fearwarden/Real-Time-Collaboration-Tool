import AbstractSpell from "../../AbstractSpell";
import AlarmbotImage from "../../../../../assets/img/agents/killjoy/Alarmbot.webp";

export default class Alarmbot extends AbstractSpell {
  constructor() {
    super("Killjoy", "Alarmbot", AlarmbotImage, "basic");
  }
}
