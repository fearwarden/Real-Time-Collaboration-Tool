export default abstract class AbstractSpell {
  private _agentName: string;
  private _name: string;
  private _image: string;
  private _spellType: string;

  constructor(
    agentName: string,
    name: string,
    image: string,
    spellType: string,
  ) {
    this._agentName = agentName;
    this._name = name;
    this._image = image;
    this._spellType = spellType;
  }

  public get agentName(): string {
    return this._agentName;
  }

  public get name(): string {
    return this._name;
  }

  public get image(): string {
    return this._image;
  }

  public get spellType(): string {
    return this._spellType;
  }
}
