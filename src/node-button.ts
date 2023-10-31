import { LitElement, html, css } from "lit";
import { customElement, property, state } from "lit/decorators.js";
@customElement("node-button")
export class NodeButton extends LitElement {
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
		.empty {
			--lumo-contrast-5pct: #cccccc;
		}
		.cubeEmpty {
			--lumo-contrast-5pct: #b4a7d6ff;
		}
		.cubeScored {
			--lumo-contrast-5pct: #674ea7ff;
		}
		.coneEmpty {
			--lumo-contrast-5pct: #ffe599ff;
		}
		.coneScored {
			--lumo-contrast-5pct: #f1c232ff;
		}
	`;

	@property()
	column: number;

	@property()
	row: number;

	@property()
	pieceType: "Cube" | "Cone" | "Hybrid";

	@state()
	state: "Cube" | "Cone" | "None" = "None";
	render() {
		return html`<vaadin-button
			class=${this.calculateColor()}
			@click=${this.onClick}
			>${this.state}</vaadin-button
		>`;
	}

	onClick() {
		switch (this.pieceType) {
			case "Cone":
				if (this.state === "None") {
					this.state = "Cone";
				} else {
					this.state = "None";
				}
				break;
			case "Cube":
				if (this.state === "None") {
					this.state = "Cube";
				} else {
					this.state = "None";
				}
				break;
			case "Hybrid":
				if (this.state === "None") {
					this.state = "Cone";
				} else if (this.state === "Cone") {
					this.state = "Cube";
				} else {
					this.state = "None";
				}
				break;
		}
	}

	/**
	 *
	 * @returns The class name for the color
	 */
	calculateColor() {
		if (this.pieceType === "Cone") {
			if (this.state === "None") {
				return "coneEmpty";
			} else {
				return "coneScored";
			}
		} else if (this.pieceType === "Cube") {
			if (this.state === "None") {
				return "cubeEmpty";
			} else {
				return "cubeScored";
			}
		} else {
			if (this.state === "None") {
				return "empty";
			} else if (this.state === "Cone") {
				return "coneScored";
			} else {
				return "cubeScored";
			}
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"node-button": NodeButton;
	}
}
