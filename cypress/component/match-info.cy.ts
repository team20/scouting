/// <reference types="cypress" />

import { html } from "lit";

describe("match-info.cy.ts", () => {
	it("Name", () => {
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
			cy.wrap(element.get(0).getInfo())
				.its("matchType")
				.should("eq", "Practice");
		});
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(2) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo())
				.its("matchType")
				.should("eq", "Qualification");
		});
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(2) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(3)"
		).click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo())
				.its("matchType")
				.should("eq", "PLAYOFFS");
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
			cy.wrap(element.get(0).getInfo()).its("isReplay").should("eq", true);
		});
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(4) > vaadin-checkbox")
			.click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("isReplay").should("eq", false);
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
			cy.wrap(element.get(0).getInfo()).its("alliance").should("eq", "Blue");
		});
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(5) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("alliance").should("eq", "Red");
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
	it("Preload", () => {
		cy.mount(html`<match-info></match-info>`);
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(8) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("preload").should("eq", "None");
		});
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(8) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("preload").should("eq", "Cube");
		});
		cy.get("match-info")
			.shadow()
			.find("div > label:nth-child(8) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(3)"
		).click();
		cy.get("match-info").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("preload").should("eq", "Cone");
		});
	});
});
