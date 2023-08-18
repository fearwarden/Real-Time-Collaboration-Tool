import AbstractSpell from "../../AbstractSpell";
import ReconBoltImage from "../../../../../assets/img/agents/sova/Recon_Bolt.webp";

export default class ReconBolt extends AbstractSpell {
	constructor() {
		super("Sova", "Recon Bolt", ReconBoltImage, "signature");
	}
}
