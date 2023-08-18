import AbstractSpell from "../../AbstractSpell";
import ToxicScreenImage from "../../../../../assets/img/agents/viper/Toxic_Screen.webp";

export default class ToxicScreen extends AbstractSpell {
	constructor() {
		super("Viper", "Toxic Screen", ToxicScreenImage, "signature");
	}
}
