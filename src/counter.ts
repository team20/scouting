import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
@customElement("game-counter")
export class GameCounter extends LitElement {
	static styles = css`
		:host {
			display: grid;
			grid-template-columns: min-content min-content min-content;
			grid-template-rows: 25px 25px;
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
		.countLabel {
			grid-column: 2;
			grid-row: 1;
		}
		.count {
			grid-column: 2;
			grid-row: 2;
		}
	`;
	@property()
	// @ts-ignore
	countType: string;
	@property()
	count: number = 0;
	render() {
		return html`<vaadin-button class="leftButton" @click=${this.decrement}
				>-</vaadin-button
			>
			<div class="countLabel">${this.countType}</div>
			<div class="count">${this.count}</div>
			<vaadin-button class="rightButton" @click=${this.increment}
				>+</vaadin-button
			>`;
	}

	decrement() {
		if (this.count <= 0) {
			return;
		}
		this.count--;
	}

	increment() {
		this.count++;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"game-counter": GameCounter;
	}
}
