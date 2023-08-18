import AbstractSpell from "../../AbstractSpell";
import TurretImage from "../../../../../assets/img/agents/killjoy/Turret.webp";

export default class Turret extends AbstractSpell {
	constructor() {
		super("Killjoy", "Turret", TurretImage, "signature");
	}
}
