import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { BreakdownButton } from "./breakdown-button.ts";

/**
 * The final scouting screen.
 *
 * Contains defense info, additional comments, charge station climbing, and a field diagram.
 * Also has a slot for QR code display and restarting the scouting session.
 */
@customElement("end-screen")
export class EndScreen extends LitElement {
	static styles = css`
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

		#left {
			width: 135%;
			height: 100%;
		}

		#right {
			width: 100%;
		}

		#container {
			display: flex;
			width: 100%;
			height: 100%;
		}
		#row1 {
			display: flex;
			align-items: center;
			justify-content: center;
			gap: 10px;
			height: 150px;
		}
		#row2 {
			display: flex;
			gap: 10px;
			height: 150px;
			align-items: center;
			justify-content: center;
		}
		#row3 {
			display: flex;
			height: 340px;
			gap: 10px;
			align-items: center;
			justify-content: center;
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
			<div id="container">
				<div id="left">
					<div id="row1">
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
					<div id="row2">
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
						></vaadin-select>

						<vaadin-select
							${ref(this.harmony)}
							theme="small"
							id="end-harmony"
							label="Harmony?"
							.items="${this.harmonyOptions}"
						></vaadin-select>
					</div>
					<div id="row3">
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
							style="width: 200px; margin-top:120px"
							label="BREAKDOWN"
						></breakdown-button>
					</div>
				</div>

				<div id="right">
					<vaadin-text-area
						style="width:100%; height: calc(100vh - 100px);"
						id="end-comments"
						${ref(this.comments)}
						label="Comments?"
					></vaadin-text-area>
				</div>
			</div>
		`;
	}

	processClimbResult() {
		// If the actual charge station was engaged, force attempted to also be engaged
		if (this.climbAttempted.value!.value === this.yesNoOptions[1].value) {
			this.climbResult.value!.value = this.yesNoOptions[1].value;
			// @ts-ignore
			this.climbResult.value!.readonly = true;
		} else {
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
		this.breakdown.value!.render();
		this.comments.value!.value = "";
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"end-screen": EndScreen;
	}
}
