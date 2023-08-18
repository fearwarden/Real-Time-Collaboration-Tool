import React, { useEffect, useState, useRef } from "react";
import Main from "../../../app/Main";
import SpellModal from "./SpellModal";
import AbstractSpell from "../../../app/content/spells/AbstractSpell";
import Pencil from "../../../assets/img/elements/pencil.svg";
import Eraser from "../../../assets/img/elements/eraser.svg";
import Palette from "../../../assets/img/elements/palette.svg";
import { Color, SketchPicker } from "react-color";

function SideMenu() {
  const [agents, setAgents] = useState(
    Main.getInstance().agentManager.getAgents(),
  );
  const [showModal, setShowModal] = useState(false);
  const [currentSpell, setCurrentSpell] = useState<AbstractSpell[] | null>(
    null,
  );
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);
  const [color, setColor] = useState<Color>({
    r: 241,
    g: 112,
    b: 19,
    a: 1,
  });
  const [penThinckness, setPenThickness] = useState<number>(3);
  const undoButtonRef = useRef(null);
  const redoButtonRef = useRef(null);

  useEffect(() => {
    Main.getInstance().sideMenuView = {
      undo: undoButtonRef.current!,
      redo: redoButtonRef.current!,
    };
    Main.getInstance().sideMenuView.disableUndoButton();
    Main.getInstance().sideMenuView.disableRedoButton();
  }, []);

  let hideTimeout: ReturnType<typeof setTimeout>;

  const onColorChange = (color: any) => {
    setColor({ ...color.rgb });
    const rgb = color.rgb;
    Main.getInstance().drawingStateManager.penState.color = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a})`;
  };

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

  function handleThicknessChange(e: React.ChangeEvent<HTMLInputElement>): void {
    const newThickness = parseInt(e.target.value);
    setPenThickness(newThickness);
    Main.getInstance().drawingStateManager.penState.thickness = newThickness;
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
        <div>
          <button
            className="p-2 cursor-pointer"
            ref={undoButtonRef}
            onClick={Main.getInstance().actionManager.undoAction.doAction}
          >
            disabled
          </button>
          <button
            className="p-2 cursor-pointer"
            ref={redoButtonRef}
            onClick={Main.getInstance().actionManager.redoAction.doAction}
          >
            disabled
          </button>
        </div>
        <div className="flex">
          <img
            className="cursor-pointer"
            onClick={
              Main.getInstance().actionManager.startPenStateAction.doAction
            }
            src={Pencil}
          ></img>
          <img
            className="cursor-pointer"
            onClick={
              Main.getInstance().actionManager.startEraserStateAction.doAction
            }
            src={Eraser}
          ></img>
          <img
            className="cursor-pointer"
            onClick={() => {
              setShowColorPicker(!showColorPicker);
            }}
            src={Palette}
          ></img>
          <div>
            <p className="text-center">Thickness</p>
            <span className="mr-1">1</span>
            <input
              type="range"
              min="1"
              max="10"
              step="1"
              value={penThinckness}
              onChange={handleThicknessChange}
            ></input>
            <span className="ml-1">10</span>
          </div>
        </div>
        <div className="absolute">
          {showColorPicker && (
            <>
              <div
                style={{
                  position: "fixed",
                  top: "0px",
                  right: "0px",
                  bottom: "0px",
                  left: "0px",
                }}
                onClick={() => {
                  setShowColorPicker(false);
                }}
              />
              <SketchPicker
                color={color}
                onChange={onColorChange}
              ></SketchPicker>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default SideMenu;
