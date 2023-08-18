import AbstractSpell from "../../AbstractSpell";
import PoisonCloudImage from "../../../../../assets/img/agents/viper/Poison_Cloud.webp";

export default class PoisonCloud extends AbstractSpell {
	constructor() {
		super("Viper", "Poison Cloud", PoisonCloudImage, "basic");
	}
}
