/// <reference types="cypress" />

import { MatchInfo } from "../../src/match-info"
import { AutoInfo } from "../../src/auto-info"

describe("Scouting data validation", () => {
	it("Test data output", () => {
		cy.viewport(1366, 768)
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
		
		cy.get("match-info").then((element) => {
			cy.wrap((element.get(0) as MatchInfo).getInfo()).its("name").should("eq", "Scouter Name");
			cy.wrap((element.get(0) as MatchInfo).getInfo()).its("matchType").should("eq", "QUAL");
			cy.wrap((element.get(0) as MatchInfo).getInfo()).its("matchNum").should("eq", "1");
			cy.wrap((element.get(0) as MatchInfo).getInfo()).its("isReplay").should("eq", 0);
			cy.wrap((element.get(0) as MatchInfo).getInfo()).its("alliance").should("eq", "R");
			cy.wrap((element.get(0) as MatchInfo).getInfo()).its("teamNum").should("eq", "20");
		});

		// Auto tab
		cy.get("#auto-tab").click();
		cy.root().click();

		cy.get("#autoInfo").shadow().find("toggle-button").click();


		cy.get("auto-info").then((element) => {
			cy.wrap((element.get(0) as AutoInfo).getInfo()).its("toggleLeft").should("eq", 1);
		});
		
		cy.get("#autoInfo").shadow().find("toggle-button").click();

		cy.get("auto-info").then((element) => {
			cy.wrap((element.get(0) as AutoInfo).getInfo()).its("toggleLeft").should("eq", 0);
		});


		for(let i = 0; i < 5; i++){
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-speaker-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for(let i = 0; i < 4; i++){
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-drop-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for(let i = 0; i < 3; i++){
			cy.get("#autoInfo")
				.shadow()
				.find("#auto-amp-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}


		cy.get("auto-info").then((element) => {
			cy.wrap((element.get(0) as AutoInfo).getInfo()).its("ampNum").should("eq", 3);
		});


		cy.get("#teleop-tab").click();
		cy.root().click();

		for(let i = 0; i < 5; i++){
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-speaker-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for(let i = 0; i < 4; i++){
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-drop-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for(let i = 0; i < 3; i++){
			cy.get("#teleopInfo")
				.shadow()
				.find("#teleop-amp-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}

		for(let i = 0; i < 2; i++){
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
		
	
		cy.get("#endInfo")
			.shadow()
			.find("#end-park vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();

		cy.get("#endInfo")
			.shadow()
			.find("#end-harmony vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();

		cy.get("#endInfo")
			.shadow()
			.find("#end-climb-success vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();

		cy.get("#endInfo")
			.shadow()
			.find("#end-climb-attempted vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
		

		cy.get("#endInfo")
			.shadow()
			.find("#end-trap-result vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(3)"
		).click();

		cy.get("#endInfo")
			.shadow()
			.find("#end-trap-attempted vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();
		
		cy.get("#endInfo")
				.shadow()
				.find("#end-comments > label")
				.type("Don't pick this team.");

		

		cy.get("#qr-tab").click();
		cy.root().click();

		cy.get("#qrInfo")
			.shadow()
			.find("#display-code-button")
			.click();

		cy.fixture("completeScoutingData.txt").then(() =>
			cy
				.readFile("cypress/downloads/R2QUALScoutingData1.txt")
				.should("eq", "Scouter Name;1;1;0;R;20;2;5;3;4;0;5;3;4;2;1;1;2;0;0;1;0;0;Don't pick this team.")
		);
	});




});
