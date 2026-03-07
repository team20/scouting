import { css, html, LitElement } from "lit";
import { customElement, property } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { BigCounter } from "./big-counter";
import { GameCounter } from "./counter";

/**
 * Contains information on the auto period.
 */
@customElement("teleop-info")
export class TeleopInfo extends LitElement {
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
	fuelPassed: Ref<BigCounter> = createRef();
	foulsCounter: Ref<GameCounter> = createRef();
	@property({ type: Boolean }) hp = false;

	render() {
		return html`
			<div class="left-buttons">
				<big-counter
					${ref(this.fuelScoredRobotCounter)}
					id="teleop-fuel-scored-robot"
					countLabel="Fuel Scored (Robot)"
				></big-counter>
				<br />

				<big-counter
					${ref(this.fuelPassed)}
					id="fuel-passed"
					countLabel="Fuel Passed"
				></big-counter>
			</div>

			<div id="right-buttons">
				<big-counter
					${ref(this.fuelScoredHumanCounter)}
					id="teleop-fuel-scored-human"
					countLabel="Fuel Scored (Human)"
					class="${this.hp ? "" : "hidden"}"
				></big-counter>
				<br />
				<game-counter
					${ref(this.foulsCounter)}
					id="teleop-fouls"
					countLabel="Fouls"
				></game-counter>
				<br />
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
			fuelPassed: this.fuelPassed.value!.count,
			foulsCounter: this.foulsCounter.value!.count
		};
	}

	/**
	 * Prepares this element for a new scouting session.
	 *
	 * Resets all values to their defaults.
	 */
	reset() {
		this.fuelScoredRobotCounter.value!.count = 0;
		this.fuelScoredHumanCounter.value!.count = 0;
		this.fuelPassed.value!.count = 0;
		this.foulsCounter.value!.count = 0;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"teleop-info": TeleopInfo;
	}
}
