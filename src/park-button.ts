import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
/**
 * A button that switches between red and Team 20 green.
 */
@customElement("park-button")
export class ParkButton extends LitElement {
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
			cursor: pointer;
			font-weight: bold;
			font-size: 30px;
		}

		.off {
			--lumo-contrast-5pct: #27313c;
			color: white;
		}
		.on {
			--lumo-contrast-5pct: #506070;
			color: white;
		}
	`;
	@property()
	label!: string;
	statusLabel: string = "No";
	@property()
	toggled: boolean = false;

	render() {
		return html`<vaadin-button
			style="height:100%"
			class=${this.calculateColor()}
			@click=${this.onClick}
			>${this.label}<br />${this.statusLabel}</vaadin-button
		>`;
	}

	onClick() {
		this.toggled = !this.toggled;
		const event = new CustomEvent("toggled", { detail: this.label });
		this.dispatchEvent(event);
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
		"park-button": ParkButton;
	}
}
