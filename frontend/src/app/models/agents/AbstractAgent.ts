import AbstractSpell from "../spells/AbstractSpell";
import SpellFactory from "../spells/SpellFactory";

export default abstract class AbstractAgent {
  private name: string;
  private image: string;
  private spells: AbstractSpell[];

  constructor(name: string, image: string) {
    this.name = name;
    this.image = image;
    this.spells = SpellFactory.getSpellsForAgent(this.name);
  }

  public get getName(): string {
    return this.name;
  }

  public get getImage(): string {
    return this.image;
  }

  public get getSpells(): AbstractSpell[] {
    return this.spells;
  }
}
