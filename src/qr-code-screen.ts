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
		:host {
			display: flex;
			flex-direction: column;
			align-items: center;
			color: var(--lumo-primary-text-color);
		}
		h1 {
			margin: 0;
		}
	`;

	matchLabel: Ref<HTMLHeadingElement> = createRef();
	canvas: Ref<HTMLCanvasElement> = createRef();
	sessionRestart: Ref<HTMLButtonElement> = createRef();
	continueScouting: Ref<HTMLInputElement> = createRef();
	render() {
		return html`
			<vaadin-button
				style="width: 450px;"
				@click=${this.renderQRCode}
				id="display-code-button"
				>Display QR Code</vaadin-button
			>
			<h1 ${ref(this.matchLabel)}>XXXX_XXXX</h1>
			<canvas
				${ref(this.canvas)}
				style="grid-column: 3; background-color: var(--lumo-secondary-text-color); width: 450px; height: 450px;margin-bottom:10px;"
			></canvas>
			<vaadin-button ${ref(this.sessionRestart)} @click=${this.restartSession}
				>Restart Session</vaadin-button
			>
			<label style="margin-left:50px;">
				Continue Scouting?
				<vaadin-checkbox
					${ref(this.continueScouting)}
					checked
				></vaadin-checkbox>
			</label>
		`;
	}

	restartSession() {
		resetSession(this.continueScouting.value!.checked);
		this.sessionRestart.value!.disabled = true;
	}

	renderQRCode() {
		let data = combineData();
		console.log(data);
		toCanvas(this.canvas.value, data, { width: 450 }, function (error) {
			if (error) console.error(error);
			console.log("success!");
		});
		let matchInfo = getMatchInfo();
		this.matchLabel.value!.innerText =
			(matchInfo.matchType || "????") + "_" + (matchInfo.matchNum || "????");
		this.render();
		let key = `${matchInfo.alliance}${matchInfo.startingPosition}${
			matchInfo.matchType
		}${matchInfo.isReplay ? "replay" : ""}ScoutingData${matchInfo.matchNum}`;
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
