import React, { useEffect, useState } from "react";
import Main from "../../../app/Main";
import SpellModal from "./SpellModal";
import AbstractSpell from "../../../app/content/spells/AbstractSpell";

function SideMenu() {
  const [agents, setAgents] = useState(
    Main.getInstance().agentManager.getAgents()
  );
  const [showModal, setShowModal] = useState(false);
  const [currentSpell, setCurrentSpell] = useState<AbstractSpell[] | null>(
    null
  );

  let hideTimeout: ReturnType<typeof setTimeout>;

  function handleMouseOver(spells: AbstractSpell[]) {
    if (hideTimeout) clearTimeout(hideTimeout);
    setShowModal(true);
    setCurrentSpell(spells);
  }

  function handleMouseOverModal() {
    if (hideTimeout) clearTimeout(hideTimeout);
    setShowModal(true);
  }

  function handleMouseOut() {
    hideTimeout = setTimeout(() => {
      setShowModal(false);
    }, 100);
  }

  return (
    <>
      <div className="menu-wrapper h-full bg-cyan-900">
        <div className="flex gap-2 flex-wrap">
          {agents &&
            agents.map((agent) => {
              return (
                <div
                  key={`agent-container-${agent.name}`}
                  onMouseOver={() => handleMouseOver(agent.spells)}
                  onMouseOut={handleMouseOut}
                >
                  <img
                    key={`agent-thumb-${agent.name}`}
                    className="cursor-pointer"
                    onClick={
                      Main.getInstance().actionManager.addAgentAction.doAction
                    }
                    data-agentname={agent.name}
                    src={agent.image}
                  ></img>
                </div>
              );
            })}
          {showModal && currentSpell && (
            <div onMouseOver={handleMouseOverModal} onMouseOut={handleMouseOut}>
              <SpellModal spells={currentSpell} />
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default SideMenu;
