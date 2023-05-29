const testIDS = ["NXGFTIcBOvEgQ5OCx8A1", "WXGFTIcBOvEgQ5OCx8A2"];

describe("The Main UI Works As Expected", () => {
  before(() => {
    cy.visit("/adopt");
  });
  beforeEach(() => {
    cy.visit("/adopt");
    cy.getByData("username_input").should("exist").type("test-user");
    cy.getByData("email_input").should("exist").type("test@email.com");
    cy.getByData("login_submit").should("exist").click();
    cy.getByData("user_hello").should("exist").contains("Hello");
  });
  it("Renders the Filter Side Bar", () => {
    cy.getByData("filter_bar");
    cy.logout();
  });
  it("Renders the match me", () => {
    cy.getByData("match_button");
  });
  it("Has Pagination", () => {
    cy.getByData("previous_page").should("not.exist");
    cy.getByData("next_page").should("exist").click();
  });
});
