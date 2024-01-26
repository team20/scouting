import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { BreakdownButton } from "./breakdown-button.ts";

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
		.diagram {
			width: 400px;
			aspect-ratio: 1056 / 562;
		}
		.row {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			height: 150px;
		}
		#bottomRow {
			display: flex;
			height: fit-content;
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
			margin-bottom: 0;
			margin-top: 45px;
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

	trapAttempted: Ref<HTMLInputElement> = createRef();
	trapResult: Ref<HTMLInputElement> = createRef();
	climbAttempted: Ref<HTMLInputElement> = createRef();
	climbResult: Ref<HTMLInputElement> = createRef();
	harmony: Ref<HTMLInputElement> = createRef();
	park: Ref<HTMLInputElement> = createRef();
	breakdown: Ref<BreakdownButton> = createRef();
	comments: Ref<HTMLInputElement> = createRef();

	render() {
		return html`
			<div>
				<div class="row">
					<vaadin-select
						${ref(this.trapAttempted)}
						theme="small"
						id="end-trap-attempted"
						label="Trap Attempted?"
						.items="${this.yesNoOptions}"
					></vaadin-select>

					<vaadin-select
						${ref(this.trapResult)}
						theme="small"
						id="end-trap-result"
						label="Traps Result"
						.items="${this.trapResultOptions}"
					></vaadin-select>
				</div>
				<div class="row">
					<vaadin-select
						${ref(this.climbAttempted)}
						id="end-climb-attempted"
						theme="small"
						label="Climb Attempted?"
						.items="${this.yesNoOptions}"
						@change=${this.processClimbResult}
					></vaadin-select>

					<vaadin-select
						${ref(this.climbResult)}
						theme="small"
						id="end-climb-success"
						label="Climb Success"
						.items="${this.yesNoOptions}"
						@change=${this.processClimbResult}
					></vaadin-select>

					<vaadin-select
						${ref(this.harmony)}
						theme="small"
						id="end-harmony"
						label="Harmony?"
						.items="${this.harmonyOptions}"
					></vaadin-select>
				</div>
				<div id="bottomRow">
					<vaadin-select
						${ref(this.park)}
						theme="small"
						id="end-park"
						label="Park"
						.items="${this.yesNoOptions}"
					></vaadin-select>

					<breakdown-button
						${ref(this.breakdown)}
						id="end-breakdown"
						label="BREAKDOWN"
					></breakdown-button>
				</div>
			</div>

			<vaadin-text-area
				id="end-comments"
				${ref(this.comments)}
				label="Comments?"
			></vaadin-text-area>
		`;
	}

	processClimbResult() {
		// If the team didn't attempt a climb, force actual to be no
		if (this.climbAttempted.value!.value === this.yesNoOptions[1].value) {
			this.climbResult.value!.value = this.yesNoOptions[1].value;
			// @ts-ignore
			this.climbResult.value!.readonly = true;
			// If the team successfully climbed, lock attempted to yes
		} else if (this.climbResult.value!.value === this.yesNoOptions[0].value) {
			this.climbAttempted.value!.value = this.yesNoOptions[0].value;
			// @ts-ignore
			this.climbAttempted.value!.readonly = true;
		} else {
			// @ts-ignore
			this.climbAttempted.value!.readonly = false;
			// @ts-ignore
			this.climbResult.value!.readonly = false;
		}
	}

	/**
	 * Combines all the data into JSON.
	 * @returns An object containing this element's data
	 */
	getInfo() {
		return {
			trapAttempted: this.trapAttempted.value!.value === "Yes" ? 1 : 0,
			trapResult: this.trapResult.value!.value || 0,
			climbAttempted: this.climbAttempted.value!.value === "Yes" ? 1 : 0,
			climbResult: this.climbResult.value!.value === "Yes" ? 1 : 0,
			harmony: this.harmony.value!.value,
			park: this.park.value!.value === "Yes" ? 1 : 0,
			breakdown: this.breakdown.value!.toggled ? 1 : 0,
			comments: this.comments.value!.value || "No comment."
		};
	}

	/**
	 * Prepares this element for a new scouting session.
	 *
	 * Resets all values to their defaults.
	 */
	reset() {
		this.trapAttempted.value!.value = "";
		this.trapResult.value!.value = "";
		this.climbAttempted.value!.value = "";
		this.climbResult.value!.value = "";
		this.harmony.value!.value = "";
		this.park.value!.value = "";
		this.breakdown.value!.toggled = false;
		this.comments.value!.value = "";
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"end-screen": EndScreen;
	}
}
