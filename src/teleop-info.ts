import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { ChargeStationInfo } from "./charge-station-info";
import { GameCounter } from "./counter";
/**
 * Contains additional info about the teleop period.
 *
 * Contains dropped pieces, fouls, and charge station status.
 */
@customElement("teleop-info")
export class TeleopInfo extends LitElement {
	static styles = css`
		:host {
			display: grid;
			grid-template-columns: auto auto min-content;
			text-align: center;
			align-items: end;
		}
	`;

	conesDropped: Ref<GameCounter> = createRef();
	cubesDropped: Ref<GameCounter> = createRef();
	fouls: Ref<GameCounter> = createRef();
	techFouls: Ref<GameCounter> = createRef();
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
				${ref(this.fouls)}
				class="counter"
				countType="Fouls"
				style="grid-row: 1; grid-column: 2 / 3"
			></game-counter>
			<game-counter
				${ref(this.techFouls)}
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
			cubesDropped: this.cubesDropped.value!.count,
			conesDropped: this.conesDropped.value!.count,
			fouls: this.fouls.value!.count,
			techFouls: this.techFouls.value!.count,
			attemptedEndgame: this.chargeStation.value!.getAttemptedChargeStation(),
			actualEndgame: this.chargeStation.value!.getActualChargeStation(),
		};
	}
	reset() {
		this.conesDropped.value!.count = 0;
		this.cubesDropped.value!.count = 0;
		this.fouls.value!.count = 0;
		this.techFouls.value!.count = 0;
		this.chargeStation.value!.reset();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"teleop-info": TeleopInfo;
	}
}
