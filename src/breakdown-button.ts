import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
/**
 * A button that switches between red and Team 20 green.
 */
@customElement("breakdown-button")
export class BreakdownButton extends LitElement {
	static styles = css`
		:host {
			display: block;
			text-align: center;
			width: min-content;
			height: 100%;
			aspect-ratio: 1 / 1;
		}
		vaadin-button {
			display: block;
			height: 60%;
			margin: 0;
			line-height: 100px;
			color: #000000;
			/* color: var(--lumo-primary-text-color); */
			cursor: pointer;
		}

		.off {
			--lumo-contrast-5pct: #019d04;
		}
		.on {
			--lumo-contrast-5pct: #ff0000;
		}
	`;
	@property()
	label!: string;
	statusLabel: string = "No";
	@property()
	toggled: boolean = false;

	render() {
		return html`<vaadin-button
			class=${this.calculateColor()}
			@click=${this.onClick}
			>${this.label}<br />${this.statusLabel}</vaadin-button
		>`;
	}

	onClick() {
		this.toggled = !this.toggled;
	}

	/**
	 * Calculates the class name for the button color when the button is clicked.
	 * @returns The class name for the color
	 */
	calculateColor() {
		this.statusLabel! = this.calculateLabel();
		if (this.toggled) {
			return "on";
		}
		return "off";
	}

	calculateLabel() {
		if (this.toggled) {
			return "Yes";
		}
		return "No";
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"breakdown-button": BreakdownButton;
	}
}
