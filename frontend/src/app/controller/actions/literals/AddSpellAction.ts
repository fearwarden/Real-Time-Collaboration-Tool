import Main from "../../../Main";
import AddSpellCommand from "../../../commands/literals/AddSpellCommand";
import SpellView from "../../../view/SpellView";
import IAction from "../IAction";

export default class AddSpellAction implements IAction {
	doAction(event: React.MouseEvent<HTMLImageElement, MouseEvent>): void {
		if (event.target instanceof HTMLImageElement) {
			const agentName = event.target.dataset.agentname;
			const spellName = event.target.dataset.spellname;
			if (!spellName || !agentName) return;
			const spellView = new SpellView(agentName, spellName);
			Main.getInstance().commandManager.addCommand(new AddSpellCommand(spellView));
		}
	}
}
