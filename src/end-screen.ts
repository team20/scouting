import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { toCanvas } from "qrcode";
import { combineData, getMatchInfo, resetSession } from "./data-store";
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
			grid-template-columns: 400px auto auto;
			grid-column-gap: 10px;
			text-align: left;
		}
		.info {
			display: flex;
			flex-direction: column;
			text-align: left;
			margin: 0;
			width: 400px;
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
			width: 500px;
			aspect-ratio: 1056 / 562;
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
	continueScouting: Ref<HTMLInputElement> = createRef();
	canvas: Ref<HTMLCanvasElement> = createRef();
	render() {
		return html` <div class="info" style="grid-column: 1">
				<vaadin-select
					${ref(this.defenseQualityPlayed)}
					theme="small"
					label="Quality of Defense Played"
					.items="${this.defenseQualityOptions}"
				></vaadin-select>
				<vaadin-select
					${ref(this.defenseQuantityPlayed)}
					theme="small"
					label="Quantity of Defense Played"
					.items="${this.defenseQuantityOptions}"
				></vaadin-select>
				<vaadin-select
					${ref(this.defenseQualityFaced)}
					theme="small"
					label="Quality of Defense Faced"
					.items="${this.defenseQualityOptions}"
				></vaadin-select>
				<vaadin-select
					${ref(this.defenseQuantityFaced)}
					theme="small"
					label="Quantity of Defense Faced"
					.items="${this.defenseQuantityOptions}"
				></vaadin-select>
				<label>
					Breakdown?<vaadin-checkbox ${ref(this.breakdown)}></vaadin-checkbox
				></label>
				<vaadin-text-field
					${ref(this.comments)}
					label="Comments?"
				></vaadin-text-field>
			</div>
			<div class="diagramDiv" style="grid-column: 2">
				<vaadin-integer-field
					${ref(this.chargeStationClimbTime)}
					theme="small"
					label="Charge Station climb time"
				></vaadin-integer-field>
				<vaadin-select
					${ref(this.chargeStationSide)}
					theme="small"
					label="Charge Station Side"
					.items="${this.chargeStationSides}"
				></vaadin-select>
				<img src="./field_diagram.png" class="diagram" />
				<vaadin-button @click=${this.renderQRCode}
					>Display QR Code</vaadin-button
				>
				<vaadin-button @click=${this.restartSession}
					>Restart Session</vaadin-button
				>
				<label>
					Continue Scouting?<vaadin-checkbox
						${ref(this.continueScouting)}
						checked
					></vaadin-checkbox
				></label>
			</div>
			<canvas ${ref(this.canvas)} style="grid-column: 3	"></canvas>`;
	}

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
		let file = new Blob([data], { type: "text/plain" });
		let link = document.createElement("a");
		let matchInfo = getMatchInfo();
		link.download = `${matchInfo.alliance}${matchInfo.startingPosition}${
			matchInfo.matchType
		}${matchInfo.isReplay ? "replay" : ""}ScoutingData${
			matchInfo.matchNum
		}.txt`;
		link.href = URL.createObjectURL(file);
		link.click();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"end-screen": EndScreen;
	}
}
