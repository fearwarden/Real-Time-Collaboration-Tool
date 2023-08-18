import AbstractSpell from "../../AbstractSpell";
import BoomBotImage from "../../../../../assets/img/agents/raze/Boom_Bot.webp";

export default class BoomBot extends AbstractSpell {
	constructor() {
		super("Raze", "Boom Bot", BoomBotImage, "basic");
	}
}
