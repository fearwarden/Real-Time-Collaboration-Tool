import AbstractSpell from "./AbstractSpell";
import Incendiary from "./literals/brimstone/Incendiary";
import OrbitalStrike from "./literals/brimstone/OrbitalStrike";
import SkySmoke from "./literals/brimstone/SkySmoke";
import StimBeacon from "./literals/brimstone/StimBeacon";
import CyberCage from "./literals/cypher/CyberCage";
import NeuralTheft from "./literals/cypher/NeuralTheft";
import Spycam from "./literals/cypher/Spycam";
import Trapwire from "./literals/cypher/Trapwire";
import BladeStorm from "./literals/jett/BladeStorm";
import CloudBurst from "./literals/jett/CloudBurst";
import TailwindSpell from "./literals/jett/TailwindSpell";
import UpDraft from "./literals/jett/UpDraft";
import Alarmbot from "./literals/killjoy/Alarmbot";
import Lockdown from "./literals/killjoy/Lockdown";
import Nanoswarm from "./literals/killjoy/Nanoswarm";
import Turret from "./literals/killjoy/Turret";
import DarkCover from "./literals/omen/DarkCover";
import FromTheShadow from "./literals/omen/FromTheShadow";
import Paranoia from "./literals/omen/Paranoia";
import ShroudedStep from "./literals/omen/ShroudedStep";
import Blaze from "./literals/phoenix/Blaze";
import CurveBall from "./literals/phoenix/CurveBall";
import HotHands from "./literals/phoenix/HotHands";
import RunItBack from "./literals/phoenix/RunItBack";
import HuntersFury from "./literals/sova/HuntersFury";
import OwlDrone from "./literals/sova/OwlDrone";
import ReconBolt from "./literals/sova/ReconBolt";
import ShockBolt from "./literals/sova/ShockBolt";
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
    Omen: [
      new ShroudedStep(),
      new Paranoia(),
      new DarkCover(),
      new FromTheShadow(),
    ],
    Killjoy: [new Nanoswarm(), new Alarmbot(), new Turret(), new Lockdown()],
    Cypher: [new Trapwire(), new CyberCage(), new Spycam(), new NeuralTheft()],
    Sova: [new OwlDrone(), new ShockBolt(), new ReconBolt(), new HuntersFury()],
  };

  static getSpellsForAgent(agentName: string): AbstractSpell[] {
    if (!SpellFactory.spellMap[agentName]) {
      throw new Error(`No spells found for agent: ${agentName}`);
    }

    return SpellFactory.spellMap[agentName];
  }
}
