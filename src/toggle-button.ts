import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
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
			user-select: none;
			line-height: 100px;
			color: #000000;
			height: 100%;
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
	// @ts-ignore
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
