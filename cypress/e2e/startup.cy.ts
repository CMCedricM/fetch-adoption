describe("Run the basic tests", () => {
  beforeEach(() => {
    cy.visit("/");
  }),
    it("Has the Button to Navigate to the Main Page", () => {
      cy.getByData("lets_play_button").should("exist");
    });
  it("Has the login button", () => {
    cy.getByData("login_button").should("exist").click();
  });
  it("Allows Login From Landing page", () => {
    cy.login("test-user", "test@email.com");
  });
  it("Allows Logout From Landing Page", () => {
    cy.login("test-user", "test@email.com");
    cy.logout();
    cy.getByData("user_hello").should("not.exist");
  });
  it("Requires Login on Main page if not already logged in", () => {
    cy.visit("/adopt");
    cy.getByData("username_input").should("exist").type("test-user");
    cy.getByData("email_input").should("exist").type("test@email.com");
    cy.getByData("login_submit").should("exist").click();
    cy.getByData("user_hello").should("exist").contains("Hello");
  });
});
