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
			justify-content: center;
			flex-wrap: wrap;
			gap: 30px;
			text-align: center;
		}
		toggle-button {
			width: 600px;
			height: 175px;
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
			padding-top: 20px;
		}
		#auto-centerline-note {
			--off-color: #27313c;
			--on-color: #506070;
		}
	`;
	speakerCounter: Ref<GameCounter> = createRef();
	speakerMissCounter: Ref<GameCounter> = createRef();
	ampCounter: Ref<GameCounter> = createRef();
	ampMissCounter: Ref<GameCounter> = createRef();

	centerlineNotesCounter: Ref<GameCounter> = createRef();
	toggleLeft: Ref<ToggleButton> = createRef();

	render() {
		return html`
			<div>
				<game-counter
					${ref(this.speakerCounter)}
					id="auto-speaker-counter"
					countLabel="Auto Speaker Notes"
				></game-counter>

				<game-counter
					${ref(this.speakerMissCounter)}
					id="auto-speaker-miss-counter"
					countLabel="Auto Speaker Miss"
				></game-counter>

				<game-counter
					${ref(this.centerlineNotesCounter)}
					id="auto-centerline-notes"
					countLabel="Auto Centerline Notes"
				></game-counter>
			</div>
			<div id="right-buttons">
				<game-counter
					${ref(this.ampCounter)}
					id="auto-amp-counter"
					countLabel="Auto AMP Notes"
				></game-counter>

				<game-counter
					${ref(this.ampMissCounter)}
					id="auto-amp-miss-counter"
					countLabel="Auto AMP Miss"
				></game-counter>

				<toggle-button ${ref(this.toggleLeft)}><h1>Leave</h1></toggle-button>
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
			centerlineNotes: this.centerlineNotesCounter.value!.count,
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
		this.centerlineNotesCounter.value!.count = 0;
		this.toggleLeft.value!.toggled = false;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"auto-info": AutoInfo;
	}
}
