describe("The login feature", () => {
  beforeEach(() => {
    cy.visit("/login");
  });
  it("displays the login feature in the homepage", () => {
    cy.get("main h1").contains("Sign in").should('be.visible');
    cy.get("#email").should('be.visible');
    cy.get("#password").should('be.visible');
  });

  it("alerts when entering the incorrect email", () => {
    cy.loginWithEmailAndPassword("123123123@gmail.com", "321323")
    cy.on("window:alert", (text) => {
      expect(text).to.contains("user");
    });
  });

  it("alerts when entering the incorrect password", () => {
    cy.loginWithEmailAndPassword("123456@gmail.com", "321321")
    cy.on('window:alert', (text) => {
      expect(text).to.contains("password");
    });
  });

  it("navigates to home page when entering correct email and password", () => {
    cy.loginWithEmailAndPassword("123456@gmail.com", "321323")
    cy.get("h6").contains("Welcome!");
    cy.get("h6").contains("123456@gmail.com");
    cy.url().should("not.include", "movies");
    cy.get(".MuiToolbar-root>.MuiButtonBase-root").click();
  });
});