import Main from "../../Main";
import AbstractSpell from "../spells/AbstractSpell";
import SpellFactory from "../spells/SpellFactory";

export default abstract class AbstractAgent {
	private _name: string;
	private _image: string;
	private _spells: AbstractSpell[];

	constructor(name: string, image: string) {
		this._name = name;
		this._image = image;
		this._spells = SpellFactory.getSpellsForAgent(this.name);
	}

	public get name(): string {
		return this._name;
	}

	public get image(): string {
		return this._image;
	}

	public get spells(): AbstractSpell[] {
		return this._spells;
	}
}
