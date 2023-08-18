import AbstractSpell from "../../AbstractSpell";
import CurveBallImage from "../../../../../assets/img/agents/phoenix/Curveball.webp";

export default class CurveBall extends AbstractSpell {
	constructor() {
		super("Phoenix", "Curve Ball", CurveBallImage, "basic");
	}
}
