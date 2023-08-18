import AbstractSpell from "../../AbstractSpell";
import HotHandsImage from "../../../../../assets/img/agents/phoenix/Hot_Hands.webp";

export default class HotHands extends AbstractSpell {
	constructor() {
		super("Phoenix", "Hot Hands", HotHandsImage, "signature");
	}
}
