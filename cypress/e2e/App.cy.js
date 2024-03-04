describe("Test App", () => {
  it("launches", () => {
    cy.visit("/");
  });

  it("Have `Gift` in Title", () => {
    cy.visit("/");
    cy.get("[data-cy=title]").should("contain", "GIFT");
  });

 
});
