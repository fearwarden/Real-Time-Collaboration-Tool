import React, { useEffect, useState } from 'react'
import Main from '../../../app/Main'

function SideMenu() {

  const [agents, setAgents] = useState(Main.getInstance().agentManager.getAgents());

  return (
    <>
      <div className="menu-wrapper h-full bg-cyan-900">
        <div className="flex gap-2 flex-wrap">
          {
            agents && agents.map(agent => {
              return (
                <img key={`agent-thumb-${agent.name}`} className="cursor-pointer" onClick={Main.getInstance().actionManager.addAgentAction.doAction} data-agentname={agent.name} src={agent.image}></img>
              )
            })
          }
        </div>

      </div>
    </>
  )
}

export default SideMenu