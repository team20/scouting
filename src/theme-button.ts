import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
/**
 * A button that switches the app between dark mode and light mode.
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
			min-width: 1px;
			margin: 0;
			line-height: 100px;
			color: #000000;
			cursor: pointer;
		}
		vaadin-icon {
			color: var(--lumo-primary-text-color);
		}
	`;

	@property()
	toggled: boolean = true;

	render() {
		return html`<vaadin-button @click=${this.onClick}>
			<vaadin-icon icon="vaadin:adjust"></vaadin-icon>
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
}

declare global {
	interface HTMLElementTagNameMap {
		"theme-button": ThemeButton;
	}
}
