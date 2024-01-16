/// <reference types="cypress" />

import { html } from "lit";
import { MatchInfo } from "../../src/match-info"
describe("match-info.cy.ts", () => {
	
	it("Team Number", () => {
		cy.mount(html`<match-info></match-info>`);
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(7) > vaadin-integer-field")
			.type("20");
		cy.get("match-info").then((element) => {
			cy.wrap((element.get(0) as MatchInfo).getInfo()).its("teamNum").should("eq", "20");
		});
	});
	
});
