import AbstractSpell from "../../AbstractSpell";
import ResurrectionImage from "../../../../../assets/img/agents/sage/Resurrection.webp";

export default class Resurrection extends AbstractSpell {
	constructor() {
		super("Sage", "Resurrection", ResurrectionImage, "ultimate");
	}
}
