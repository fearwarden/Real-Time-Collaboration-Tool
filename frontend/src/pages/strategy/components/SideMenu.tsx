import React from 'react'
import Main from '../../../app/Main'

function SideMenu() {
  return (
    <>
      <div className="menu-wrapper h-full bg-cyan-900">
        <button onClick={Main.getInstance().actionManager.addAgentAction.doAction} data-agentname="Brimstone">Brimstone</button>
      </div>
    </>
  )
}

export default SideMenu