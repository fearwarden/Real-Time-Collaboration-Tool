import Brimstone from "./literals/Brimstone";
import Cypher from "./literals/Cypher";
import Jett from "./literals/Jett";
import Killjoy from "./literals/Killjoy";
import Omen from "./literals/Omen";
import Phoenix from "./literals/Phoenix";
import Raze from "./literals/Raze";
import Reyna from "./literals/Reyna";
import Sage from "./literals/Sage";
import Sova from "./literals/Sova";
import Viper from "./literals/Viper";

export default class AgentManager {
	private brimstone: Brimstone;
	private cypher: Cypher;
	private jett: Jett;
	private killjoy: Killjoy;
	private omen: Omen;
	private phoenix: Phoenix;
	private raze: Raze;
	private reyna: Reyna;
	private sage: Sage;
	private sova: Sova;
	private viper: Viper;

	constructor() {
		this.brimstone = new Brimstone();
		this.cypher = new Cypher();
		this.jett = new Jett();
		this.killjoy = new Killjoy();
		this.omen = new Omen();
		this.phoenix = new Phoenix();
		this.raze = new Raze();
		this.reyna = new Reyna();
		this.sage = new Sage();
		this.sova = new Sova();
		this.viper = new Viper();
	}

	public getAgents() {
		return [
			this.brimstone,
			this.cypher,
			this.jett,
			this.killjoy,
			this.omen,
			this.phoenix,
			this.raze,
			this.reyna,
			this.sage,
			this.sova,
			this.viper,
		];
	}
}
