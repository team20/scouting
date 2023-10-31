import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
@customElement("other-info")
export class OtherInfo extends LitElement {
	static styles = css`
		:host {
			display: grid;
			grid-template-columns: auto auto min-content;
			text-align: center;
			margin: 0;
			align-items: end;
		}
		label {
			justify-self: right;
			color: var(--lumo-secondary-text-color);
			font-family: var(--lumo-font-family);
			font-size: var(--lumo-font-size-m);
			font-weight: 500;
			line-height: 2;
		}
	`;
	render() {
		return html` <piece-counter
				class="counter"
				pieceType="Cone"
				style="grid-row: 1; grid-column: 1 / span 2"
			></piece-counter>
			<piece-counter
				class="counter"
				pieceType="Cube"
				style="grid-row: 2; grid-column: 1 / span 2"
			></piece-counter>
			<label style="grid-row: 1; grid-column: 2;">
				Mobility?
				<vaadin-checkbox></vaadin-checkbox>
			</label>
			<charge-station-info
				style="justify-self: end; grid-row: 1 / span 2; grid-column: 3"
			></charge-station-info>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"other-info": OtherInfo;
	}
}
