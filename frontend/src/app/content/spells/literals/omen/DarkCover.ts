import AbstractSpell from "../../AbstractSpell";
import DarkCoverImage from "../../../../../assets/img/agents/omen/Dark_Cover.webp";

export default class DarkCover extends AbstractSpell {
	constructor() {
		super("Omen", "Dark Cover", DarkCoverImage, "signature");
	}
}
