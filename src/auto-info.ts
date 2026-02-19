import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { BigCounter } from "./big-counter";
import { GameCounter } from "./counter";
import { ToggleButton } from "./toggle-button";

/**
 * Contains information on the auto period.
 */
@customElement("auto-info")
export class AutoInfo extends LitElement {
	static styles = css`
		:host {
			display: grid;
			grid-template-columns: auto auto;
			justify-content: center;
			flex-wrap: wrap;
			gap: 30px;
			text-align: center;
		}

		toggle-button {
			width: 20em;
			height: 8em;
			margin: 0;
			padding-top: 20px;
			--off-color: red;
			--on-color: #019d04;
			color: black;
		}
		toggle-button > h1 {
			margin: 0;
		}
		game-counter {
			padding-top: 10px;
		}
		#right-buttons {
			display: grid;
			grid-template-columns: auto auto;
			justify-items: center;
			gap: 30px;
		}

		.left-buttons {
			display: grid;
			grid-template-columns: auto auto;
			justify-items: center;
			gap: 30px;
		}

		big-counter {
			padding: 1em;
		}

		.hidden {
			display: none;
		}
	`;
	fuelScoredRobotCounter: Ref<BigCounter> = createRef();
	fuelScoredHumanCounter: Ref<BigCounter> = createRef();
	foulsCounter: Ref<GameCounter> = createRef();

	climbAttemptedToggle: Ref<ToggleButton> = createRef();
	climbSuccessfulToggle: Ref<ToggleButton> = createRef();
	wonAutoToggle: Ref<ToggleButton> = createRef();
	@property({ type: Boolean }) hp = false;

	render() {
		return html`
			<div class="left-buttons">
				<big-counter
					${ref(this.fuelScoredRobotCounter)}
					id="auto-fuel-scored-robot"
					countLabel="Fuel Scored (Robot)"
				></big-counter>
				<br />
				<big-counter
					${ref(this.fuelScoredHumanCounter)}
					id="auto-fuel-scored-human"
					countLabel="Fuel Scored (Human)"
					class="${this.hp ? "" : "hidden"}"
				></big-counter>
				<br />

				<game-counter
					${ref(this.foulsCounter)}
					id="auto-fouls"
					countLabel="Fouls"
				></game-counter>
			</div>
			<div id="right-buttons">
				<toggle-button
					id="climb-attempted"
					${ref(this.climbAttemptedToggle)}
					@click="${this.onClimbAttemptedClick}"
					><h1>Climb Attempted?</h1></toggle-button
				>
				<br />
				<toggle-button
					id="climb-success"
					${ref(this.climbSuccessfulToggle)}
					@click="${this.onClimbSuccessClick}"
					><h1>Climb successful?</h1></toggle-button
				>
				<br />
				<toggle-button id="won-auto" ${ref(this.wonAutoToggle)}
					><h1>Won Auto?</h1></toggle-button
				>
			</div>
		`;
	}
	/**
	 * Combines all the data into JSON.
	 * @returns An object containing this element's data
	 */
	getInfo() {
		return {
			fuelScoredRobotCounter: this.fuelScoredRobotCounter.value!.count,
			fuelScoredHumanCounter: this.fuelScoredHumanCounter.value!.count,
			foulsCounter: this.foulsCounter.value!.count,

			climbAttemptedToggle: this.climbAttemptedToggle.value!.toggled ? 1 : 0,
			climbSuccessfulToggle: this.climbSuccessfulToggle.value!.toggled ? 1 : 0,
			wonAutoToggle: this.wonAutoToggle.value!.toggled ? 1 : 0
		};
	}

	onClimbAttemptedClick() {
		if (this.climbAttemptedToggle.value?.toggled == false) {
			this.climbSuccessfulToggle.value!.toggled = false;
		}
	}

	onClimbSuccessClick() {
		if (this.climbSuccessfulToggle.value?.toggled == true) {
			this.climbAttemptedToggle.value!.toggled = true;
		}
	}

	/**
	 * Prepares this element for a new scouting session.
	 *
	 * Resets all values to their defaults.
	 */
	reset() {
		this.fuelScoredRobotCounter.value!.count = 0;
		this.fuelScoredHumanCounter.value!.count = 0;
		this.foulsCounter.value!.count = 0;

		this.climbAttemptedToggle.value!.toggled = false;
		this.climbSuccessfulToggle.value!.toggled = false;
		this.wonAutoToggle.value!.toggled = false;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-info": AutoInfo;
	}
}
