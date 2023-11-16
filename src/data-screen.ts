import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { getData, removeData } from "./data-store";
import { QRCode } from "./qr-code";
/**
 * A button that switches between red and Team 20 green.
 */
@customElement("data-screen")
export class DataScreen extends LitElement {
	static styles = css`
		.qrcode {
			display: flex;
			flex-wrap: wrap;
		}
	`;
	div: Ref<HTMLDivElement> = createRef();
	passwordField: Ref<HTMLInputElement> = createRef();
	@state()
	isDialogOpen = false;
	render() {
		return html` <vaadin-button @click=${this.displayQRCodes}
				>Display QR Codes</vaadin-button
			><vaadin-button @click=${this.exportData}>Download Data</vaadin-button
			><vaadin-button @click=${this.displayDialog} theme="primary error"
				>Clear Data</vaadin-button
			><vaadin-confirm-dialog
				header="Wipe Scouting Data"
				reject-button-visible
				reject-text="No"
				?opened=${this.isDialogOpen}
				@cancel=${this.closeDialog}
				@confirm=${this.clearData}
				@reject=${this.closeDialog}
				>You are about to wipe device's scouting data. Are you sure you want to
				clear scouting data?
				<vaadin-text-field
					${ref(this.passwordField)}
					theme="small"
					autocomplete="off"
				></vaadin-text-field
			></vaadin-confirm-dialog>
			<div ${ref(this.div)} class="qrcode"></div>`;
	}
	/**
	 * Takes all the match data in the database and renders them into QR Codes.
	 */
	displayQRCodes() {
		getData().then((matches) => {
			this.div.value!.innerHTML = "";
			for (const match of matches.reverse()) {
				let qrCode = document.createElement("qr-code") as QRCode;
				this.div.value!.appendChild(qrCode);
				qrCode.renderQRCode(match);
			}
		});
	}
	/**
	 * Combines all the scouting data in the database and downloads it into one file.
	 */
	exportData() {
		getData().then((matches) => {
			let file = new Blob([matches.join("\n")], { type: "text/plain" });
			let link = document.createElement("a");
			link.download = `scoutingData.txt`;
			link.href = URL.createObjectURL(file);
			link.click();
		});
	}
	closeDialog() {
		this.isDialogOpen = false;
	}
	displayDialog() {
		this.isDialogOpen = true;
	}
	/**
	 * Removes all scouting data from the device.
	 */
	clearData() {
		this.closeDialog();
		if (this.passwordField.value!.value == "frc20") {
			removeData();
		}
		this.passwordField.value!.value = "";
		this.displayQRCodes();
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"data-screen": DataScreen;
	}
}
