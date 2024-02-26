import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { BreakdownButton } from "./breakdown-button";
import { HalfToggleButton } from "./half-toggle-button";
import { TrapCounter } from "./trap-counter";

/**
 * Contains information relating to the end of the match.
 */
@customElement("end-screen")
export class EndScreen extends LitElement {
	static styles = css`
		:host {
			display: flex;
			gap: 20px;
			width: 100%;
			height: 100%;
		}
		label {
			color: var(--lumo-secondary-text-color);
			font-family: var(--lumo-font-family);
			font-size: var(--lumo-font-size-m);
			font-weight: 500;
			line-height: 2;
		}
		.row {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			height: min-content;
		}
		#bottomRow {
			display: flex;
			height: min-content;
			gap: 10px;
			align-items: center;
			justify-content: center;
		}
		#end-comments {
			width: 100%;
		}
		#end-breakdown {
			width: 200px;
			height: 150px;
		}
		#end-park {
			width: 200px;
			height: 150px;
		}

		#end-climb-attempted {
			width: 235px;
			height: 125px;
		}

		#end-climb-result {
			width: 235px;
			height: 125px;
		}

		#end-trap-attempted {
			width: 235px;
			height: 125px;
		}
		.inputContainer {
			display: flex;
			flex-direction: column;
			gap: 10px;
		}
	`;

	yesNoOptions = [
		{ label: "Yes", value: "Yes" },
		{ label: "No", value: "No" }
	];

	trapResultOptions = [
		{ label: "0", value: "0" },
		{ label: "1", value: "1" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" }
	];

	harmonyOptions = [
		{ label: "0", value: "0" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" }
	];

	defenseOptions = [
		{ label: "None", value: "0" },
		{ label: "Poor", value: "1" },
		{ label: "Passable", value: "2" },
		{ label: "Good", value: "3" },
		{ label: "Excellent", value: "4" }
	];

	trapAttempted: Ref<HalfToggleButton> = createRef();
	trapResult: Ref<TrapCounter> = createRef();
	climbAttempted: Ref<HalfToggleButton> = createRef();
	climbResult: Ref<HalfToggleButton> = createRef();
	harmony: Ref<HTMLInputElement> = createRef();
	park: Ref<HalfToggleButton> = createRef();
	breakdown: Ref<BreakdownButton> = createRef();
	comments: Ref<HTMLInputElement> = createRef();

	defenseFaced: Ref<HTMLInputElement> = createRef();
	defensePlayed: Ref<HTMLInputElement> = createRef();

	render() {
		return html`
			<div class="inputContainer">
				<div class="row">
					<half-toggle-button
						${ref(this.trapAttempted)}
						id="end-trap-attempted"
						label="Trap Attempted"
					></half-toggle-button>

					<trap-counter
						${ref(this.trapResult)}
						class="counter"
						id="end-trap-count"
						countLabel="Notes Trap"
					></trap-counter>
				</div>
				<div class="row">
					<half-toggle-button
						${ref(this.climbAttempted)}
						id="end-climb-attempted"
						label="Climb Attempted"
						@click="${this.onClimbAttemptedClick}"
					></half-toggle-button>

					<half-toggle-button
						${ref(this.climbResult)}
						id="end-climb-result"
						label="Climb Result"
						@click="${this.onClimbResultClick}"
					></half-toggle-button>

					<vaadin-select
						${ref(this.harmony)}
						theme="small"
						id="end-harmony"
						label="Harmony?"
						.items="${this.harmonyOptions}"
					></vaadin-select>
				</div>
				<div id="bottomRow">
					<half-toggle-button
						${ref(this.park)}
						@click="${this.onParkClick}"
						id="end-park"
						label="Park"
					></half-toggle-button>

					<breakdown-button
						${ref(this.breakdown)}
						id="end-breakdown"
						label="BREAKDOWN"
					></breakdown-button>
				</div>

				<div style="display:flex; justify-content: center; gap: 30px">
					<vaadin-select
						${ref(this.defenseFaced)}
						theme="small"
						id="end-defence-faced"
						label="Defense Faced"
						.items="${this.defenseOptions}"
					></vaadin-select>

					<vaadin-select
						${ref(this.defensePlayed)}
						theme="small"
						id="end-defence-played"
						label="Defense Played"
						.items="${this.defenseOptions}"
					></vaadin-select>
				</div>
			</div>

			<vaadin-text-area
				id="end-comments"
				${ref(this.comments)}
				label="Comments?"
			></vaadin-text-area>
		`;
	}

	/**
	 * Forces the climb result and climb attempted buttons to always be in a
	 * valid state.
	 */
	onClimbAttemptedClick() {
		if (!this.climbAttempted.value?.toggled) {
			this.climbResult.value!.toggled = false;
		}
	}

	/**
	 * Forces the climb result, climb attempted, and park buttons to always be
	 * in a valid state.
	 */
	onClimbResultClick() {
		if (this.climbResult.value?.toggled) {
			this.climbAttempted.value!.toggled = true;
			this.park.value!.toggled = false;
		}
	}

	/**
	 * Forces the climb result, and park buttons to always be
	 * in a valid state.
	 */
	onParkClick() {
		// Park was toggled
		if (this.park.value?.toggled) {
			this.climbResult.value!.toggled = false;
		}
	}

	/**
	 * Combines all the data into JSON.
	 * @returns An object containing this element's data
	 */
	getInfo() {
		return {
			trapAttempted: this.trapAttempted.value!.toggled ? 1 : 0,
			trapResult: this.trapResult.value!.count,
			climbAttempted: this.climbAttempted.value!.toggled ? 1 : 0,
			climbResult: this.climbResult.value!.toggled ? 1 : 0,
			harmony: this.harmony.value!.value || 0,
			park: this.park.value!.toggled ? 1 : 0,
			breakdown: this.breakdown.value!.toggled ? 1 : 0,
			defensePlayed: this.defensePlayed.value!.value || 0,
			defenseFaced: this.defenseFaced.value!.value || 0,
			comments: (this.comments.value!.value || "No comment.")
				.replaceAll("\n", " ")
				.replaceAll("\t", " ")
		};
	}

	/**
	 * Prepares this element for a new scouting session.
	 *
	 * Resets all values to their defaults.
	 */
	reset() {
		this.trapAttempted.value!.toggled = false;
		this.trapResult.value!.count = 0;
		this.climbAttempted.value!.toggled = false;
		this.climbResult.value!.toggled = false;
		this.harmony.value!.value = "";
		this.park.value!.toggled = false;
		this.breakdown.value!.toggled = false;
		this.comments.value!.value = "";
		this.defenseFaced.value!.value = "";
		this.defensePlayed.value!.value = "";
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"end-screen": EndScreen;
	}
}
