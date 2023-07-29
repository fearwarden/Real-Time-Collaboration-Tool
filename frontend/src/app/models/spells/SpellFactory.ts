import AbstractSpell from "./AbstractSpell";
import BladeStorm from "./literals/jett/BladeStorm";
import CloudBurst from "./literals/jett/CloudBurst";
import TailwindSpell from "./literals/jett/TailwindSpell";
import UpDraft from "./literals/jett/UpDraft";
import Blaze from "./literals/phoenix/Blaze";
import CurveBall from "./literals/phoenix/CurveBall";
import HotHands from "./literals/phoenix/HotHands";
import RunItBack from "./literals/phoenix/RunItBack";

export default class SpellFactory {
  private static spellMap: Record<string, AbstractSpell[]> = {
    Phoenix: [new Blaze(), new CurveBall(), new HotHands(), new RunItBack()],
    Jett: [
      new CloudBurst(),
      new UpDraft(),
      new TailwindSpell(),
      new BladeStorm(),
    ],
  };

  static getSpellsForAgent(agentName: string): AbstractSpell[] {
    if (!SpellFactory.spellMap[agentName]) {
      throw new Error(`No spells found for agent: ${agentName}`);
    }

    return SpellFactory.spellMap[agentName];
  }
}
