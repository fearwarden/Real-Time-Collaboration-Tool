import AbstractSpell from "../../AbstractSpell";
import ShroudedStepImage from "../../../../../assets/img/agents/omen/Shrouded_Step.webp";

export default class ShroudedStep extends AbstractSpell {
	constructor() {
		super("Omen", "Shrouded Step", ShroudedStepImage, "basic");
	}
}
