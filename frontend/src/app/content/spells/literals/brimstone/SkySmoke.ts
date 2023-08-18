import AbstractSpell from "../../AbstractSpell";
import SkySmokeImage from "../../../../../assets/img/agents/brimstone/Sky_Smoke.webp";

export default class SkySmoke extends AbstractSpell {
	constructor() {
		super("Brimstone", "Sky Smoke", SkySmokeImage, "signature");
	}
}
