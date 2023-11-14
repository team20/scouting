import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
/**
 * The main scouting screen.
 *
 * Contains basic info about the match and the scouter.
 */
@customElement("match-info")
export class MatchInfo extends LitElement {
	static styles = css`
		:host {
			display: flex;
			justify-content: space-between;
		}
		label {
			display: flex;
			justify-content: right;
			align-items: center;
			color: var(--lumo-secondary-text-color);
			font-family: var(--lumo-font-family);
			font-size: var(--lumo-font-size-s);
			font-weight: 500;
		}
		theme-button {
			width: 80px;
			height: 80px;
		}
	`;
	name: Ref<HTMLInputElement> = createRef();
	matchType: Ref<HTMLInputElement> = createRef();
	matchNum: Ref<HTMLInputElement> = createRef();
	isReplay: Ref<HTMLInputElement> = createRef();
	alliance: Ref<HTMLInputElement> = createRef();
	startingPosition: Ref<HTMLInputElement> = createRef();
	teamNum: Ref<HTMLInputElement> = createRef();
	preload: Ref<HTMLInputElement> = createRef();
	matchTypes = [
		{ label: "Practice", value: "Practice" },
		{ label: "Qualifications", value: "Qualification" },
		{ label: "Playoffs", value: "PLAYOFFS" },
	];
	alliances = [
		{ label: "Blue", value: "Blue" },
		{ label: "Red", value: "Red" },
	];
	startingPositions = [
		{ label: "1", value: "1" },
		{ label: "2", value: "2" },
		{ label: "3", value: "3" },
	];
	preloadOptions = [
		{ label: "None", value: "None" },
		{ label: "Cube", value: "Cube" },
		{ label: "Cone", value: "Cone" },
	];

	render() {
		return html`<div>
				<label
					>Name:&nbsp
					<vaadin-text-field
						${ref(this.name)}
						theme="small"
					></vaadin-text-field>
				</label>
				<label>
					Match Type:&nbsp
					<vaadin-select
						${ref(this.matchType)}
						theme="small"
						.items="${this.matchTypes}"
					></vaadin-select>
				</label>
				<label>
					Match Number:&nbsp
					<vaadin-integer-field
						${ref(this.matchNum)}
						theme="small"
					></vaadin-integer-field>
				</label>
				<label>
					Replay?
					<vaadin-checkbox ${ref(this.isReplay)}></vaadin-checkbox>
				</label>
				<label>
					Alliance:&nbsp
					<vaadin-select
						${ref(this.alliance)}
						theme="small"
						.items="${this.alliances}"
					></vaadin-select>
				</label>
				<label>
					Starting Position:&nbsp
					<vaadin-select
						${ref(this.startingPosition)}
						theme="small"
						.items="${this.startingPositions}"
					></vaadin-select>
				</label>
				<label>
					Team Number:&nbsp
					<vaadin-integer-field
						${ref(this.teamNum)}
						theme="small"
					></vaadin-integer-field>
				</label>
				<label>
					Preload:&nbsp
					<vaadin-select
						${ref(this.preload)}
						theme="small"
						.items="${this.preloadOptions}"
					></vaadin-select>
				</label>
				<label>Revision ${__version__}</label>
				<theme-button></theme-button>
			</div>
			<img src="./favicon.png" /> `;
	}
	/**
	 * Combines all the data into JSON.
	 * @returns An object containing this element's data
	 */
	getInfo() {
		return {
			name: this.name.value!.value,
			matchType: this.matchType.value!.value,
			matchNum: this.matchNum.value!.value,
			isReplay: this.isReplay.value!.checked,
			alliance: this.alliance.value!.value,
			startingPosition: this.startingPosition.value!.value,
			teamNum: this.teamNum.value!.value,
			preload: this.preload.value!.value,
		};
	}
	/**
	 * Prepares this element for a new scouting session.
	 * @param isSameScouter Whether or not the same scouter will be scouting the next session
	 */
	reset(isSameScouter: boolean) {
		// If it's the same scouter, keep their name
		if (isSameScouter) {
		} else {
			// Otherwise, reset the name field
			this.name.value!.value = "";
		}
		// Increment the match number
		if (this.matchNum.value!.value) {
			this.matchNum.value!.value = (
				Number.parseInt(this.matchNum.value!.value) + 1
			).toString();
		}
		// Reset everything else
		this.isReplay.value!.checked = false;
		this.teamNum.value!.value = "";
		this.preload.value!.value = "";
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"match-info": MatchInfo;
	}
}
