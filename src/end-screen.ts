import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { toCanvas } from "qrcode";
import {
	combineData,
	getMatchInfo,
	resetSession,
	storeData,
} from "./data-store";
/**
 * The final scouting screen.
 *
 * Contains defense info, additional comments, charge station climbing, and a field diagram.
 * Also has a slot for QR code display and restarting the scouting session.
 */
@customElement("end-screen")
export class EndScreen extends LitElement {
	static styles = css`
		:host {
			display: grid;
			grid-template-columns: min-content auto auto;
			grid-column-gap: 10px;
			text-align: left;
		}
		.info {
			display: flex;
			width: 400px;
			flex-direction: column;
			text-align: left;
			margin: 0;
		}
		.diagramDiv {
			display: flex;
			flex-direction: column;
			text-align: left;
			margin: 0;
			width: min-content;
		}
		vaadin-select,
		vaadin-checkbox,
		vaadin-integer-field,
		vaadin-text-field {
			padding-top: 0;
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

		#left {
			width: 60%;
		}

		#right {
			width: 40%;
	background-color: red;
		}
	`;

	defenseQualityOptions = [
		{ label: "None", value: "None" },
		{ label: "Attempted", value: "Attempted" },
		{ label: "Good", value: "Good" },
		{ label: "Excellent", value: "Excellent" },
	];
	defenseQuantityOptions = [
		{ label: "None", value: "None" },
		{ label: "Opportunistic", value: "Opportunistic" },
		{ label: "Dedicated", value: "Dedicated" },
	];
	chargeStationSides = [
		{ label: "1", value: "1" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" },
	];
	defenseQualityPlayed: Ref<HTMLInputElement> = createRef();
	defenseQuantityPlayed: Ref<HTMLInputElement> = createRef();
	defenseQualityFaced: Ref<HTMLInputElement> = createRef();
	defenseQuantityFaced: Ref<HTMLInputElement> = createRef();
	breakdown: Ref<HTMLInputElement> = createRef();
	chargeStationClimbTime: Ref<HTMLInputElement> = createRef();
	chargeStationSide: Ref<HTMLInputElement> = createRef();
	comments: Ref<HTMLInputElement> = createRef();
	sessionRestart: Ref<HTMLButtonElement> = createRef();
	continueScouting: Ref<HTMLInputElement> = createRef();
	canvas: Ref<HTMLCanvasElement> = createRef();

	render() {
		return html`
		<div id="left">
		left
		</div>

		<div id="right">
		right
		</div>
		`;
	}
	/**
	 * Combines all the data into JSON.
	 * @returns An object containing this element's data
	 */
	getInfo() {
		return {
			defenseQualityPlayed: this.defenseQualityPlayed.value!.value,
			defenseQuantityPlayed: this.defenseQuantityPlayed.value!.value,
			defenseQualityFaced: this.defenseQualityFaced.value!.value,
			defenseQuantityFaced: this.defenseQuantityFaced.value!.value,
			breakdown: this.breakdown.value!.checked,
			chargeStationClimbTime: this.chargeStationClimbTime.value!.value,
			chargeStationSide: this.chargeStationSide.value!.value,
			comments: this.comments.value!.value,
		};
	}
	/**
	 * Prepares this element for a new scouting session.
	 *
	 * Resets all values to their defaults.
	 */
	reset() {
		this.defenseQualityPlayed.value!.value = "";
		this.defenseQuantityPlayed.value!.value = "";
		this.defenseQualityFaced.value!.value = "";
		this.defenseQuantityFaced.value!.value = "";
		this.breakdown.value!.checked = false;
		this.chargeStationClimbTime.value!.value = "";
		this.chargeStationSide.value!.value = "";
		this.comments.value!.value = "";
	}
	restartSession() {
		resetSession(this.continueScouting.value!.checked);
		this.sessionRestart.value!.disabled = true;
	}
	renderQRCode() {
		let data = combineData();
		console.log(data);
		toCanvas(
			this.canvas.value,
			data,
			{ errorCorrectionLevel: "low" },
			function (error) {
				if (error) console.error(error);
				console.log("success!");
			}
		);
		let matchInfo = getMatchInfo();
		let key = `${matchInfo.alliance}${matchInfo.startingPosition}${
			matchInfo.matchType
		}${matchInfo.isReplay ? "replay" : ""}ScoutingData${matchInfo.matchNum}`;
		storeData(data, key);
		let file = new Blob([data], { type: "text/plain" });
		let link = document.createElement("a");
		link.download = `${key}.txt`;
		link.href = URL.createObjectURL(file);
		link.click();
		this.sessionRestart.value!.disabled = false;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"end-screen": EndScreen;
	}
}
