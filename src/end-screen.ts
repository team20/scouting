import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { ToggleButton } from "./toggle-button";
import { TrapCounter } from "./trap-counter";
import { isTouchInBounds } from "./util";
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
		.row,
		#bottomRow {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			height: min-content;
		}
		#end-comments {
			width: 100%;
		}
		#end-breakdown,
		#end-climb-attempted,
		#end-climb-result,
		#end-park,
		#end-trap-attempted {
			width: 235px;
			height: 125px;
			--off-color: #27313c;
			--on-color: #506070;
		}
		#end-breakdown {
			--off-color: #019d04;
			--on-color: red;
			color: black;
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

	trapAttempted: Ref<ToggleButton> = createRef();
	trapResult: Ref<TrapCounter> = createRef();
	climbAttempted: Ref<ToggleButton> = createRef();
	climbResult: Ref<ToggleButton> = createRef();
	harmony: Ref<HTMLInputElement> = createRef();
	park: Ref<ToggleButton> = createRef();
	breakdown: Ref<ToggleButton> = createRef();
	comments: Ref<HTMLInputElement> = createRef();
	defenseFaced: Ref<HTMLInputElement> = createRef();
	defensePlayed: Ref<HTMLInputElement> = createRef();

	wasEndClimbAttemptedAlreadyClicked: boolean = false;
	wasEndClimbResultAlreadyClicked: boolean = false;
	wasParkAlreadyClicked: boolean = false;
	render() {
		return html`
			<div class="inputContainer">
				<div class="row">
					<toggle-button ${ref(this.trapAttempted)} id="end-trap-attempted"
						><span>Trap Attempted</span>
					</toggle-button>

					<trap-counter
						${ref(this.trapResult)}
						id="end-trap-count"
						countLabel="Notes Trap"
					></trap-counter>
				</div>
				<div class="row">
					<toggle-button
						${ref(this.climbAttempted)}
						id="end-climb-attempted"
						@click=${() => {
							if (this.wasEndClimbAttemptedAlreadyClicked) {
								this.wasEndClimbAttemptedAlreadyClicked = false;
								return;
							}
							this.onClimbAttemptedClick();
						}}
						@touchend=${(e: TouchEvent) => {
							if (
								isTouchInBounds(
									e,
									this.climbAttempted.value!.getBoundingClientRect()
								)
							) {
								this.wasEndClimbAttemptedAlreadyClicked = true;
								this.onClimbAttemptedClick();
							}
						}}
						>Climb Attempted</toggle-button
					>

					<toggle-button
						${ref(this.climbResult)}
						id="end-climb-result"
						@click=${() => {
							if (this.wasEndClimbResultAlreadyClicked) {
								this.wasEndClimbResultAlreadyClicked = false;
								return;
							}
							this.onClimbResultClick();
						}}
						@touchend=${(e: TouchEvent) => {
							if (
								isTouchInBounds(
									e,
									this.climbResult.value!.getBoundingClientRect()
								)
							) {
								this.wasEndClimbResultAlreadyClicked = true;
								this.onClimbResultClick();
							}
						}}
						>Climb Result
					</toggle-button>

					<vaadin-select
						${ref(this.harmony)}
						theme="small"
						id="end-harmony"
						label="Harmony?"
						.items="${this.harmonyOptions}"
						value="0"
					></vaadin-select>
				</div>
				<div id="bottomRow">
					<toggle-button
						${ref(this.park)}
						@click=${() => {
							if (this.wasParkAlreadyClicked) {
								this.wasParkAlreadyClicked = false;
								return;
							}
							this.onParkClick();
						}}
						@touchend=${(e: TouchEvent) => {
							if (
								isTouchInBounds(e, this.park.value!.getBoundingClientRect())
							) {
								this.wasParkAlreadyClicked = true;
								this.onParkClick();
							}
						}}
						id="end-park"
						>Park</toggle-button
					>

					<toggle-button
						${ref(this.breakdown)}
						@click="${this.commentHandler}"
						id="end-breakdown"
						>BREAKDOWN</toggle-button
					>
				</div>

				<div style="display:flex; justify-content: center; gap: 10px">
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
				${ref(this.comments)}
				id="end-comments"
				label="Comments?"
				@value-changed="${this.commentHandler}"
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
	 * Forces comments to be made when breakdown is marked true.
	 */
	commentHandler() {
		if (this.breakdown.value?.toggled) {
			if (this.comments.value?.value) {
				// @ts-ignore
				this.comments.value!.invalid = false;
			} else {
				// @ts-ignore
				this.comments.value!.invalid = true;
			}
		} else {
			// @ts-ignore
			this.comments.value!.invalid = false;
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
