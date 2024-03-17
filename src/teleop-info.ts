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

		game-counter,
		half-counter {
			padding-top: 20px;
		}
	`;

	speakerCounter: Ref<GameCounter> = createRef();
	speakerMissCounter: Ref<GameCounter> = createRef();
	ampCounter: Ref<GameCounter> = createRef();
	ampMissCounter: Ref<GameCounter> = createRef();
	notesPassedCounter: Ref<GameCounter> = createRef();
	foulCounter: Ref<HalfCounter> = createRef();
	techCounter: Ref<HalfCounter> = createRef();

	render() {
		return html`
			<div>
				<game-counter
					${ref(this.speakerCounter)}
					id="teleop-speaker-counter"
					countLabel="Teleop Speaker Notes"
				></game-counter>

				<game-counter
					${ref(this.speakerMissCounter)}
					id="teleop-speaker-miss-counter"
					countLabel="Teleop Speaker Miss"
				></game-counter>

				<game-counter
					${ref(this.notesPassedCounter)}
					id="teleop-pass-counter"
					countLabel="Teleop Passed Notes"
				></game-counter>
			</div>
			<div>
				<game-counter
					${ref(this.ampCounter)}
					id="teleop-amp-counter"
					countLabel="Teleop AMP Notes"
				></game-counter>

				<game-counter
					${ref(this.ampMissCounter)}
					id="teleop-amp-miss-counter"
					countLabel="Teleop AMP Miss"
				></game-counter>

				<div style="display:flex;">
					<half-counter
						${ref(this.foulCounter)}
						id="teleop-foul-counter"
						countLabel="Fouls"
					></half-counter>
					<half-counter
						style="margin-left:10px;"
						${ref(this.techCounter)}
						id="teleop-tech-counter"
						countLabel="Techs"
					></half-counter>
				</div>
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
			notesPassedCounter: this.notesPassedCounter.value!.count,
			foulCounter: this.foulCounter.value!.count,
			techCounter: this.techCounter.value!.count
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
		this.notesPassedCounter.value!.count = 0;
		this.foulCounter.value!.count = 0;
		this.techCounter.value!.count = 0;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"teleop-info": TeleopInfo;
	}
}
