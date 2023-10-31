import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { toCanvas } from "qrcode";
import { combineData } from "./data-store";

@customElement("end-screen")
export class EndScreen extends LitElement {
	static styles = css`
		:host {
			display: grid;
			grid-template-columns: 400px auto auto;
			grid-column-gap: 10px;
			text-align: left;
			margin: 0;
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
		vaadin-text-area {
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
	defenseQuality: Ref<HTMLInputElement> = createRef();
	defenseQuantity: Ref<HTMLInputElement> = createRef();
	breakdown: Ref<HTMLInputElement> = createRef();
	chargeStationClimbTime: Ref<HTMLInputElement> = createRef();
	chargeStationSide: Ref<HTMLInputElement> = createRef();
	canvas: Ref<HTMLCanvasElement> = createRef();
	render() {
		return html` <div class="info" style="grid-column: 1">
				<vaadin-text-area label="Comments?"></vaadin-text-area>
				<vaadin-select
					${ref(this.defenseQuality)}
					label="Quality of Defense"
					.items="${this.defenseQualityOptions}"
				></vaadin-select>
				<vaadin-select
					${ref(this.defenseQuantity)}
					label="Quantity of Defense"
					.items="${this.defenseQuantityOptions}"
				></vaadin-select>
				<label>
					Breakdown?<vaadin-checkbox ${ref(this.breakdown)}></vaadin-checkbox
				></label>
				<vaadin-integer-field
					${ref(this.chargeStationClimbTime)}
					label="Charge Station climb time"
				></vaadin-integer-field>
				<vaadin-select
					${ref(this.chargeStationSide)}
					label="Charge Station Side"
					.items="${this.chargeStationSides}"
				></vaadin-select>
			</div>
			<div class="diagramDiv" style="grid-column: 2">
				<img src="./field_diagram.png" class="diagram" />
				<vaadin-button @click=${this.renderQRCode}
					>Display QR Code</vaadin-button
				>
			</div>
			<canvas ${ref(this.canvas)} style="grid-column: 3	"></canvas>`;
	}

	getInfo() {
		return {
			defenseQuality: this.defenseQuality.value!.value,
			defenseQuantity: this.defenseQuantity.value!.value,
			breakdown: this.breakdown.value!.checked,
			chargeStationClimbTime: this.chargeStationClimbTime.value!.value,
			chargeStationSide: this.chargeStationSide.value!.value,
		};
	}
	renderQRCode() {
		combineData();
		toCanvas(
			this.canvas.value,
			"jfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjndjfiewgjiuwgnwiungierngirwngienrgiwnignwirng ihjnd",
			function (error) {
				if (error) console.error(error);
				console.log("success!");
			}
		);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"end-screen": EndScreen;
	}
}
