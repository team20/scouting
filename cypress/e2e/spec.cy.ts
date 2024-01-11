/// <reference types="cypress" />

describe("Scouting data validation", () => {
	it("Match info creates correct output", () => {
		cy.visit("/scouting");
		// Match Info tab
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
			.type("1");
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
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
		cy.root().click(); // Required before typing into another input field to fix weird focus bug
		cy.get("#matchInfo")
			.shadow()
			.find("div > label:nth-child(7) > vaadin-integer-field")
			.type("20");
		cy.get("#matchInfo")
			.shadow()
			.find("div > label:nth-child(8) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();

		// Auto tab
		cy.get("#auto-tab").click();
		// Click the entire top row
		for (let i = 1; i <= 9; i++) {
			cy.get("#autoScoringInfo")
				.shadow()
				.find(`div:nth-child(1) > node-button:nth-child(${i})`)
				.click();
		}
		// Skip the middle row, same as top row
		// Click some of the bottom row
		for (let i = 1; i <= 9; i++) {
			// Don't click every third button
			if (i % 3 == 0) {
				// no-op
			} else if (i % 3 == 1) {
				// Click every first button once
				cy.get("#autoScoringInfo")
					.shadow()
					.find(`div:nth-child(3) > node-button:nth-child(${i})`)
					.click();
			} else {
				// Click every second button twice
				cy.get("#autoScoringInfo")
					.shadow()
					.find(`div:nth-child(3) > node-button:nth-child(${i})`)
					.click()
					.click();
			}
		}
		cy.get("#autoInfo")
			.shadow()
			.find("game-counter:nth-child(1)")
			.shadow()
			.find("vaadin-button.rightButton")
			.click();
		cy.get("#autoInfo")
			.shadow()
			.find("game-counter:nth-child(2)")
			.shadow()
			.find("vaadin-button.rightButton")
			.click()
			.click()
			.click();
		cy.get("#autoInfo")
			.shadow()
			.find("game-counter:nth-child(2)")
			.shadow()
			.find("vaadin-button.leftButton")
			.click();
		cy.get("#autoInfo").shadow().find("toggle-button").click();
		cy.get("#autoInfo")
			.shadow()
			.find("charge-station-info")
			.shadow()
			.find("vaadin-select:nth-child(2)")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(4)"
		).click();
		cy.get("#autoInfo")
			.shadow()
			.find("charge-station-info")
			.shadow()
			.find("vaadin-select:nth-child(1)")
			.click();
		cy.get("body > vaadin-select-overlay").should("not.exist");

		// Teleop tab
		cy.get("#teleop-tab").click();
		cy.get("#teleopInfo").shadow();
		cy.get("#teleopInfo")
			.shadow()
			.find("game-counter:nth-child(1)")
			.shadow()
			.find("vaadin-button.rightButton")
			.click();
		cy.get("#teleopInfo")
			.shadow()
			.find("game-counter:nth-child(2)")
			.shadow()
			.find("vaadin-button.rightButton")
			.click()
			.click();
		cy.get("#teleopInfo")
			.shadow()
			.find("game-counter:nth-child(3)")
			.shadow()
			.find("vaadin-button.rightButton")
			.click()
			.click()
			.click();
		cy.get("#teleopInfo")
			.shadow()
			.find("game-counter:nth-child(4)")
			.shadow()
			.find("vaadin-button.rightButton")
			.click()
			.click()
			.click()
			.click();
		cy.get("#teleopInfo")
			.shadow()
			.find("charge-station-info")
			.shadow()
			.find("vaadin-select:nth-child(2)")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(3)"
		).click();
		cy.get("#teleopInfo")
			.shadow()
			.find("charge-station-info")
			.shadow()
			.find("vaadin-select:nth-child(1)")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
		cy.get("#end-tab").click();
		cy.root().click(); // Required before typing into another input field to fix weird focus bug
		cy.get("#endInfo")
			.shadow()
			.find("div.info > vaadin-text-field")
			.type("Tippy, struggled to move");
		cy.get("#endInfo")
			.shadow()
			.find("div.diagramDiv > vaadin-button:nth-child(4)")
			.click();
		cy.fixture("scoutingData.txt").then((referenceData) =>
			cy
				.readFile("cypress/downloads/Red2QualificationScoutingData1.txt")
				.should("eq", referenceData)
		);
		// cy.get("#teleopInfo")
		// 	.shadow()
		// 	.find("game-counter:nth-child(1)")
		// 	.shadow()
		// 	.find("vaadin-button.rightButton")
		// 	.then((element) => {
		// 		cy.wrap(element.css("backgroundColor")).eq("rgb()");
		// 	});
	});
	it("Scouting data downloads correctly", () => {
		cy.visit("/scouting");
		// Match Info tab
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
			.type("1");
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
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
		cy.root().click(); // Required before typing into another input field to fix weird focus bug
		cy.get("#matchInfo")
			.shadow()
			.find("div > label:nth-child(7) > vaadin-integer-field")
			.type("20");
		cy.get("#matchInfo")
			.shadow()
			.find("div > label:nth-child(8) > vaadin-select")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();

		cy.get("#end-tab").click();
		cy.get("#endInfo")
			.shadow()
			.find("div.diagramDiv > vaadin-button:nth-child(4)")
			.click();
		// Prepare another scouting session
		cy.get("#endInfo")
			.shadow()
			.find("div.diagramDiv > vaadin-button:nth-child(5)")
			.click();
		// Record another scouting session
		cy.get("#endInfo")
			.shadow()
			.find("div.diagramDiv > vaadin-button:nth-child(4)")
			.click();
		cy.get("#data-tab").click();
		cy.get("#dataScreen").shadow().find("vaadin-button:nth-child(3)").click();
		cy.fixture("completeScoutingData.txt").then((referenceData) =>
			cy
				.readFile("cypress/downloads/scoutingData.txt")
				.should("eq", referenceData)
		);
	});
});
