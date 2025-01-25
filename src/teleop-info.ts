import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { GameCounter } from "./counter";
import { HalfCounter } from "./half-counter";

/**
 * Contains info about the teleop period.
 */
@customElement("teleop-info")
export class TeleopInfo extends LitElement {
	static styles = css`
		:host {
			display: flex;
			justify-content: center;
			flex-wrap: wrap;
			gap: 30px;
			text-align: center;
		}
		game-counter {
			padding-top: 20px;
		}
		#right-buttons {
			display: grid;
			grid-template-columns: auto auto;
			align-items: center;
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
	foulCounter: Ref<GameCounter> = createRef();

	render() {
		return html`
			<div>
				<game-counter
					${ref(this.coralFourCounter)}
					id="teleop-coral-four"
					countLabel="Teleop Coral L4"
				></game-counter>
				<game-counter
					${ref(this.coralThreeCounter)}
					id="teleop-coral-three"
					countLabel="Teleop Coral L3"
				></game-counter>
				<game-counter
					${ref(this.coralTwoCounter)}
					id="teleop-coral-two"
					countLabel="Teleop Coral L2"
				></game-counter>
				<game-counter
					${ref(this.coralOneCounter)}
					id="teleop-coral-one"
					countLabel="Teleop Coral L1"
				></game-counter>
			</div>
			<div id="right-buttons">
				<game-counter
					${ref(this.foulCounter)}
					id="teleop-algae-net"
					countLabel="Teleop Fouls"
				></game-counter>
				<game-counter
					${ref(this.algaeNetCounter)}
					id="teleop-algae-net"
					countLabel="Teleop Algae Net"
				></game-counter>
				<game-counter
					${ref(this.algaeMissedCounter)}
					id="teleop-algae-missed"
					countLabel="Teleop Algae Missed"
				></game-counter>
				<game-counter
					${ref(this.algaeRemovedCounter)}
					id="teleop-algae-removed"
					countLabel="Teleop Algae Removed"
				></game-counter>
				<game-counter
					${ref(this.coralMissedCounter)}
					id="teleop-coral-missed"
					countLabel="Teleop Coral Missed"
				></game-counter>
				<game-counter
					${ref(this.algaeProcessorCounter)}
					id="teleop-algae-processor"
					countLabel="Teleop Algae Processor"
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
			foulNum: this.foulCounter.value!.count
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
		this.foulCounter.value!.count = 0;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"teleop-info": TeleopInfo;
	}
}
