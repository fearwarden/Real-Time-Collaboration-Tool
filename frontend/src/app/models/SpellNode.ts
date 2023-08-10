import AbstractSpell from "../content/spells/AbstractSpell";
import MovableElementNode from "./elements/MovableElementNode";

export default class SpellNode extends MovableElementNode {
  private _spellContent: AbstractSpell;

  constructor(
    spell: AbstractSpell,
    x: number,
    y: number,
    width: number,
    height: number
  ) {
    super(x, y, width, height);
    this._spellContent = spell;
  }

  public get spellContent(): AbstractSpell {
    return this._spellContent;
  }
}
