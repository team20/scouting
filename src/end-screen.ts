import {css, html, LitElement} from "lit";
import {customElement} from "lit/decorators.js";
import {createRef, ref, Ref} from "lit/directives/ref.js";
import {BreakdownButton} from "./breakdown-button.ts"
import "@vaadin/text-area";


/**
 * The final scouting screen.
 *
 * Contains defense info, additional comments, charge station climbing, and a field diagram.
 * Also has a slot for QR code display and restarting the scouting session.
 */
@customElement("end-screen")
export class EndScreen extends LitElement {
    static styles = css`

		label {
			color: var(--lumo-secondary-text-color);
			font-family: var(--lumo-font-family);
			font-size: var(--lumo-font-size-m);
			font-weight: 500;
			line-height: 2;
		}
		.diagram {
			width: 400px;
			aspect-ratio: 1056 / 562;
		}

		#left {
			width: 120%;
			height: 100%;
		}

		#right {
			width: 100%;

		}

		#container {
			display: flex;
			width: 100%;
			height: 100%;
		}
		#row1 {
			display: flex;
			align-items: center;
  			justify-content: center;
            gap: 10px;
            height: 150px;
		}
		#row2 {
			display: flex;
            gap: 10px;
            height: 150px;
		}
	#row3 {
			display: flex;
            height: 150px;
		}
	`;

    yesNoOptions = [
        {label: "Yes", value: "Yes"},
        {label: "No", value: "No"},
    ];

    trapResultOptions = [
        {label: "0", value: "0"},
        {label: "1", value: "1"},
        {label: "2", value: "2"},
        {label: "3", value: "3"},
    ];

    harmonyOptions = [
        {label: "0", value: "0"},
        {label: "2", value: "2"},
        {label: "3", value: "3"},
    ];


    trapAttempted: Ref<HTMLInputElement> = createRef();
    trapResult: Ref<HTMLInputElement> = createRef();
    climbAttempted: Ref<HTMLInputElement> = createRef();
    climbResult: Ref<HTMLInputElement> = createRef();
    harmony: Ref<HTMLInputElement> = createRef();
    park: Ref<HTMLInputElement> = createRef();
    breakdown: Ref<BreakdownButton> = createRef();
    comments: Ref<HTMLInputElement> = createRef();

    //TODO Will be back
    //sessionRestart: Ref<HTMLButtonElement> = createRef();
    //continueScouting: Ref<HTMLInputElement> = createRef();

    render() {
        return html`
            <div id="container">
                <div id="left">
                    <div id="row1">

                        <vaadin-select
                            ${ref(this.trapAttempted)}
                            theme="small"
                            label="Trap Attempted?"
                            .items="${this.yesNoOptions}"
                        ></vaadin-select>

                        <vaadin-select
                            ${ref(this.trapResult)}
                            theme="small"
                            label="Traps Result"
                            .items="${this.trapResultOptions}"
                        ></vaadin-select>
                    </div>
                    <div id="row2">

                        <vaadin-select
                            ${ref(this.climbAttempted)}
                            theme="small"
                            label="Climb Attempted?"
                            .items="${this.yesNoOptions}"
                        ></vaadin-select>

                        <vaadin-select
                            ${ref(this.climbResult)}
                            theme="small"
                            label="Climb Result"
                            .items="${this.yesNoOptions}"
                        ></vaadin-select>


                        <vaadin-select
                            ${ref(this.harmony)}
                            theme="small"
                            label="Harmony?"
                            .items="${this.harmonyOptions}"
                        ></vaadin-select>


                    </div>
                    <div id="row3">
                        <vaadin-select
                            ${ref(this.park)}
                            theme="small"
                            label="Park"
                            .items="${this.yesNoOptions}"
                        ></vaadin-select>


                        <breakdown-button ${ref(this.breakdown)} style="" label="Left"></breakdown-button>

                    </div>
                </div>



                <div id="right" >
                    <vaadin-text-area
                        style="width:100%; height: 100%;"
                        ${ref(this.comments)}
                        label="Comments?"
                    ></vaadin-text-area>


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
            //TODO return data
        };
    }

    /**
     * Prepares this element for a new scouting session.
     *
     * Resets all values to their defaults.
     */
    reset() {
        //TODO reset data
    }


}

declare global {
    interface HTMLElementTagNameMap {
        "end-screen": EndScreen;
    }
}
