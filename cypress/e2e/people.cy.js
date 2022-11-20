let people;
let person;
let personMovies;

describe("People page tests", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env(
          "TMDB_KEY"
      )}&language=en-US&page=1`
    )
      .its("body")
      .then((response) => {
          people = response.results;
      });
  })

  describe("Popular people list", () => {
    beforeEach(() => {
      cy.visit("/person/popular")
    })

    it("displays 20 people", () => {
      cy.get(".MuiCardHeader-root").should("have.length", 20);
    });

    it("displays the correct people's names", () => {
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(people[index].name);
      });
    });
  })
})
