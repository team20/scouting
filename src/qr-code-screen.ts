import { Notification } from "@vaadin/notification";
import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { createRef, ref, Ref } from "lit/directives/ref.js";
import { toCanvas } from "qrcode";
import {
	allFieldsValid,
	combineData,
	getMatchInfo,
	resetSession,
	storeData
} from "./data-store";

/**
 * Shows the QR Code for this match.
 * Also allows you to restart the scouting session.
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
		h2 {
			margin: 0;
		}
		canvas {
			background-color: var(--lumo-secondary-text-color);
			width: 450px;
			height: 450px;
			margin-bottom: 5px;
		}
	`;

	img = document.createElement("img") as HTMLImageElement;
	@state()
	matchLabel: string = "XXXX_XXXX";
	canvas: Ref<HTMLCanvasElement> = createRef();
	sessionRestart: Ref<HTMLButtonElement> = createRef();
	continueScouting: Ref<HTMLInputElement> = createRef();
	constructor() {
		super();
		this.img.src = "./logo-no-text.svg";
		this.img.decode();
	}
	render() {
		return html`
			<vaadin-button
				style="width: 450px;"
				@click=${this.renderQRCode}
				id="display-code-button"
				>Display QR Code</vaadin-button
			>
			<h2>${this.matchLabel}</h2>
			<canvas ${ref(this.canvas)}></canvas>
			<div>
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
			</div>
		`;
	}

	restartSession() {
		resetSession(this.continueScouting.value!.checked);
		this.sessionRestart.value!.disabled = true;
	}

	renderQRCode() {
		if (!allFieldsValid()) {
			Notification.show("You must add a comment!", {
				position: "middle",
				theme: "error"
			});
			this.canvas.value
				?.getContext("2d")
				?.clearRect(0, 0, this.canvas.value!.width, this.canvas.value!.height);
			return;
		}
		let data = combineData();
		toCanvas(this.canvas.value, data, { width: 450 });
		let logoLength = 100;
		let logoHeight = 65;
		this.canvas
			.value!.getContext("2d")!
			.drawImage(
				this.img,
				this.canvas.value!.width / 2 - logoLength / 2,
				this.canvas.value!.height / 2 - logoHeight / 2,
				logoLength,
				logoHeight
			);
		let matchInfo = getMatchInfo();
		this.matchLabel =
			(matchInfo.matchType || "????") + "_" + (matchInfo.matchNum || "????");
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
