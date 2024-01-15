import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { toCanvas } from "qrcode";
import {
	combineData,
	getMatchInfo,
	resetSession,
	storeData
} from "./data-store";

/**
 * Contains additional info about the auto period.
 *
 * Contains dropped pieces, mobility, and charge station status.
 */
@customElement("qr-code-screen")
export class QrCodeScreen extends LitElement {
	static styles = css`
		#qr-container {
			background-color: red;
			width: 50%;
		}
	`;

	canvas: Ref<HTMLCanvasElement> = createRef();
	sessionRestart: Ref<HTMLButtonElement> = createRef();
	continueScouting: Ref<HTMLInputElement> = createRef();

	render() {
		return html`
			<div id="qr-container">
				<vaadin-button @click=${this.renderQRCode}
					>Display QR Code</vaadin-button
				><br />
				<canvas
					${ref(this.canvas)}
					style="grid-column: 3; background-color: white; width: 500px; height: 500px;"
				></canvas>
				<vaadin-button ${ref(this.sessionRestart)} @click=${this.restartSession}
					>Restart Session</vaadin-button
				>
				<label>
					Continue Scouting?
					<vaadin-checkbox
						${ref(this.continueScouting)}
						checked
					></vaadin-checkbox>
				</label>
			</div>
		`;
	}

	restartSession() {
		resetSession(this.continueScouting.value!.checked);
		this.sessionRestart.value!.disabled = true;
	}

	renderQRCode() {
		let data = combineData();
		console.log(data);
		toCanvas(
			this.canvas.value,
			data,
			{ errorCorrectionLevel: "low" },
			function (error) {
				if (error) console.error(error);
				console.log("success!");
			}
		);
		let matchInfo = getMatchInfo();
		let key = `${matchInfo.alliance}${matchInfo.startingPosition}${
			matchInfo.matchType
		}${matchInfo.isReplay ? "replay" : ""}ScoutingData${matchInfo.matchNum}`;
		storeData(data, key);
		let file = new Blob([data], { type: "text/plain" });
		let link = document.createElement("a");
		link.download = `${key}.txt`;
		link.href = URL.createObjectURL(file);
		link.click();
		this.sessionRestart.value!.disabled = false;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"qr-code-screen": QrCodeScreen;
	}
}
