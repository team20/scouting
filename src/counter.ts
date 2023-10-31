import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
@customElement("piece-counter")
export class PieceCounter extends LitElement {
	static styles = css`
		:host {
			display: grid;
			grid-template-columns: min-content min-content min-content;
			grid-template-rows: auto auto;
			width: min-content;
			text-align: center;
			margin: 0;
		}
		vaadin-button {
			user-select: none;
			cursor: pointer;
			margin: 0;
			min-width: 50px;
			width: 50px;
			height: 50px;
			--lumo-contrast-5pct: #ffffff;
		}
		div {
			font-size: medium;
			color: #000000;
			height: 25px;
			width: 120px;
		}
		.leftButton {
			grid-column: 1;
			grid-row: 1 / span 2;
		}
		.rightButton {
			grid-column: 3;
			grid-row: 1 / span 2;
		}
		.pieceLabel {
			grid-column: 2;
			grid-row: 1;
		}
		.droppedCount {
			grid-column: 2;
			grid-row: 2;
			width: 120px;
		}
	`;
	@property()
	pieceType: "Cube" | "Cone";
	@property()
	value: number = 0;
	render() {
		return html`<vaadin-button class="leftButton" @click=${this.decrement}
				>-</vaadin-button
			>
			<div class="pieceLabel">${this.pieceType} Dropped</div>
			<div class="droppedCount">${this.value}</div>
			<vaadin-button class="rightButton" @click=${this.increment}
				>+</vaadin-button
			>`;
	}

	decrement() {
		if (this.value <= 0) {
			return;
		}
		this.value--;
	}

	increment() {
		this.value++;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"piece-counter": PieceCounter;
	}
}
