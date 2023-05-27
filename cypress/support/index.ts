/// <reference types="cypress" />
export {};
declare global {
  namespace Cypress {
    interface Chainable {
      getByData(
        dataTestName: string,
        timeout?: number
      ): Chainable<JQuery<HTMLElement>>;
    }
  }
}
