import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
@customElement("charge-station-info")
export class ChargeStationInfo extends LitElement {
	static styles = css`
		:host {
			display: block;
			text-align: center;
			width: min-content;
		}
		vaadin-select {
			padding-top: 0;
		}
		.checkbox {
			color: var(--lumo-secondary-text-color);
			font-family: var(--lumo-font-family);
			font-size: var(--lumo-font-size-m);
			font-weight: 500;
			line-height: 2;
		}
	`;

	/** Whether or not the team attempted to engage the charge station.*/
	attemptedOptions = [
		{ label: "None", value: "NONE" },
		{ label: "Engage", value: "ENGAGE" },
	];
	/** What the team's actual charge station status was.*/
	actualOptions = [
		{ label: "None", value: "NONE" },
		{ label: "Parked", value: "PARKED" },
		{ label: "Docked", value: "DOCKED" },
		{ label: "Engaged", value: "ENGAGED" },
	];
	@property()
	attemptedChargeStation = "None";
	attempted: Ref<HTMLInputElement> = createRef();
	actual: Ref<HTMLInputElement> = createRef();
	render() {
		return html` <vaadin-select
				${ref(this.attempted)}
				label="Attempted"
				.items="${this.attemptedOptions}"
				.value="${this.attemptedOptions[0].value}"
			></vaadin-select>
			<vaadin-select
				${ref(this.actual)}
				label="Actual"
				.items="${this.actualOptions}"
				.value="${this.actualOptions[0].value}"
				@change=${this.processActualChargeStationSelection}
			></vaadin-select>`;
	}
	processActualChargeStationSelection() {
		if (this.actual.value!.value === this.actualOptions[3].value) {
			this.attemptedChargeStation = this.attemptedOptions[1].value;
			// @ts-ignore
			this.attempted.value!.readonly = true;
		} else {
			// @ts-ignore
			this.attempted.value!.readonly = false;
		}
		// @ts-ignore
		console.log(this.attempted.value!.readonly);
	}
	getAttemptedChargeStation() {
		return this.attempted.value!.value;
	}
	getActualChargeStation() {
		return this.actual.value!.value;
	}
	reset() {
		this.attempted.value!.value = this.attemptedOptions[0].value;
		this.actual.value!.value = this.actualOptions[0].value;
		// @ts-ignore
		this.attempted.value!.readonly = false;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"charge-station-info": ChargeStationInfo;
	}
}
