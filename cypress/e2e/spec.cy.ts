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
		cy.root().click();
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
		cy.root().click();
		cy.get("#matchInfo")
			.shadow()
			.find("div > label:nth-child(6) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();
		cy.root().click();
		cy.root().click(); // Required before typing into another input field to fix weird focus bug
		cy.get("#matchInfo")
			.shadow()
			.find("div > label:nth-child(7) > vaadin-integer-field")
			.type("20");

		// Auto tab
		cy.get("#auto-tab").click();
		cy.root().click();

		cy.get("#autoInfo").shadow().find("#right-buttons").find("#leave").click();

		for (let i = 0; i < 9; i++) {
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-coral-one")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 8; i++) {
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-coral-two")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 7; i++) {
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-coral-three")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 6; i++) {
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-coral-four")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 5; i++) {
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-algae-net")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 4; i++) {
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-algae-missed")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 3; i++) {
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-algae-removed")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 2; i++) {
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-algae-processor")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		cy.get("#autoInfo")
				.shadow()
				.find("#auto-coral-missed")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();

		cy.get("#teleop-tab").click();
		cy.root().click();

		for (let i = 0; i < 10; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-coral-one")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 9; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-coral-two")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 8; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-coral-three")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 7; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-coral-four")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 6; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-algae-net")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 5; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-algae-missed")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 4; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-algae-removed")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 3; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-coral-missed")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for (let i = 0; i < 2; i++) {
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-algae-processor")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		cy.get("#teleopInfo")
			.shadow()
			.find("#teleop-foul")
			.shadow()
			.find("vaadin-button.rightButton")
			.click();

		cy.get("#end-tab").click();
		cy.root().click();

		cy.get("#endInfo").shadow().find("#end-cage-attempted").click();
		cy.get("body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)").click();
		cy.root().click();

		cy.get("#endInfo").shadow().find("#end-cage-result").click();
		cy.get("body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)").click();
		cy.root().click();

		cy.get("#endInfo")
			.shadow()
			.find("#end-defence-played")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(5)"
		).click();
		cy.root().click();

		cy.get("#endInfo")
			.shadow()
			.find("#end-defence-faced")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(4)"
		).click();
		cy.root().click();

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
