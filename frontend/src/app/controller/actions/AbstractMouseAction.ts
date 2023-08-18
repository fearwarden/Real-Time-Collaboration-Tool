export default abstract class AbstractMouseAction {
	constructor(htmlElementType: { new (): HTMLElement }) {
		window.addEventListener("mousemove", (e) => {
			if (!(e.target instanceof htmlElementType)) return;
			try {
				this.onMouseMove(e);
			} catch (err) {
				/* empty */
			}
		});
		window.addEventListener("mouseenter", (e) => {
			if (!(e.target instanceof htmlElementType)) return;
			try {
				this.onMouseEnter(e);
			} catch (err) {
				/* empty */
			}
		});
		window.addEventListener("mouseleave", (e) => {
			if (!(e.target instanceof htmlElementType)) return;
			try {
				this.onMouseLeave(e);
			} catch (err) {
				/* empty */
			}
		});
		window.addEventListener("mousedown", (e) => {
			if (!(e.target instanceof htmlElementType)) return;
			try {
				this.onMouseDown(e);
			} catch (err) {
				/* empty */
			}
		});
		window.addEventListener("mouseup", (e) => {
			if (!(e.target instanceof htmlElementType)) return;
			try {
				this.onMouseUp(e);
			} catch (err) {
				/* empty */
			}
		});
		window.addEventListener("wheel", (e) => {
			if (!(e.target instanceof htmlElementType)) return;
			try {
				this.onWheel(e);
			} catch (err) {
				/* empty */
			}
		});
	}

	abstract onMouseMove(e: MouseEvent): void;
	abstract onMouseEnter(e: MouseEvent): void;
	abstract onMouseLeave(e: MouseEvent): void;
	abstract onMouseDown(e: MouseEvent): void;
	abstract onMouseUp(e: MouseEvent): void;
	abstract onWheel(e: WheelEvent): void;
}
