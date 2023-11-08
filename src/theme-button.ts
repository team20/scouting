import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
/**
 * A button that switches between red and Team 20 green.
 */
@customElement("theme-button")
export class ThemeButton extends LitElement {
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
			cursor: pointer;
		}
	`;

	@property()
	toggled: boolean = false;

	render() {
		return html`<vaadin-button @click=${this.onClick}>
			<vaadin-icon icon="vaadin:sun-o"></vaadin-icon>
		</vaadin-button>`;
	}

	onClick() {
		this.toggled = !this.toggled;
		if (this.toggled) {
			document.querySelector("html")!.className = "dark";
		} else {
			document.querySelector("html")!.className = "light";
		}
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
		"theme-button": ThemeButton;
	}
}
