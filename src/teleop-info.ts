import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { GameCounter } from "./counter";
import { HalfCounter } from "./half-counter.ts";

/**
 * Contains info about the teleop period.
 */
@customElement("teleop-info")
export class TeleopInfo extends LitElement {
	static styles = css`
		:host {
			display: flex;
			align-items: center;
			justify-content: center;
			flex-wrap: wrap;
			gap: 30px;
			text-align: center;
			padding-top: 50px;
		}

		#mobility {
			height: 200px;
			padding-bottom: 25px;
			margin: 0;
		}
	`;

	speakerCounter: Ref<GameCounter> = createRef();
	ampCounter: Ref<GameCounter> = createRef();
	notesDroppedCounter: Ref<GameCounter> = createRef();
	foulCounter: Ref<HalfCounter> = createRef();
	techCounter: Ref<HalfCounter> = createRef();

	render() {
		return html`
			<game-counter
				${ref(this.speakerCounter)}
				class="counter"
				id="teleop-speaker-counter"
				countLabel="Speaker Notes"
			></game-counter>

			<game-counter
				${ref(this.ampCounter)}
				class="counter"
				id="teleop-amp-counter"
				countLabel="AMP Notes"
			></game-counter>

			<game-counter
				${ref(this.notesDroppedCounter)}
				class="counter"
				id="teleop-drop-counter"
				countLabel="Dropped Notes"
			></game-counter>
			<div style="display:flex;">
				<half-counter
					${ref(this.foulCounter)}
					class="counter"
					id="teleop-foul-counter"
					countLabel="Fouls"
				></half-counter>
				<half-counter
					style="margin-left:10px;"
					${ref(this.techCounter)}
					class="counter"
					id="teleop-tech-counter"
					countLabel="Techs"
				></half-counter>
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
			ampNum: this.ampCounter.value!.count,
			notesDroppedCounter: this.notesDroppedCounter.value!.count,
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
		this.speakerCounter.value!.count = 0;
		this.ampCounter.value!.count = 0;
		this.notesDroppedCounter.value!.count = 0;
		this.foulCounter.value!.count = 0;
		this.techCounter.value!.count = 0;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"teleop-info": TeleopInfo;
	}
}
