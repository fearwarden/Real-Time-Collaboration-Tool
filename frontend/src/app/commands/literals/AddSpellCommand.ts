import Main from "../../Main";
import SpellView from "../../view/SpellView";
import ICommand from "../ICommand";

export default class AddSpellCommand implements ICommand {
  private readonly spell: SpellView;

  constructor(spell: SpellView) {
    this.spell = spell;
  }

  doCommand(): void {
    this.spell.spellNode.addSubscriber(Main.getInstance().canvas!);
    Main.getInstance().canvas?.elementList.unshift(this.spell);
    Main.getInstance().canvas?.redrawCanvas();
  }
  undoCommand(): void {
    Main.getInstance().canvas?.elementList[
      Main.getInstance().canvas!.elementList.indexOf(this.spell)
    ].elementNode.removeSubscriber(Main.getInstance().canvas!);
    Main.getInstance().canvas?.elementList.splice(
      Main.getInstance().canvas!.elementList.indexOf(this.spell),
      1,
    );
    Main.getInstance().canvas?.redrawCanvas();
  }
}
