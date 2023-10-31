import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
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
