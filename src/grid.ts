import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { NodeButton } from "./node-button";
/**
 * The node grid.
 *
 * Contains a button for each game piece node, mirroring the 9 x 3 grid on the field.
 */
@customElement("game-piece-grid")
export class GamePieceGrid extends LitElement {
	static styles = css`
		:host {
			width: 100%;
		}
		div {
			margin-top: 5px;
		}
		.row {
			display: flex;
			width: 100%;
			justify-content: space-between;
		}
	`;
	highNodes: Ref<NodeButton>[] = [];
	midNodes: Ref<NodeButton>[] = [];
	lowNodes: Ref<NodeButton>[] = [];

	render() {
		// Generate the HTML for the top row
		let highButtons = [];
		for (let i = 0; i < 9; i++) {
			this.highNodes[i] = createRef();
			if (i % 3 == 0) {
				highButtons.push(html`<node-button
					${ref(this.highNodes[i])}
					pieceType="Cone"
				></node-button>`);
			} else if (i % 3 == 1) {
				highButtons.push(html`<node-button
					${ref(this.highNodes[i])}
					pieceType="Cube"
				></node-button>`);
			} else {
				highButtons.push(html`<node-button
					${ref(this.highNodes[i])}
					pieceType="Cone"
				></node-button>`);
			}
		}

		// Generate the HTML for the middle row
		let midButtons = [];
		for (let i = 0; i < 9; i++) {
			this.midNodes[i] = createRef();
			if (i % 3 == 0) {
				midButtons.push(html`<node-button
					${ref(this.midNodes[i])}
					pieceType="Cone"
				></node-button>`);
			} else if (i % 3 == 1) {
				midButtons.push(html`<node-button
					${ref(this.midNodes[i])}
					pieceType="Cube"
				></node-button>`);
			} else {
				midButtons.push(html`<node-button
					${ref(this.midNodes[i])}
					pieceType="Cone"
				></node-button>`);
			}
		}

		// Generate the HTML for the bottom row
		let lowButtons = [];
		for (let i = 0; i < 9; i++) {
			this.lowNodes[i] = createRef();
			lowButtons.push(html`<node-button
				${ref(this.lowNodes[i])}
				pieceType="Hybrid"
			></node-button>`);
		}
		return html`
			<div class="row">${highButtons}</div>
			<div class="row">${midButtons}</div>
			<div class="row">${lowButtons}</div>
		`;
	}
	/**
	 * Combines all the data into JSON.
	 * @returns An object containing this element's data
	 */
	getScoringInfo() {
		let highPieces = [];
		let midPieces = [];
		let lowPieces = [];
		for (const node of this.highNodes) {
			highPieces.push(node.value!.state);
		}
		for (const node of this.midNodes) {
			midPieces.push(node.value!.state);
		}
		for (const node of this.lowNodes) {
			lowPieces.push(node.value!.state);
		}
		return {
			high: highPieces,
			middle: midPieces,
			low: lowPieces,
		};
	}
	/**
	 * Prepares this element for a new scouting session.
	 *
	 * Resets all values to their defaults.
	 */
	reset() {
		for (const node of this.highNodes) {
			node.value!.state = "NONE";
		}
		for (const node of this.midNodes) {
			node.value!.state = "NONE";
		}
		for (const node of this.lowNodes) {
			node.value!.state = "NONE";
		}
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"game-piece-grid": GamePieceGrid;
	}
}
