import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { ChargeStationInfo } from "./charge-station-info";
import { GameCounter } from "./counter";
@customElement("teleop-info")
export class TeleopInfo extends LitElement {
	static styles = css`
		:host {
			display: grid;
			grid-template-columns: auto auto min-content;
			text-align: center;
			margin: 0;
			align-items: end;
		}
	`;

	conesDropped: Ref<GameCounter> = createRef();
	cubesDropped: Ref<GameCounter> = createRef();
	mobility: Ref<HTMLInputElement> = createRef();
	chargeStation: Ref<ChargeStationInfo> = createRef();
	render() {
		return html` <game-counter
				${ref(this.conesDropped)}
				class="counter"
				countType="Cones Dropped"
				style="grid-row: 1; grid-column: 1 / span 2"
			></game-counter>
			<game-counter
				${ref(this.cubesDropped)}
				class="counter"
				countType="Cubes Dropped"
				style="grid-row: 2; grid-column: 1 / span 2"
			></game-counter>
			<game-counter
				${ref(this.conesDropped)}
				class="counter"
				countType="Fouls"
				style="grid-row: 1; grid-column: 2 / 3"
			></game-counter>
			<game-counter
				${ref(this.cubesDropped)}
				class="counter"
				countType="Tech Fouls"
				style="grid-row: 2; grid-column: 2 / 3"
			></game-counter>
			<charge-station-info
				${ref(this.chargeStation)}
				style="justify-self: end; grid-row: 1 / span 2; grid-column: 3"
			></charge-station-info>`;
	}
	getInfo() {
		return {
			cubesDropped: this.cubesDropped.value?.count,
			conesDropped: this.conesDropped.value?.count,
			mobility: this.mobility.value?.value,
			attemptedEndgame: this.chargeStation.value?.getAttemptedEndgame(),
			actualEndgame: this.chargeStation.value?.getActualEndgame(),
		};
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"teleop-info": TeleopInfo;
	}
}
