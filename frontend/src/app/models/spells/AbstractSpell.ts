export default abstract class AbstractSpell {
  private agentName: string;
  private name: string;
  private image: string;
  private spellType: string;

  constructor(
    agentName: string,
    name: string,
    image: string,
    spellType: string
  ) {
    this.agentName = agentName;
    this.name = name;
    this.image = image;
    this.spellType = spellType;
  }

  public get getAgentName(): string {
    return this.agentName;
  }

  public get getName(): string {
    return this.name;
  }

  public get getImage(): string {
    return this.image;
  }

  public get getSpellType(): string {
    return this.spellType;
  }
}
