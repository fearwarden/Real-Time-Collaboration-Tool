import AbstractSpell from "../../AbstractSpell";
import DismissImage from "../../../../../assets/img/agents/reyna/Dismiss.webp";

export default class Dismiss extends AbstractSpell {
	constructor() {
		super("Reyna", "Dismiss", DismissImage, "signature");
	}
}
