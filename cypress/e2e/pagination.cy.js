let upcomingMovies;
let upcomingMoviesNextPage;
let upcomingMoviesFinalPage;

describe("Pagination tests", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&page=1`
    )
      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
        upcomingMovies = response.results;
      });
    cy.request(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&page=2`
    )
      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
        upcomingMoviesNextPage = response.results;
      });
    cy.request(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&include_adult=false&page=30`
    )
      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
        upcomingMoviesFinalPage = response.results;
      });
  });

  describe("Pagination for upcoming movies page", () => {
    beforeEach(() => {
      cy.visit("/movies/upcoming");
    });

    it("displays 20 movies and the pagination panel", () => {
      cy.get(".MuiCardHeader-content").should("have.length", 20);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(upcomingMovies[index].title);
      });
      cy.get(".MuiPagination-root>ul>li").should("have.length", 9)
    });

    it("displays correct 20 movies on another page", () => {
      cy.get(".MuiPagination-root>ul>li").eq(2).click();
      cy.get(".MuiCardHeader-content").should("have.length", 20);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(upcomingMoviesNextPage[index].title);
      });
    });

    it("displays correct 20 movies on last page", () => {
      cy.get(".MuiPagination-root>ul>li").eq(7).click();
      cy.get(".MuiCardHeader-content").should("have.length", upcomingMoviesFinalPage.length);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(upcomingMoviesFinalPage[index].title);
      });
    });
  })

});