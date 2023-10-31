import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { NodeButton } from "./node-button";
@customElement("game-piece-grid")
export class GamePieceGrid extends LitElement {
	static styles = css`
		:host {
			margin: 0;
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
		let highButtons = [];
		for (let i = 0; i < 9; i++) {
			this.highNodes[i] = createRef();
			if (i % 2 == 0) {
				highButtons.push(html`<node-button
					${ref(this.highNodes[i])}
					pieceType="Cone"
					row="1"
					column="${i + 1}"
					@click=${this.onClick}
				></node-button>`);
			} else {
				highButtons.push(html`<node-button
					${ref(this.highNodes[i])}
					pieceType="Cube"
					row="1"
					column="${i + 1}"
					@click=${this.onClick}
				></node-button>`);
			}
		}

		let midButtons = [];
		for (let i = 0; i < 9; i++) {
			this.midNodes[i] = createRef();
			if (i % 2 == 0) {
				midButtons.push(html`<node-button
					${ref(this.midNodes[i])}
					pieceType="Cone"
					row="1"
					column="${i + 1}"
					@click=${this.onClick}
				></node-button>`);
			} else {
				midButtons.push(html`<node-button
					${ref(this.midNodes[i])}
					pieceType="Cube"
					row="1"
					column="${i + 1}"
					@click=${this.onClick}
				></node-button>`);
			}
		}

		let lowButtons = [];
		for (let i = 0; i < 9; i++) {
			this.lowNodes[i] = createRef();
			lowButtons.push(html`<node-button
				${ref(this.lowNodes[i])}
				pieceType="Hybrid"
				row="3"
				column="${i + 1}"
				@click=${this.onClick}
			></node-button>`);
		}
		return html`
			<div class="row">${highButtons}</div>
			<div class="row">${midButtons}</div>
			<div class="row">${lowButtons}</div>
		`;
	}

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
}

declare global {
	interface HTMLElementTagNameMap {
		"game-piece-grid": GamePieceGrid;
	}
}
