/// <reference types="cypress" />

import { MatchInfo } from "../../src/match-info"
import { AutoInfo } from "../../src/auto-info"

describe("Scouting data validation", () => {
	it("Fills in general tab with data", () => {
		cy.viewport(1366, 768)
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


		for(let i = 0; i < 10; i++){
			cy.get("#autoInfo")
				.shadow()
				.find("game-counter:nth-child(2)")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}
		for(let i = 0; i < 4; i++){
			cy.get("#autoInfo")
				.shadow()
				.find("game-counter:nth-child(2)")
				.shadow()
				.find("vaadin-button.leftButton")
				.click();
		}
		cy.get("auto-info").then((element) => {
			cy.wrap((element.get(0) as AutoInfo).getInfo()).its("ampNum").should("eq", 6);
		});


		cy.get("#teleop-tab").click();
		cy.root().click();

		for(let i = 0; i < 6; i++){
			cy.get("#teleopInfo")
				.shadow()
				.find("game-counter:nth-child(1)")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}
		
		for(let i = 0; i < 3; i++){
			cy.get("#teleopInfo")
				.shadow()
				.find("vaadin-button.rightButton:nth-child(0)")
				.click({ multiple: true })
		}
		for(let i = 0; i < 4; i++){
			cy.get("#teleopInfo")
				.shadow()
				.find("half-counter:nth-child(2)")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}
		//cy.get("#end-tab").click();
		//cy.root().click();
		
		
		
		// cy.get("#endInfo")
		// 	.shadow()
		// 	.find("div.info > vaadin-text-field")
		// 	.type("Tippy, struggled to move");


		// cy.get("#endInfo")
		// 	.shadow()
		// 	.find("div.diagramDiv > vaadin-button:nth-child(4)")
		// 	.click();
		
	});




});
