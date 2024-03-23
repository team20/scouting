import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { isTouchInBounds } from "./util";
/**
 * A button that can be toggled on or off.
 */
@customElement("toggle-button")
export class ToggleButton extends LitElement {
	static styles = css`
		:host {
			display: block;
			text-align: center;
			width: min-content;
			height: 100%;
			aspect-ratio: 1 / 1;
			color: white;
		}
		vaadin-button {
			display: block;
			height: 100%;
			margin: 0;
			line-height: 100px;
			color: inherit;
			cursor: pointer;
			font-weight: bold;
			font-size: 23px;
		}
		.off {
			--lumo-contrast-5pct: var(--off-color);
		}
		.on {
			--lumo-contrast-5pct: var(--on-color);
		}
	`;
	@property()
	label!: string;
	@property()
	toggled: boolean = false;
	wasAlreadyClicked: boolean = false;
	render() {
		return html`<vaadin-button
			class=${this.calculateColor()}
			@click=${() => {
				if (this.wasAlreadyClicked) {
					this.wasAlreadyClicked = false;
					return;
				}
				this.toggle();
			}}
			@touchend=${(e: TouchEvent) => {
				if (isTouchInBounds(e, this.getBoundingClientRect())) {
					this.wasAlreadyClicked = true;
					this.toggle();
				}
			}}
			><slot></slot> <br />${this.calculateLabel()}</vaadin-button
		>`;
	}

	/**
	 * Inverts the toggle state.
	 */
	toggle() {
		this.toggled = !this.toggled;
	}

	/**
	 * Calculates the class name for the button color when the button is clicked.
	 * @returns The class name for the color
	 */
	calculateColor() {
		if (this.toggled) {
			return "on";
		}
		return "off";
	}

	/**
	 * Calculate the status label when the button is clicked.
	 * @returns The button status label.
	 */
	calculateLabel() {
		if (this.toggled) {
			return "Yes";
		}
		return "No";
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"toggle-button": ToggleButton;
	}
}
