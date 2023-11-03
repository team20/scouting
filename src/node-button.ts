import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
/**
 * A button that represents a node on the field.
 */
@customElement("node-button")
export class NodeButton extends LitElement {
	static styles = css`
		:host {
			display: block;
			text-align: center;
			width: min-content;
		}
		vaadin-button {
			display: block;
			user-select: none;
			line-height: 100px;
			color: #000000;
			height: 85px;
			width: 85px;
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
	// @ts-ignore
	column: number;

	@property()
	// @ts-ignore
	row: number;

	@property()
	// @ts-ignore
	pieceType: "Cube" | "Cone" | "Hybrid";

	@property()
	state: "CUBE" | "CONE" | "NONE" = "NONE";
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
				if (this.state === "NONE") {
					this.state = "CONE";
				} else {
					this.state = "NONE";
				}
				break;
			case "Cube":
				if (this.state === "NONE") {
					this.state = "CUBE";
				} else {
					this.state = "NONE";
				}
				break;
			case "Hybrid":
				if (this.state === "NONE") {
					this.state = "CONE";
				} else if (this.state === "CONE") {
					this.state = "CUBE";
				} else {
					this.state = "NONE";
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
			if (this.state === "NONE") {
				return "coneEmpty";
			} else {
				return "coneScored";
			}
		} else if (this.pieceType === "Cube") {
			if (this.state === "NONE") {
				return "cubeEmpty";
			} else {
				return "cubeScored";
			}
		} else {
			if (this.state === "NONE") {
				return "empty";
			} else if (this.state === "CONE") {
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
