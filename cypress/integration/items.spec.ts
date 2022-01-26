import mock from "../../item/mocks/default.json";

describe("Items", () => {
  it("debería mostrar todos los items", () => {
    cy.visit("/default");

    cy.get('[data-testid="item"]').should("have.length", mock.length);
  });
  it("muestra un mensaje cuando no hay items", () => {
    cy.visit("/empty");

    cy.get('[data-testid="item"]').should("have.length", 0);

    cy.contains("There are no products in the list");
  });
});
