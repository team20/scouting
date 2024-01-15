import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { GameCounter } from "./counter";
import { HalfCounter } from "./half-counter.ts";

/**
 * Contains additional info about the teleop period.
 *
 * Contains dropped pieces, fouls, and charge station status.
 */
@customElement("teleop-info")
export class TeleopInfo extends LitElement {
	static styles = css`
		#button-container {
			display: flex;
			align-items: center;
			justify-content: center;
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
			<div id="button-container">
				<div style="padding-right: 30px;">
					<game-counter
						${ref(this.speakerCounter)}
						class="counter"
						countLabel="Speaker Notes"
					></game-counter>

					<game-counter
						${ref(this.ampCounter)}
						class="counter"
						countLabel="AMP Notes"
					></game-counter>
				</div>

				<div>
					<game-counter
						${ref(this.notesDroppedCounter)}
						class="counter"
						countLabel="Dropped Notes"
					></game-counter>
					<div style="display:flex;">
						<half-counter
							${ref(this.foulCounter)}
							class="counter"
							countLabel="Fouls"
						></half-counter>
						<half-counter
							style="margin-left:10px;"
							${ref(this.techCounter)}
							class="counter"
							countLabel="Techs"
						></half-counter>
					</div>
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
