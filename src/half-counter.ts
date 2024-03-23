import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { isOnElement } from "./util";
/**
 * Half-width counter for various game related things like fouls.
 */
@customElement("half-counter")
export class HalfCounter extends LitElement {
	static styles = css`
		:host {
			display: grid;
			grid-template-columns: min-content min-content min-content;
			grid-template-rows: 100px min-content;
			width: min-content;
			text-align: center;
		}
		vaadin-button {
			min-width: 50px;
			width: 67px;
			height: 175px;
			margin: 0;
			cursor: pointer;
		}
		div {
			display: flex;
			justify-content: center;
			color: var(--lumo-primary-text-color);
			font-size: medium;
			width: 160px;
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
			align-items: flex-end;
			grid-column: 2;
			grid-row: 1;
			font-size: 40px;
		}
		.count {
			align-items: flex-start;
			grid-column: 2;
			grid-row: 2;
			font-size: 30px;
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
		"half-counter": HalfCounter;
	}
}
