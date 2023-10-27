import { LitElement, css, html, PropertyValueMap } from "lit";
import { live } from "lit/directives/live.js";
import { createRef, Ref, ref } from "lit/directives/ref.js";
import { customElement, property, state } from "lit/decorators.js";
/**
 * An example element.
 *
 * @slot - This element has a slot
 * @csspart button - The button
 */
@customElement("my-element")
export class MyElement extends LitElement {
	static styles = css`
		:host {
			display: flex;
			flex-direction: column;
		}
	`;
	// @ts-ignore
	ref: Ref<HTMLInputElement> = createRef();
	preloadOptions = [
		{ label: "None", value: "None" },
		{ label: "Cube", value: "Cube" },
		{ label: "Cone", value: "Cone" },
	];

	render() {
		return html`<vaadin-text-field
				${ref(this.ref)}
				label="Name"
			></vaadin-text-field>
			<vaadin-select
				.items="${this.preloadOptions}"
				label="Preloaded Piece?"
			></vaadin-select>`;
	}
	test() {
		console.log(this.ref.value!.value);
	}
}

declare global {
	interface HTMLElementTagNameMap {
		"my-element": MyElement;
	}
}
