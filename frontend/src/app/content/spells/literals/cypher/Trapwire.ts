import AbstractSpell from "../../AbstractSpell";
import TrapwireImage from "../../../../../assets/img/agents/cypher/Trapwire.webp";

export default class Trapwire extends AbstractSpell {
	constructor() {
		super("Cypher", "Trapwire", TrapwireImage, "basic");
	}
}
