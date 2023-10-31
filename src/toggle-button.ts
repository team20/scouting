import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
@customElement("toggle-button")
export class ToggleButton extends LitElement {
	static styles = css`
		:host {
			display: block;
			max-width: 1280px;
			text-align: center;
			margin: 0;
			width: min-content;
		}
		vaadin-button {
			user-select: none;
			line-height: 100px;
			color: #000000;
			display: block;
			height: min-content;
			cursor: pointer;
			margin: 0;
		}
		.off {
			--lumo-contrast-5pct: #ff0000;
		}
		.on {
			--lumo-contrast-5pct: #019d04;
		}
	`;
	@property()
	label: string;

	@property()
	toggled: boolean = false;

	render() {
		return html`<vaadin-button
			class=${this.calculateColor()}
			@click=${this.onClick}
			>${this.label}</vaadin-button
		>`;
	}

	onClick() {
		this.toggled = !this.toggled;
	}

	/**
	 *
	 * @returns The class name for the color
	 */
	calculateColor() {
		if (this.toggled) {
			return "on";
		}
		return "off";
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"toggle-button": ToggleButton;
	}
}
