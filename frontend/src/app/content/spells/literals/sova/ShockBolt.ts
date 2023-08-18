import AbstractSpell from "../../AbstractSpell";
import ShockBoltImage from "../../../../../assets/img/agents/sova/Shock_Bolt.webp";

export default class ShockBolt extends AbstractSpell {
	constructor() {
		super("Sova", "Shock Bolt", ShockBoltImage, "basic");
	}
}
