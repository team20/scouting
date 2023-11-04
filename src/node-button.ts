import { css, html, LitElement } from "lit";
import { customElement, property, state } from "lit/decorators.js";
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

	static pieceOptions: ("CUBE" | "CONE" | "NONE")[] = ["CUBE", "CONE", "NONE"];
	@property()
	// @ts-ignore
	pieceType: "Cube" | "Cone" | "Hybrid";

	@property()
	state: "CUBE" | "CONE" | "NONE" = NodeButton.pieceOptions[0];

	@state()
	displayedState: "Cube" | "Cone" | "None" = "None";
	render() {
		return html`<vaadin-button
			class=${this.calculateColor()}
			@click=${this.onClick}
			>${this.displayedState}</vaadin-button
		>`;
	}

	onClick() {
		switch (this.pieceType) {
			case "Cone":
				if (this.state === "NONE") {
					this.state = "CONE";
					this.displayedState = "Cone";
				} else {
					this.state = "NONE";
					this.displayedState = "None";
				}
				break;
			case "Cube":
				if (this.state === "NONE") {
					this.state = "CUBE";
					this.displayedState = "Cube";
				} else {
					this.state = "NONE";
					this.displayedState = "None";
				}
				break;
			case "Hybrid":
				if (this.state === "NONE") {
					this.state = "CONE";
					this.displayedState = "Cone";
				} else if (this.state === "CONE") {
					this.state = "CUBE";
					this.displayedState = "Cube";
				} else {
					this.state = "NONE";
					this.displayedState = "None";
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
