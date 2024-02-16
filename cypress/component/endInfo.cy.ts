/// <reference types="cypress" />

import { html } from "lit";

describe("endInfo.cy.ts", () => {
	it("Climb result forces climb attempt", () => {
		cy.viewport(1366, 768);
		cy.mount(html`<end-screen></end-screen>`);

		cy.get("end-screen").shadow().find("#end-climb-result").click();

		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbResult").should("eq", 1);
		});
		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbAttempted").should("eq", 1);
		});

		cy.get("end-screen").shadow().find("#end-climb-result").click();

		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbResult").should("eq", 0);
		});
		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbAttempted").should("eq", 1);
		});
	});

	it("Climb attempt forces climb result", () => {
		cy.viewport(1366, 768);
		cy.mount(html`<end-screen></end-screen>`);

		cy.get("end-screen").shadow().find("#end-climb-result").click();

		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbResult").should("eq", 1);
		});
		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbAttempted").should("eq", 1);
		});

		cy.get("end-screen").shadow().find("#end-climb-attempted").click();

		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbResult").should("eq", 0);
		});
		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbAttempted").should("eq", 0);
		});
	});

	it("Park forces climb result", () => {
		cy.viewport(1366, 768);
		cy.mount(html`<end-screen></end-screen>`);

		cy.get("end-screen").shadow().find("#end-climb-result").click();

		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbResult").should("eq", 1);
		});

		cy.get("end-screen").shadow().find("#end-park").click();

		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbResult").should("eq", 0);
		});

		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("park").should("eq", 1);
		});
	});

	it("Climb result forces park", () => {
		cy.viewport(1366, 768);
		cy.mount(html`<end-screen></end-screen>`);

		cy.get("end-screen").shadow().find("#end-park").click();

		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbResult").should("eq", 0);
		});
		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("park").should("eq", 1);
		});

		cy.get("end-screen").shadow().find("#end-climb-result").click();

		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbResult").should("eq", 1);
		});

		cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("park").should("eq", 0);
		});
	});
});
