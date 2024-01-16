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
			width: 50%;
			color: var(--lumo-primary-text-color);
		}
	`;

	matchLabel: Ref<HTMLHeadingElement> = createRef();
	canvas: Ref<HTMLCanvasElement> = createRef();
	sessionRestart: Ref<HTMLButtonElement> = createRef();
	continueScouting: Ref<HTMLInputElement> = createRef();
	render() {
		return html`
			<center>
				<div id="qr-container">
					<vaadin-button style="width: 450px;" @click=${this.renderQRCode}
					>Display QR Code</vaadin-button
					><br />
					<h1 ${ref(this.matchLabel)} style="margin-bottom:5px;margin-top:10px;">XXXX_XXXX</h1>
					<canvas
						${ref(this.canvas)}
						style="grid-column: 3; background-color: var(--lumo-secondary-text-color); width: 450px; height: 450px;margin-bottom:10px;"
					></canvas><br>
					<vaadin-button
						${ref(this.sessionRestart)}
						@click=${this.restartSession}
						>Restart Session</vaadin-button
					>
					<label style="margin-left:50px;">
						Continue Scouting?
						<vaadin-checkbox
							${ref(this.continueScouting)}
							checked
						></vaadin-checkbox>
					</label>
				</div>
			</center>
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
			{width: 450},
			function (error) {
				if (error) console.error(error);
				console.log("success!");
			}
		);
		let matchInfo = getMatchInfo();
		this.matchLabel.value!.innerText = (matchInfo.matchType || "????") +"_"+ (matchInfo.matchNum || "????");
		this.render();		
		let key = `${matchInfo.alliance}${matchInfo.startingPosition}${
			matchInfo.matchType}${matchInfo.isReplay ? "replay" : ""}ScoutingData${matchInfo.matchNum}`;
		console.log("key: " + key);
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
