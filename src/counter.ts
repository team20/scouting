import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { isOnElement } from "./util";
/**
 * Counter for various game related things like fouls.
 */
@customElement("game-counter")
export class GameCounter extends LitElement {
	static styles = css`
		:host {
			display: grid;
			grid-template-columns: min-content min-content min-content;
			grid-template-rows: 4em min-content;
			width: min-content;
			text-align: center;
		}
		vaadin-button {
			min-width: 1em;
			width: 1.5em;
			height: 2.5em;
			margin: 0;
			cursor: pointer;
		}
		div {
			display: flex;
			justify-content: center;
			color: var(--lumo-primary-text-color);
			font-size: medium;
			width: 7em;
		}
		.leftButton {
			font-size: 3em;
			color: black;
			background: salmon;
			grid-column: 1;
			grid-row: 1 / span 2;
		}
		.rightButton {
			font-size: 3em;
			color: black;
			background: lightgreen;
			grid-column: 3;
			grid-row: 1 / span 2;
		}
		.countLabel {
			align-items: flex-end;
			grid-column: 2;
			grid-row: 1;
			font-size: 1em;
		}
		.count {
			align-items: flex-start;
			grid-column: 2;
			grid-row: 2;
			font-size: 1em;
		}
	`;
	@property()
	countLabel!: string;
	@property()
	count: number = 0;
	wasLeftAlreadyClicked: boolean = false;
	wasRightAlreadyClicked: boolean = false;
	render() {
		return html`<vaadin-button
				class="leftButton"
				@click=${() => {
					if (this.wasLeftAlreadyClicked) {
						this.wasLeftAlreadyClicked = false;
						return;
					}
					this.decrement();
				}}
				@touchend=${(e: TouchEvent) => {
					if (isOnElement(e)) {
						this.wasLeftAlreadyClicked = true;
						this.decrement();
					}
				}}
				>-</vaadin-button
			>
			<div class="countLabel">${this.countLabel}</div>
			<div class="count">${this.count}</div>
			<vaadin-button
				class="rightButton"
				@click=${() => {
					if (this.wasRightAlreadyClicked) {
						this.wasRightAlreadyClicked = false;
						return;
					}
					this.increment();
				}}
				@touchend=${(e: TouchEvent) => {
					if (isOnElement(e)) {
						this.wasRightAlreadyClicked = true;
						this.increment();
					}
				}}
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
