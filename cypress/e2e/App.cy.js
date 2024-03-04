describe("Test App", () => {
  it("launches", () => {
    cy.visit("/");
  });

  it("Have `Gift` in Title", () => {
    cy.visit("/");
    cy.get("[data-cy=title]").should("contain", "GIFT");
  });

  it('shows Login prompt when click SignUp Now', () => {
    cy.visit("/");
    cy.get('.sign-up').click();
    cy.get("[data-cy=signup]").should("contain", "Login");
  });
});
