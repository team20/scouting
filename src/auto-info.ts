import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { ChargeStationInfo } from "./charge-station-info";
import { GameCounter } from "./counter";
import { ToggleButton } from "./toggle-button";
/**
 * Contains additional info about the auto period.
 *
 * Contains dropped pieces, mobility, and charge station status.
 */
@customElement("auto-info")
export class AutoInfo extends LitElement {
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
	mobility: Ref<ToggleButton> = createRef();
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
			<toggle-button
				${ref(this.mobility)}
				label="Mobility?"
				style="grid-row: 1 / span 2; grid-column: 2"
			>
			</toggle-button>
			<charge-station-info
				${ref(this.chargeStation)}
				style="justify-self: end; grid-row: 1 / span 2; grid-column: 3"
			></charge-station-info>`;
	}
	/**
	 * Combines all the data into JSON.
	 * @returns An object containing this element's data
	 */
	getInfo() {
		return {
			cubesDropped: this.cubesDropped.value!.count,
			conesDropped: this.conesDropped.value!.count,
			mobility: this.mobility.value!.toggled,
			attemptedEndgame: this.chargeStation.value!.getAttemptedChargeStation(),
			actualEndgame: this.chargeStation.value!.getActualChargeStation(),
		};
	}
	/**
	 * Prepares this element for a new scouting session.
	 *
	 * Resets all values to their defaults.
	 */
	reset() {
		this.conesDropped.value!.count = 0;
		this.cubesDropped.value!.count = 0;
		this.mobility.value!.toggled = false;
		this.chargeStation.value!.reset();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-info": AutoInfo;
	}
}
