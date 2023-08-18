import AbstractSpell from "../../AbstractSpell";
import StimBeaconImage from "../../../../../assets/img/agents/brimstone/Stim_Beacon.webp";

export default class StimBeacon extends AbstractSpell {
	constructor() {
		super("Brimstone", "Stim Beacon", StimBeaconImage, "basic");
	}
}
