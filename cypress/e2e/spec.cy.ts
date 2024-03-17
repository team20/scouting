/// <reference types="cypress" />

describe("Scouting data validation", () => {
	it("Test data output", () => {
		cy.viewport(1366, 768);
		cy.visit("/scouting");
		//Match Info tab
		cy.get("#matchInfo")
			.shadow()
			.find("div > label:nth-child(1) > vaadin-text-field")
			.type("Scouter Name");
		cy.get("#matchInfo")
			.shadow()
			.find("div > label:nth-child(2) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
		cy.root().click(); // Required before typing into another input field to fix weird focus bug
		cy.get("#matchInfo")
			.shadow()
			.find("div > label:nth-child(3) > vaadin-integer-field")
			.type("50");
		cy.get("#matchInfo")
			.shadow()
			.find("div > label:nth-child(5) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
		cy.get("#matchInfo")
			.shadow()
			.find("div > label:nth-child(6) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();
		cy.root().click(); // Required before typing into another input field to fix weird focus bug
		cy.get("#matchInfo")
			.shadow()
			.find("div > label:nth-child(7) > vaadin-integer-field")
			.type("20");

		// Auto tab
		cy.get("#auto-tab").click();
		cy.root().click();

		for (let i = 0; i < 6; i++) {
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-speaker-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 5; i++) {
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-speaker-miss-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 4; i++) {
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-amp-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 3; i++) {
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-amp-miss-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 2; i++) {
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-drop-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		cy.get("#autoInfo").shadow().find("toggle-button").click();

		cy.get("#teleop-tab").click();
		cy.root().click();

		for (let i = 0; i < 7; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-speaker-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 6; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-speaker-miss-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 5; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-amp-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 4; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-amp-miss-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 3; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-pass-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 2; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-foul-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		cy.get("#teleopInfo")
			.shadow()
			.find("#teleop-tech-counter")
			.shadow()
			.find("vaadin-button.rightButton")
			.click();

		cy.get("#end-tab").click();
		cy.root().click();

		cy.get("#endInfo").shadow().find("#end-trap-attempted").click();

		for (let i = 0; i < 3; i++) {
			cy.get("#endInfo")
				.shadow()
				.find("#end-trap-count")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		cy.get("#endInfo").shadow().find("#end-climb-result").click();

		cy.get("#endInfo")
			.shadow()
			.find("#end-harmony vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();

		cy.get("#endInfo")
			.shadow()
			.find("#end-defence-faced vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(4)"
		).click();

		cy.get("#endInfo")
			.shadow()
			.find("#end-defence-played vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(5)"
		).click();

		cy.get("#endInfo")
			.shadow()
			.find("#end-comments > label")
			.type("Pick this team.");

		cy.get("#qr-tab").click();
		cy.root().click();

		cy.get("#qrInfo").shadow().find("#display-code-button").click();

		cy.fixture("scoutingData.txt").then((refData) => {
			cy.readFile("cypress/downloads/R1QUALScoutingData50.txt").then((data) => {
				console.log(refData.type);

				cy.wrap(data.substring(0, data.length - 13)).should("eq", refData);
			});
		});
	});
	it("Breakdown requires comments", () => {
		cy.visit("/scouting");
		cy.get("#qr-tab").click();
		cy.get("#qrInfo").shadow().find("#display-code-button").click();
		cy.get("vaadin-notification-container").should("not.exist");

		cy.get("#end-tab").click();
		cy.get("#endInfo").shadow().find("#end-breakdown").click();

		cy.get("#qr-tab").click();
		cy.get("#qrInfo").shadow().find("#display-code-button").click();
		cy.get("vaadin-notification-container").should("exist");
		cy.wait(5000);

		cy.get("#end-tab").click();
		cy.get("#endInfo").shadow().find("#end-comments").type("Intake broke");

		cy.get("#qr-tab").click();
		cy.get("#qrInfo").shadow().find("#display-code-button").click();
		cy.get("vaadin-notification-container").should("not.exist");
	});
});
