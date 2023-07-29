import AbstractSpell from "./AbstractSpell";
import CloudBurst from "./literals/jett/CloudBurst";
import UpDraft from "./literals/jett/UpDraft";
import Blaze from "./literals/phoenix/Blaze";
import CurveBall from "./literals/phoenix/CurveBall";
import HotHands from "./literals/phoenix/HotHands";
import RunItBack from "./literals/phoenix/RunItBack";

export default class SpellFactory {
  private static spellMap: Record<string, AbstractSpell[]> = {
    Phoenix: [new Blaze(), new CurveBall(), new HotHands(), new RunItBack()],
    Jett: [new CloudBurst(), new UpDraft()],
  };

  static getSpellsForAgent(agentName: string): AbstractSpell[] {
    if (!SpellFactory.spellMap[agentName]) {
      throw new Error(`No spells found for agent: ${agentName}`);
    }

    return SpellFactory.spellMap[agentName];
  }
}
