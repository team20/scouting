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
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			gap: 30px;
			text-align: center;
			padding-top: 20px;
		}
		toggle-button {
			width: 600px;
			height: 175px;
			padding-bottom: 15px;
			margin: 0;
		}
		#right-buttons {
			margin-top: -33px;
		}
	`;
	speakerCounter: Ref<GameCounter> = createRef();
	speakerMissCounter: Ref<GameCounter> = createRef();
	ampCounter: Ref<GameCounter> = createRef();
	ampMissCounter: Ref<GameCounter> = createRef();

	notesDroppedCounter: Ref<GameCounter> = createRef();
	toggleLeft: Ref<ToggleButton> = createRef();

	render() {
		return html`
			<div>
				<game-counter
					${ref(this.speakerCounter)}
					class="counter"
					id="auto-speaker-counter"
					countLabel="Speaker Notes"
				></game-counter>

				<game-counter
					${ref(this.speakerMissCounter)}
					class="counter"
					id="auto-speaker-miss-counter"
					countLabel="Speaker Miss"
				></game-counter>

				<game-counter
					${ref(this.notesDroppedCounter)}
					class="counter"
					id="auto-drop-counter"
					countLabel="Dropped Notes"
				></game-counter>
			</div>
			<div id="right-buttons">
				<game-counter
					${ref(this.ampCounter)}
					class="counter"
					id="auto-amp-counter"
					countLabel="AMP Notes"
				></game-counter>

				<game-counter
					${ref(this.ampMissCounter)}
					class="counter"
					id="auto-amp-miss-counter"
					countLabel="AMP Miss"
				></game-counter>

				<toggle-button ${ref(this.toggleLeft)} label="Leave"></toggle-button>
			</div>
		`;
	}
	/**
	 * Combines all the data into JSON.
	 * @returns An object containing this element's data
	 */
	getInfo() {
		return {
			speakerNum: this.speakerCounter.value!.count,
			speakerNumMiss: this.speakerMissCounter.value!.count,
			ampNum: this.ampCounter.value!.count,
			ampNumMiss: this.ampMissCounter.value!.count,
			notesDroppedCounter: this.notesDroppedCounter.value!.count,
			toggleLeft: this.toggleLeft.value!.toggled ? 1 : 0
		};
	}
	/**
	 * Prepares this element for a new scouting session.
	 *
	 * Resets all values to their defaults.
	 */
	reset() {
		this.speakerMissCounter.value!.count = 0;
		this.ampMissCounter.value!.count = 0;

		this.speakerCounter.value!.count = 0;
		this.ampCounter.value!.count = 0;
		this.notesDroppedCounter.value!.count = 0;
		this.toggleLeft.value!.toggled = false;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-info": AutoInfo;
	}
}
