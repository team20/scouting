/// <reference types="cypress" />

import { html } from "lit";

describe("matchInfo.cy.ts", () => {
	it("Name", () => {
		cy.viewport(1366, 768);
		cy.mount(html`<match-info></match-info>`);
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(1) > vaadin-text-field")
			.type("Scouter Name");
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo())
				.its("name")
				.should("eq", "Scouter Name");
		});
	});

	it("Match type", () => {
		cy.mount(html`<match-info></match-info>`);
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(2) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("matchType").should("eq", "PRAC");
		});
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(2) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("matchType").should("eq", "QUAL");
		});
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(2) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(3)"
		).click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("matchType").should("eq", "PLAY");
		});
	});
	it("Match number", () => {
		cy.mount(html`<match-info></match-info>`);
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(3) > vaadin-integer-field")
			.type("1");
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("matchNum").should("eq", "1");
		});
	});
	it("Replay", () => {
		cy.mount(html`<match-info></match-info>`);
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(4) > vaadin-checkbox")
			.click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("isReplay").should("eq", 1);
		});
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(4) > vaadin-checkbox")
			.click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("isReplay").should("eq", 0);
		});
	});
	it("Alliance", () => {
		cy.mount(html`<match-info></match-info>`);
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(5) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("alliance").should("eq", "B");
		});
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(5) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("alliance").should("eq", "R");
		});
	});
	it("Starting Position", () => {
		cy.mount(html`<match-info></match-info>`);
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(6) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo())
				.its("startingPosition")
				.should("eq", "1");
		});
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(6) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo())
				.its("startingPosition")
				.should("eq", "2");
		});
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(6) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(3)"
		).click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo())
				.its("startingPosition")
				.should("eq", "3");
		});
	});
	it("Team Number", () => {
		cy.mount(html`<match-info></match-info>`);
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(7) > vaadin-integer-field")
			.type("20");
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("teamNum").should("eq", "20");
		});
	});
});
