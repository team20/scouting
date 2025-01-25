import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { ToggleButton } from "./toggle-button";
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
			min-width: 50vw;
			display: grid;
			justify-items: center;
			grid-template-columns: auto auto;
			gap: 10px;
		}
	`;

	cageOptions = [
		{ label: "None",    value: "0" },
		{ label: "Shallow", value: "1" },
		{ label: "Deep",    value: "2" },
	];

	defenseOptions = [
		{ label: "None",      value: "0" },
		{ label: "Poor",      value: "1" },
		{ label: "Passable",  value: "2" },
		{ label: "Good",      value: "3" },
		{ label: "Excellent", value: "4" }
	];

	cageAttempted: Ref<HTMLInputElement> = createRef();
	cageResult: Ref<HTMLInputElement> = createRef();
	park: Ref<ToggleButton> = createRef();
	breakdown: Ref<ToggleButton> = createRef();
	comments: Ref<HTMLInputElement> = createRef();
	defenseFaced: Ref<HTMLInputElement> = createRef();
	defensePlayed: Ref<HTMLInputElement> = createRef();

	wasParkAlreadyClicked: boolean = false;
	render() {
		return html`
			<div class="inputContainer">
				<vaadin-select
					${ref(this.cageAttempted)}
					theme="small"
					id="end-cage-attempted"
					label="Cage Climb Attempted"
					.items="${this.cageOptions}"
				></vaadin-select>
				<toggle-button
					${ref(this.park)}
					id="end-park"
					>Park</toggle-button
				>
				<vaadin-select
					${ref(this.cageResult)}
					theme="small"
					id="end-cage-result"
					label="Cage Climb Result"
					.items="${this.cageOptions}"
				></vaadin-select>
				<toggle-button
					${ref(this.breakdown)}
					@click="${this.commentHandler}"
					id="end-breakdown"
					>BREAKDOWN</toggle-button
				>
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
			cageAttempted: this.cageAttempted.value!.value || 0,
			cageResult: this.cageResult.value!.value || 0,
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
		this.cageAttempted.value!.value = "";
		this.cageResult.value!.value = "";
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
