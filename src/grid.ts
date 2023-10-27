import { LitElement, html, css, PropertyValueMap } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { live } from "lit/directives/live.js";
@customElement("game-piece-grid")
export class GamePieceGrid extends LitElement {
	static styles = css`
		:host {
			display: block;
			text-align: center;
			margin: 0;
			width: 100%;
			display: flex;
			justify-content: space-between;
			flex-direction: column;
		}
		.row {
			display: flex;
			width: 100%;
			margin-top: 15px;
			justify-content: space-between;
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
	states: string[] = [];
	render() {
		return html`<div class="row">
				<node-button pieceType="Cone"></node-button>
				<node-button pieceType="Cube"></node-button>
				<node-button pieceType="Cone"></node-button>
				<node-button pieceType="Cube"></node-button>
				<node-button pieceType="Cone"></node-button>
				<node-button pieceType="Cube"></node-button>
				<node-button pieceType="Cone"></node-button>
				<node-button pieceType="Cube"></node-button>
				<node-button pieceType="Cone"></node-button>
			</div>
			<div class="row">
				<node-button pieceType="Cone"></node-button>
				<node-button pieceType="Cube"></node-button>
				<node-button pieceType="Cone"></node-button>
				<node-button pieceType="Cube"></node-button>
				<node-button pieceType="Cone"></node-button>
				<node-button pieceType="Cube"></node-button>
				<node-button pieceType="Cone"></node-button>
				<node-button pieceType="Cube"></node-button>
				<node-button pieceType="Cone"></node-button>
			</div>
			<div class="row">
				<node-button pieceType="Hybrid"></node-button>
				<node-button pieceType="Hybrid"></node-button>
				<node-button pieceType="Hybrid"></node-button>
				<node-button pieceType="Hybrid"></node-button>
				<node-button pieceType="Hybrid"></node-button>
				<node-button pieceType="Hybrid"></node-button>
				<node-button pieceType="Hybrid"></node-button>
				<node-button pieceType="Hybrid"></node-button>
				<node-button pieceType="Hybrid"></node-button>
			</div>`;
	}
	protected updated(
		_changedProperties: PropertyValueMap<any> | Map<PropertyKey, unknown>
	): void {
		console.log(this.states);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"game-piece-grid": GamePieceGrid;
	}
}
