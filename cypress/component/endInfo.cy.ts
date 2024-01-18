/// <reference types="cypress" />

import { html } from "lit";

describe('endInfo.cy.ts', () => {
  it('Park', () => {
    cy.viewport(1366, 768)
    cy.mount(html`<end-screen></end-screen>`);

    cy.get("end-screen")
			.shadow()
			.find("#end-park vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();

    cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("park").should("eq", 1);
		});

    cy.get("end-screen")
			.shadow()
			.find("#end-park vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();

    cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("park").should("eq", 0);
		});
  })

  it('Harmony', () => {
    cy.viewport(1366, 768)
    cy.mount(html`<end-screen></end-screen>`);

    cy.get("end-screen")
			.shadow()
			.find("#end-harmony vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();

    cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("harmony").should("eq", "0");
		});

    cy.get("end-screen")
			.shadow()
			.find("#end-harmony vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
      
    cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("harmony").should("eq", "2");
		});

    cy.get("end-screen")
			.shadow()
			.find("#end-harmony vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(3)"
		).click();
      
    cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("harmony").should("eq", "3");
		});
  })

  it('Climb Success', () => {
    cy.viewport(1366, 768)
    cy.mount(html`<end-screen></end-screen>`);
    
    cy.get("end-screen")
			.shadow()
			.find("#end-climb-success vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();

    cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbResult").should("eq", 1);
		});

    cy.get("end-screen")
			.shadow()
			.find("#end-climb-success vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();

    cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbResult").should("eq", 0);
		});
  })

  it('Climb Attempted', () => {
    cy.viewport(1366, 768)
    cy.mount(html`<end-screen></end-screen>`);
    
    cy.get("end-screen")
			.shadow()
			.find("#end-climb-attempted vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();

    cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbAttempted").should("eq", 1);
		});

    cy.get("end-screen")
			.shadow()
			.find("#end-climb-attempted vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();

    cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbAttempted").should("eq", 0);
		});
  })

  it('Climb Attempted excludes Climb Success', () => {
    cy.viewport(1366, 768)
    cy.mount(html`<end-screen></end-screen>`);
    
    cy.get("end-screen")
      .shadow()
      .find("#end-climb-success vaadin-select-value-button")
      .click();
    cy.get(
      "body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
    ).click();

    cy.get("end-screen").then((element) => {
      cy.wrap(element.get(0).getInfo()).its("climbResult").should("eq", 1);
    });

    cy.get("end-screen")
			.shadow()
			.find("#end-climb-attempted vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();

    cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbAttempted").should("eq", 1);
		});
    cy.get("end-screen").then((element) => {
      cy.wrap(element.get(0).getInfo()).its("climbResult").should("eq", 1);
    });

    cy.get("end-screen")
			.shadow()
			.find("#end-climb-attempted vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();

    cy.get("end-screen").then((element) => {
			cy.wrap(element.get(0).getInfo()).its("climbAttempted").should("eq", 0);
		});
    cy.get("end-screen").then((element) => {
      cy.wrap(element.get(0).getInfo()).its("climbResult").should("eq", 0);
    });
  })

  it('Traps Result', () => {
    cy.viewport(1366, 768)
    cy.mount(html`<end-screen></end-screen>`);

    cy.get("end-screen")
			.shadow()
			.find("#end-trap-result vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();
    cy.get("end-screen").then((element) => {
      cy.wrap(element.get(0).getInfo()).its("trapResult").should("eq", "0");
    });

    cy.get("end-screen")
			.shadow()
			.find("#end-trap-result vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
    cy.get("end-screen").then((element) => {
      cy.wrap(element.get(0).getInfo()).its("trapResult").should("eq", "1");
    });

    cy.get("end-screen")
			.shadow()
			.find("#end-trap-result vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(3)"
		).click();
    cy.get("end-screen").then((element) => {
      cy.wrap(element.get(0).getInfo()).its("trapResult").should("eq", "2");
    });

    cy.get("end-screen")
			.shadow()
			.find("#end-trap-result vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(4)"
		).click();
    cy.get("end-screen").then((element) => {
      cy.wrap(element.get(0).getInfo()).its("trapResult").should("eq", "3");
    });
  })

  it('Traps Attempted', () => {
    cy.viewport(1366, 768)
    cy.mount(html`<end-screen></end-screen>`);

    cy.get("end-screen")
			.shadow()
			.find("#end-trap-attempted vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(1)"
		).click();
    cy.get("end-screen").then((element) => {
      cy.wrap(element.get(0).getInfo()).its("trapAttempted").should("eq", 1);
    });

    cy.get("end-screen")
			.shadow()
			.find("#end-trap-attempted vaadin-select-value-button")
			.click();
		cy.get(
			"body > vaadin-select-overlay > vaadin-select-list-box > vaadin-select-item:nth-child(2)"
		).click();
    cy.get("end-screen").then((element) => {
      cy.wrap(element.get(0).getInfo()).its("trapAttempted").should("eq", 0);
    });
  })

  it('Comments', () => {
    cy.viewport(1366, 768)
    cy.mount(html`<end-screen></end-screen>`);

    cy.get("end-screen").then((element) => {
      cy.wrap(element.get(0).getInfo()).its("comments").should("eq", "No comment.");
    });

    cy.get("end-screen")
				.shadow()
				.find("#end-comments > label")
				.type("Don't pick this team.");
      
        cy.get("end-screen").then((element) => {
          cy.wrap(element.get(0).getInfo()).its("comments").should("eq", "Don't pick this team.");
        });
    
  })
})