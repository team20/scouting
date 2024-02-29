import { css, html, LitElement } from "lit";
import { customElement, state } from "lit/decorators.js";
import { toCanvas } from "qrcode";
/**
 * A QR Code with a label.
 */
@customElement("qr-code")
export class QRCode extends LitElement {
	static styles = css`
		label {
			display: flex;
			flex-direction: column;
			align-items: center;
			width: min-content;
			color: var(--lumo-secondary-text-color);
			font-family: var(--lumo-font-family);
			font-size: var(--lumo-font-size-s);
			font-weight: 500;
		}
	`;
	canvas: HTMLCanvasElement = document.createElement("canvas");
	@state()
	// @ts-ignore
	label: string;

	render() {
		return html`<label> ${this.canvas}${this.label} </label>`;
	}

	renderQRCode(data: string) {
		toCanvas(this.canvas, data, { errorCorrectionLevel: "low", width: 250 });
		this.label = "Match " + data.split("\t")[2];
	}
}
