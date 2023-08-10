import React from "react";
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
            <div className="">
              <img src={spell.image} className="w-1/2 h-auto"></img>
            </div>
          );
        })}
    </div>
  );
}

export default SpellModal;
