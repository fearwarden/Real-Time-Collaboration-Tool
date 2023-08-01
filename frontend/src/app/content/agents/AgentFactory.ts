import Brimstone from "./literals/Brimstone";
import Cypher from "./literals/Cypher";
import Jett from "./literals/Jett";
import Killjoy from "./literals/Killjoy";
import Omen from "./literals/Omen";
import Phoenix from "./literals/Phoenix";
import Reyna from "./literals/Reyna";
import Sage from "./literals/Sage";
import Sova from "./literals/Sova";
import Viper from "./literals/Viper";

export default class AgentFactory {
  public static createAgent(agentName: string) {
    switch (agentName) {
      case "Brimstone":
        return new Brimstone();
      case "Cypher":
        return new Cypher();
      case "Jett":
        return new Jett();
      case "Killjoy":
        return new Killjoy();
      case "Omen":
        return new Omen();
      case "Phoenix":
        return new Phoenix();
      case "Sage":
        return new Sage();
      case "Sova":
        return new Sova();
      case "Viper":
        return new Viper();
      case "Reyna":
        return new Reyna();

      default:
        throw new Error("Agent does not exist.");
    }
  }
}
