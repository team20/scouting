import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
/**
 * A button that switches between red and Team 20 green.
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
		}
		vaadin-button {
			display: block;
			height: 100%;
			margin: 0;
			line-height: 100px;
			color: #000000;
			/* color: var(--lumo-primary-text-color); */
			cursor: pointer;
		}

		.off {
			--lumo-contrast-5pct: #ff0000;
		}
		.on {
			--lumo-contrast-5pct: #019d04;
		}
	`;
	@property()
	label!: string;
	@property()
	toggled: boolean = false;

	render() {
		return html`<vaadin-button
			class=${this.calculateColor()}
			@click=${this.onClick}
			><h1 style="margin-bottom: 0;">${this.label}</h1>
			<br />
			<h3>${this.calculateLabel()}</h3></vaadin-button
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
		"toggle-button": ToggleButton;
	}
}
