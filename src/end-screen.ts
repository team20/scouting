import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { ToggleButton } from "./toggle-button";
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
		.left-buttons {
			display: grid;
			grid-template-columns: auto auto;
			justify-items: center;
			gap: 30px;
			padding-bottom: 0.5em;
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
			padding-top: 3.5em;
		}
		::part(input-field), vaadin-button {
			backdrop-filter: blur(10px);
		}
	`;

	climbOptions = [
		{ label: "None",	value: "0" },
		{ label: "L1",		value: "1" },
		{ label: "L2",		value: "2" },
		{ label: "L3",		value: "3"}
	];

	defenseOptions = [
		{ label: "None",      value: "0" },
		{ label: "Poor",      value: "1" },
		{ label: "Passable",  value: "2" },
		{ label: "Good",      value: "3" },
		{ label: "Excellent", value: "4" }
	];

	climbLevelAttempted: Ref<HTMLInputElement> = createRef();
	climbLevelResult: Ref<HTMLInputElement> = createRef();
	breakdown: Ref<ToggleButton> = createRef();
	comments: Ref<HTMLInputElement> = createRef();
	defenseFaced: Ref<HTMLInputElement> = createRef();
	defensePlayed: Ref<HTMLInputElement> = createRef();

	wasParkAlreadyClicked: boolean = false;
	render() {
		return html`
			<div class="inputContainer">
				<div class="left-buttons">
					<vaadin-select
						${ref(this.climbLevelAttempted)}
						theme="small"
						id="end-climb-attempted"
						label="Climb Level Attempted"
						@change="${this.onClimbAttemptedClick}"
						.items="${this.climbOptions}"
					></vaadin-select>
					<br>
					<vaadin-select
						${ref(this.climbLevelResult)}
						theme="small"
						id="end-climb-result"
						label="Climb Level Result"
						@change="${this.onClimbResultClick}"
						.items="${this.climbOptions}"
					></vaadin-select>
				</div>
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
			climbAttempted: this.climbLevelAttempted.value!.value || 0,
			climbResult: this.climbLevelResult.value!.value || 0,
			breakdown: this.breakdown.value!.toggled ? 1 : 0,
			defensePlayed: this.defensePlayed.value!.value || 0,
			defenseFaced: this.defenseFaced.value!.value || 0,
			comments: (this.comments.value!.value || "No comment.")
				.replaceAll("\n", " ")
				.replaceAll("\t", " ")
		};
	}

		/**
		 * Forces the climb result and climb attempted buttons to always be in a
		 * valid state.
		 */
		onClimbAttemptedClick() {
			if (this.climbLevelAttempted.value!.value < this.climbLevelResult.value!.value) {
				this.climbLevelResult.value!.value = this.climbLevelAttempted.value!.value;
			}
		}
	
		/**
		 * Forces the climb result, climb attempted, and park buttons to always be
		 * in a valid state.
		 */
		onClimbResultClick() {
			if (this.climbLevelAttempted.value!.value < this.climbLevelResult.value!.value) {
				this.climbLevelAttempted.value!.value = this.climbLevelResult.value!.value;
			}
		}

	/**
	 * Prepares this element for a new scouting session.
	 *
	 * Resets all values to their defaults.
	 */
	reset() {
		this.climbLevelAttempted.value!.value = "";
		this.climbLevelResult.value!.value = "";
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
