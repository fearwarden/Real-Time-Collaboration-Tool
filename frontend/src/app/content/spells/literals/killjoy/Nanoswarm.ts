import AbstractSpell from "../../AbstractSpell";
import NanoswarmImage from "../../../../../assets/img/agents/killjoy/Nanoswarm.webp";

export default class Nanoswarm extends AbstractSpell {
	constructor() {
		super("Killjoy", "Nanoswarm", NanoswarmImage, "basic");
	}
}
