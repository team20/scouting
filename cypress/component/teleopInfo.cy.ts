/// <reference types="cypress" />

import { html } from "lit";

it("Speaker Notes", () => {
	cy.viewport(1366, 768);
	cy.mount(html`<teleop-info></teleop-info>`);

	for (let i = 0; i < 5; i++) {
		cy.get("teleop-info")
			.shadow()
			.find("#teleop-speaker-counter")
			.shadow()
			.find("vaadin-button.rightButton")
			.click();
	}

	cy.get("teleop-info").then((element) => {
		cy.wrap(element.get(0).getInfo()).its("speakerNum").should("eq", 5);
	});

	for (let i = 0; i < 3; i++) {
		cy.get("teleop-info")
			.shadow()
			.find("#teleop-speaker-counter")
			.shadow()
			.find("vaadin-button.leftButton")
			.click();
	}
	cy.get("teleop-info").then((element) => {
		cy.wrap(element.get(0).getInfo()).its("speakerNum").should("eq", 2);
	});
});

it("AMP Notes", () => {
	cy.viewport(1366, 768);
	cy.mount(html`<teleop-info></teleop-info>`);

	for (let i = 0; i < 5; i++) {
		cy.get("teleop-info")
			.shadow()
			.find("#teleop-amp-counter")
			.shadow()
			.find("vaadin-button.rightButton")
			.click();
	}

	cy.get("teleop-info").then((element) => {
		cy.wrap(element.get(0).getInfo()).its("ampNum").should("eq", 5);
	});

	for (let i = 0; i < 3; i++) {
		cy.get("teleop-info")
			.shadow()
			.find("#teleop-amp-counter")
			.shadow()
			.find("vaadin-button.leftButton")
			.click();
	}
	cy.get("teleop-info").then((element) => {
		cy.wrap(element.get(0).getInfo()).its("ampNum").should("eq", 2);
	});
});

it("Dropped Notes", () => {
	cy.viewport(1366, 768);
	cy.mount(html`<teleop-info></teleop-info>`);

	for (let i = 0; i < 5; i++) {
		cy.get("teleop-info")
			.shadow()
			.find("#teleop-drop-counter")
			.shadow()
			.find("vaadin-button.rightButton")
			.click();
	}

	cy.get("teleop-info").then((element) => {
		cy.wrap(element.get(0).getInfo())
			.its("notesDroppedCounter")
			.should("eq", 5);
	});

	for (let i = 0; i < 3; i++) {
		cy.get("teleop-info")
			.shadow()
			.find("#teleop-drop-counter")
			.shadow()
			.find("vaadin-button.leftButton")
			.click();
	}
	cy.get("teleop-info").then((element) => {
		cy.wrap(element.get(0).getInfo())
			.its("notesDroppedCounter")
			.should("eq", 2);
	});
});

it("Fouls", () => {
	cy.viewport(1366, 768);
	cy.mount(html`<teleop-info></teleop-info>`);

	for (let i = 0; i < 5; i++) {
		cy.get("teleop-info")
			.shadow()
			.find("#teleop-foul-counter")
			.shadow()
			.find("vaadin-button.rightButton")
			.click();
	}

	cy.get("teleop-info").then((element) => {
		cy.wrap(element.get(0).getInfo()).its("foulCounter").should("eq", 5);
	});

	for (let i = 0; i < 3; i++) {
		cy.get("teleop-info")
			.shadow()
			.find("#teleop-foul-counter")
			.shadow()
			.find("vaadin-button.leftButton")
			.click();
	}
	cy.get("teleop-info").then((element) => {
		cy.wrap(element.get(0).getInfo()).its("foulCounter").should("eq", 2);
	});
});

it("Tech Fouls", () => {
	cy.viewport(1366, 768);
	cy.mount(html`<teleop-info></teleop-info>`);

	for (let i = 0; i < 5; i++) {
		cy.get("teleop-info")
			.shadow()
			.find("#teleop-tech-counter")
			.shadow()
			.find("vaadin-button.rightButton")
			.click();
	}

	cy.get("teleop-info").then((element) => {
		cy.wrap(element.get(0).getInfo()).its("techCounter").should("eq", 5);
	});

	for (let i = 0; i < 3; i++) {
		cy.get("teleop-info")
			.shadow()
			.find("#teleop-tech-counter")
			.shadow()
			.find("vaadin-button.leftButton")
			.click();
	}
	cy.get("teleop-info").then((element) => {
		cy.wrap(element.get(0).getInfo()).its("techCounter").should("eq", 2);
	});
});
