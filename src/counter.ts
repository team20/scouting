import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
/**
 * Counter for various game related things like fouls.
 */
@customElement("game-counter")
export class GameCounter extends LitElement {
	static styles = css`
		:host {
			display: grid;
			grid-template-columns: min-content min-content min-content;
			grid-template-rows: 25px 200px;
			width: min-content;
			text-align: center;
		}
		vaadin-button {
			min-width: 50px;
			width: 100px;
			height: 200px;
			margin: 0;
			cursor: pointer;
		}
		div {
			color: var(--lumo-primary-text-color);
			font-size: medium;
			width: 400px;
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
			padding-top: 20px;
			grid-column: 2;
			grid-row: 1;
			font-size: 40px;
		}
		.count {
			grid-column: 2;
			grid-row: 2;
			font-size: 30px;
			padding-top: 50px;
		}
	`;
	@property()
	countLabel!: string;
	@property()
	count: number = 0;

	render() {
		return html`<vaadin-button class="leftButton" @click=${this.decrement}
				>-</vaadin-button
			>
			<div class="countLabel">${this.countLabel}</div>
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
