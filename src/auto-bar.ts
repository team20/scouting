import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { ChargeStationInfo } from "./charge-station-info";
import { PieceCounter } from "./counter";
@customElement("auto-info")
export class AutoInfo extends LitElement {
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

	conesDropped: Ref<PieceCounter> = createRef();
	cubesDropped: Ref<PieceCounter> = createRef();
	mobility: Ref<HTMLInputElement> = createRef();
	chargeStation: Ref<ChargeStationInfo> = createRef();
	render() {
		return html` <piece-counter
				${ref(this.conesDropped)}
				class="counter"
				pieceType="Cone"
				style="grid-row: 1; grid-column: 1 / span 2"
			></piece-counter>
			<piece-counter
				${ref(this.cubesDropped)}
				class="counter"
				pieceType="Cube"
				style="grid-row: 2; grid-column: 1 / span 2"
			></piece-counter>
			<label style="grid-row: 1; grid-column: 2;">
				Mobility?
				<vaadin-checkbox ${ref(this.mobility)}></vaadin-checkbox>
			</label>
			<charge-station-info
				${ref(this.chargeStation)}
				style="justify-self: end; grid-row: 1 / span 2; grid-column: 3"
			></charge-station-info>`;
	}
	getInfo() {
		return {
			cubesDropped: this.cubesDropped.value?.value,
			conesDropped: this.conesDropped.value?.value,
			mobility: this.mobility.value?.value,
			attemptedEndgame: this.chargeStation.value?.getAttemptedEndgame(),
			actualEndgame: this.chargeStation.value?.getActualEndgame(),
		};
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-info": AutoInfo;
	}
}
