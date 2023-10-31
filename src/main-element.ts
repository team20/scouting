import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, Ref } from "lit/directives/ref.js";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("match-info")
export class MatchInfo extends LitElement {
	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
			align-items: flex-start;
		}
		label {
			display: flex;
			justify-content: right;
			color: var(--lumo-secondary-text-color);
			font-family: var(--lumo-font-family);
			font-size: var(--lumo-font-size-m);
			font-weight: 500;
			line-height: 2;
		}
	`;
	// @ts-ignore
	ref: Ref<HTMLInputElement> = createRef();
	preloadOptions = [
		{ label: "None", value: "None" },
		{ label: "Cube", value: "Cube" },
		{ label: "Cone", value: "Cone" },
	];
	matchTypes = [
		{ label: "Practice", value: "Practice" },
		{ label: "Qualification", value: "Qualification" },
		{ label: "Playoffs", value: "Playoffs" },
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

	render() {
		return html`<div>
			<label
				>Name:
				<vaadin-text-field theme="small"></vaadin-text-field>
			</label>
			<label>
				Match Type:
				<vaadin-select
					theme="small"
					.items="${this.matchTypes}"
				></vaadin-select>
			</label>
			<label>
				Match Number:
				<vaadin-integer-field theme="small"></vaadin-integer-field>
			</label>
			<label>
				Replay?
				<vaadin-checkbox></vaadin-checkbox>
			</label>
			<label>
				Alliance:
				<vaadin-select theme="small" .items="${this.alliances}"></vaadin-select>
			</label>
			<label>
				Starting Position:
				<vaadin-select
					theme="small"
					.items="${this.startingPositions}"
				></vaadin-select>
			</label>
			<label>
				Team Number:
				<vaadin-integer-field theme="small"></vaadin-integer-field>
			</label>
			<label>
				Preload:
				<vaadin-select
					theme="small"
					.items="${this.preloadOptions}"
				></vaadin-select>
			</label>
		</div>`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"match-info": MatchInfo;
	}
}
