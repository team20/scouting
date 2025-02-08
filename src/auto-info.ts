import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
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
	`;
	coralFourCounter: Ref<GameCounter> = createRef();
	coralThreeCounter: Ref<GameCounter> = createRef();
	coralTwoCounter: Ref<GameCounter> = createRef();
	coralOneCounter: Ref<GameCounter> = createRef();
	algaeNetCounter: Ref<GameCounter> = createRef();
	algaeMissedCounter: Ref<GameCounter> = createRef();
	algaeRemovedCounter: Ref<GameCounter> = createRef();
	coralMissedCounter: Ref<GameCounter> = createRef();
	algaeProcessorCounter: Ref<GameCounter> = createRef();
	toggleLeft: Ref<ToggleButton> = createRef();

	render() {
		return html`
			<div>
				<game-counter
					${ref(this.coralFourCounter)}
					id="auto-coral-four"
					countLabel="Auto Coral L4"
				></game-counter>
				<game-counter
					${ref(this.coralThreeCounter)}
					id="auto-coral-three"
					countLabel="Auto Coral L3"
				></game-counter>
				<game-counter
					${ref(this.coralTwoCounter)}
					id="auto-coral-two"
					countLabel="Auto Coral L2"
				></game-counter>
				<game-counter
					${ref(this.coralOneCounter)}
					id="auto-coral-one"
					countLabel="Auto Coral L1"
				></game-counter>
			</div>
			<div id="right-buttons">
				<toggle-button ${ref(this.toggleLeft)}><h1>Leave</h1></toggle-button>
				<game-counter
					${ref(this.algaeNetCounter)}
					id="auto-algae-net"
					countLabel="Auto Algae Net"
				></game-counter>
				<game-counter
					${ref(this.algaeMissedCounter)}
					id="auto-algae-missed"
					countLabel="Auto Algae Missed"
				></game-counter>
				<game-counter
					${ref(this.algaeRemovedCounter)}
					id="auto-algae-removed"
					countLabel="Auto Algae Removed"
				></game-counter>
				<game-counter
					${ref(this.coralMissedCounter)}
					id="auto-coral-missed"
					countLabel="Auto Coral Missed"
				></game-counter>
				<game-counter
					${ref(this.algaeProcessorCounter)}
					id="auto-algae-processor"
					countLabel="Auto Algae Processor"
				></game-counter>
			</div>
		`;
	}
	/**
	 * Combines all the data into JSON.
	 * @returns An object containing this element's data
	 */
	getInfo() {
		return {
			coralFourNum: this.coralFourCounter.value!.count,
			coralThreeNum: this.coralThreeCounter.value!.count,
			coralTwoNum: this.coralTwoCounter.value!.count,
			coralOneNum: this.coralOneCounter.value!.count,
			algaeNetNum: this.algaeNetCounter.value!.count,
			algaeMissedNum: this.algaeMissedCounter.value!.count,
			algaeRemovedNum: this.algaeRemovedCounter.value!.count,
			coralMissedNum: this.coralMissedCounter.value!.count,
			algaeProcessorNum: this.algaeProcessorCounter.value!.count,
			toggleLeft: this.toggleLeft.value!.toggled ? 1 : 0
		};
	}
	/**
	 * Prepares this element for a new scouting session.
	 *
	 * Resets all values to their defaults.
	 */
	reset() {
		this.coralFourCounter.value!.count = 0;
		this.coralThreeCounter.value!.count = 0;
		this.coralTwoCounter.value!.count = 0;
		this.coralOneCounter.value!.count = 0;
		this.algaeNetCounter.value!.count = 0;
		this.algaeMissedCounter.value!.count = 0;
		this.algaeRemovedCounter.value!.count = 0;
		this.coralMissedCounter.value!.count = 0;
		this.algaeProcessorCounter.value!.count = 0;
		this.toggleLeft.value!.toggled = false;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-info": AutoInfo;
	}
}
