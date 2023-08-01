import AbstractSpell from "../../AbstractSpell";
import LockdownImage from "../../../../../assets/img/agents/killjoy/Lockdown.webp";

export default class Lockdown extends AbstractSpell {
  constructor() {
    super("Killjoy", "Lockdown", LockdownImage, "ultimate");
  }
}
