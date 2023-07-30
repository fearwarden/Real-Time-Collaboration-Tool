import AbstractSpell from "./AbstractSpell";
import Incendiary from "./literals/brimstone/Incendiary";
import OrbitalStrike from "./literals/brimstone/OrbitalStrike";
import SkySmoke from "./literals/brimstone/SkySmoke";
import StimBeacon from "./literals/brimstone/StimBeacon";
import BladeStorm from "./literals/jett/BladeStorm";
import CloudBurst from "./literals/jett/CloudBurst";
import TailwindSpell from "./literals/jett/TailwindSpell";
import UpDraft from "./literals/jett/UpDraft";
import ShroudedStep from "./literals/omen/ShroudedStep";
import Blaze from "./literals/phoenix/Blaze";
import CurveBall from "./literals/phoenix/CurveBall";
import HotHands from "./literals/phoenix/HotHands";
import RunItBack from "./literals/phoenix/RunItBack";
import PoisonCloud from "./literals/viper/PoisonCloud";
import SnakeBite from "./literals/viper/SnakeBite";
import ToxicScreen from "./literals/viper/TxociScreen";
import VipersPit from "./literals/viper/VipersPit";

export default class SpellFactory {
  private static spellMap: Record<string, AbstractSpell[]> = {
    Phoenix: [new Blaze(), new CurveBall(), new HotHands(), new RunItBack()],
    Jett: [
      new CloudBurst(),
      new UpDraft(),
      new TailwindSpell(),
      new BladeStorm(),
    ],
    Brimstone: [
      new StimBeacon(),
      new Incendiary(),
      new SkySmoke(),
      new OrbitalStrike(),
    ],
    Viper: [
      new SnakeBite(),
      new PoisonCloud(),
      new ToxicScreen(),
      new VipersPit(),
    ],
    Omen: [new ShroudedStep()],
  };

  static getSpellsForAgent(agentName: string): AbstractSpell[] {
    if (!SpellFactory.spellMap[agentName]) {
      throw new Error(`No spells found for agent: ${agentName}`);
    }

    return SpellFactory.spellMap[agentName];
  }
}
