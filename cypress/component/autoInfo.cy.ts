/// <reference types="cypress" />

import { html } from "lit";

describe('autoInfo.cy.ts', () => {
  it('Speaker Notes', () => {
    cy.viewport(1366, 768)
    cy.mount(html`<auto-info></auto-info>`);

    for(let i = 0; i < 5; i++){
			cy.get("auto-info")
				.shadow()
				.find("#auto-speaker-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}
    

    cy.get("auto-info").then((element) => {
			cy.wrap(element.get(0).getInfo())
				.its("speakerNum")
				.should("eq", 5);
		});

    for(let i = 0; i < 3; i++){
			cy.get("auto-info")
				.shadow()
				.find("#auto-speaker-counter")
				.shadow()
				.find("vaadin-button.leftButton")
				.click();
		}
    cy.get("auto-info").then((element) => {
			cy.wrap(element.get(0).getInfo())
				.its("speakerNum")
				.should("eq", 2);
		});
  })

  it('AMP Notes', () => {
    cy.viewport(1366, 768)
    cy.mount(html`<auto-info></auto-info>`);

    for(let i = 0; i < 5; i++){
			cy.get("auto-info")
				.shadow()
				.find("#auto-amp-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}
    

    cy.get("auto-info").then((element) => {
			cy.wrap(element.get(0).getInfo())
				.its("ampNum")
				.should("eq", 5);
		});

    for(let i = 0; i < 3; i++){
			cy.get("auto-info")
				.shadow()
				.find("#auto-amp-counter")
				.shadow()
				.find("vaadin-button.leftButton")
				.click();
		}
    cy.get("auto-info").then((element) => {
			cy.wrap(element.get(0).getInfo())
				.its("ampNum")
				.should("eq", 2);
		});
  })

  it('Dropped Notes', () => {
    cy.viewport(1366, 768)
    cy.mount(html`<auto-info></auto-info>`);

    for(let i = 0; i < 5; i++){
			cy.get("auto-info")
				.shadow()
				.find("#auto-drop-counter")
				.shadow()
				.find("vaadin-button.rightButton")
				.click();
		}
    

    cy.get("auto-info").then((element) => {
			cy.wrap(element.get(0).getInfo())
				.its("notesDroppedCounter")
				.should("eq", 5);
		});

    for(let i = 0; i < 3; i++){
			cy.get("auto-info")
				.shadow()
				.find("#auto-drop-counter")
				.shadow()
				.find("vaadin-button.leftButton")
				.click();
		}
    cy.get("auto-info").then((element) => {
			cy.wrap(element.get(0).getInfo())
				.its("notesDroppedCounter")
				.should("eq", 2);
		});
  })

  it('Left', () => {
    cy.viewport(1366, 768)
    cy.mount(html`<auto-info></auto-info>`);

    cy.get("auto-info").shadow().find("toggle-button").click();
  
    cy.get("auto-info").then((element) => {
			cy.wrap(element.get(0).getInfo())
				.its("toggleLeft")
				.should("eq", 1);
		});

    cy.get("auto-info").shadow().find("toggle-button").click();

    cy.get("auto-info").then((element) => {
			cy.wrap(element.get(0).getInfo())
				.its("toggleLeft")
				.should("eq", 0);
		});
  })

})