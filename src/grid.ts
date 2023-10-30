import { css, html, LitElement, PropertyValueMap } from "lit";
import { customElement } from "lit/decorators.js";
@customElement("game-piece-grid")
export class GamePieceGrid extends LitElement {
	static styles = css`
		:host {
			margin: 0;
			width: 100%;
		}
		.row {
			display: flex;
			width: 100%;
			margin-top: 15px;
			justify-content: space-between;
		}
		.bottom {
			position: relative;
			bottom: -100;
		}
		.empty {
			position: relative;
			bottom: 0;
			right: 0;
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
	states: string[] = [];
	render() {
		return html`<div class="row">
				<node-button
					pieceType="Cone"
					row="1"
					column="1"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cube"
					row="1"
					column="2"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cone"
					row="1"
					column="3"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cube"
					row="1"
					column="4"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cone"
					row="1"
					column="5"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cube"
					row="1"
					column="6"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cone"
					row="1"
					column="7"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cube"
					row="1"
					column="8"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cone"
					row="1"
					column="9"
					@click=${this.onClick}
				></node-button>
			</div>
			<div class="row">
				<node-button
					pieceType="Cone"
					row="2"
					column="1"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cube"
					row="2"
					column="2"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cone"
					row="2"
					column="3"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cube"
					row="2"
					column="4"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cone"
					row="2"
					column="5"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cube"
					row="2"
					column="6"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cone"
					row="2"
					column="7"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cube"
					row="2"
					column="8"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Cone"
					row="2"
					column="9"
					@click=${this.onClick}
				></node-button>
			</div>
			<div class="row">
				<node-button
					pieceType="Hybrid"
					row="3"
					column="1"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Hybrid"
					row="3"
					column="2"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Hybrid"
					row="3"
					column="3"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Hybrid"
					row="3"
					column="4"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Hybrid"
					row="3"
					column="5"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Hybrid"
					row="3"
					column="6"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Hybrid"
					row="3"
					column="7"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Hybrid"
					row="3"
					column="8"
					@click=${this.onClick}
				></node-button>
				<node-button
					pieceType="Hybrid"
					row="3"
					column="9"
					@click=${this.onClick}
				></node-button>
			</div>
			<div class="bottom"><vaadin-button class="bottom"></vaadin-button></div>`;
	}
	protected updated(
		_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): void {
		console.log(this.states);
	}

	onClick(e: PointerEvent) {
		// @ts-ignore
		console.log(e.currentTarget!.state);
		// @ts-ignore
		console.log(e.currentTarget!.row);
		// @ts-ignore
		console.log(e.currentTarget!.column);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"game-piece-grid": GamePieceGrid;
	}
}
