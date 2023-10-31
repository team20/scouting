import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
@customElement("charge-station-info")
export class ChargeStationInfo extends LitElement {
	static styles = css`
		:host {
			display: block;
			text-align: center;
			margin: 0;
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
	attemptedEngage = [
		{ label: "None", value: "None" },
		{ label: "Engaged", value: "Engaged" },
	];
	/** What the team's actual endgame was.*/
	actualEndgame = [
		{ label: "None", value: "None" },
		{ label: "Park", value: "Park" },
		{ label: "Dock", value: "Dock" },
		{ label: "Engage", value: "Engage" },
	];
	attempted: Ref<HTMLInputElement> = createRef();
	actual: Ref<HTMLInputElement> = createRef();
	render() {
		return html` <vaadin-select
				${ref(this.attempted)}
				label="Attempted"
				.items="${this.attemptedEngage}"
				.value="${this.attemptedEngage[0].value}"
			></vaadin-select>
			<vaadin-select
				${ref(this.actual)}
				label="Actual"
				.items="${this.actualEndgame}"
				.value="${this.actualEndgame[0].value}"
			></vaadin-select>`;
	}

	getAttemptedEndgame() {
		return this.attempted.value!.value;
	}
	getActualEndgame() {
		return this.actual.value!.value;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"charge-station-info": ChargeStationInfo;
	}
}