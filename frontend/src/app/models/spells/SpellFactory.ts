import AbstractSpell from "./AbstractSpell";
import Blaze from "./literals/phoenix/Blaze";

export default class SpellFactory {
  private static spellMap: Record<string, AbstractSpell[]> = {
    Phoenix: [new Blaze()],
  };

  static getSpellsForAgent(agentName: string): AbstractSpell[] {
    if (!SpellFactory.spellMap[agentName]) {
      throw new Error(`No spells found for agent: ${agentName}`);
    }

    return SpellFactory.spellMap[agentName];
  }
}
