import React from "react";
import Main from "../../../app/Main";
import AbstractSpell from "../../../app/content/spells/AbstractSpell";

export interface SpellModalProps {
	spells: AbstractSpell[];
}

function SpellModal(props: SpellModalProps) {
	return (
		<div className="flex">
			{props &&
				props.spells &&
				props.spells.map((spell: AbstractSpell) => {
					return (
						<div className="" key={`div-${spell.name}`}>
							<img
								src={spell.image}
								className="w-1/2 h-auto cursor-pointer"
								key={`agent-thumb-${spell.name}`}
								onClick={Main.getInstance().actionManager.addSpellAction.doAction}
								data-spellname={spell.name}
								data-agentname={spell.agentName}></img>
						</div>
					);
				})}
		</div>
	);
}

export default SpellModal;
