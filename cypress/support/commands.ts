/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable<Subject> {
    getByData(dataTestName: string, timeout?: number): Chainable<Subject>;
    login(userName: string, email: string): Chainable<Subject>;
    logout(): Chainable<Subject>;
  }
}

Cypress.Commands.add(
  "getByData",
  (dataTestAttribute: string, timeout?: number) => {
    return cy.get(`[data-test="${dataTestAttribute}"]`, { timeout: timeout });
  }
);

Cypress.Commands.add("login", (userName: string, email: string) => {
  cy.getByData("login_button").should("exist").click();
  cy.getByData("username_input").should("exist").type("test-user");
  cy.getByData("email_input").should("exist").type("test@email.com");
  cy.getByData("login_submit").should("exist").click();
  cy.getByData("user_hello").should("exist").contains("Hello");
});

Cypress.Commands.add("logout", () => {
  cy.getByData("user_hello").should("exist").click();
  cy.getByData("logout_yes_button").should("exist").click();
  cy.wait(2000);
  cy.visit("/").wait(2000);
  cy.getByData("login_button").should("exist");
});
