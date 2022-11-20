let discoverMovies;
let movieId; // Enola Holmes movie id

describe("Navigation", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&sort_by=popularity.desc&include_adult=false&with_runtime.gte=0&with_runtime.lte=390&vote_average.gte=0&vote_average.lte=10&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        discoverMovies = response.results;
      });
  });
  beforeEach(() => {
    cy.visit("/");
  });

  describe("The site header", () => {
    it("navigates to discover movies page", () => {
      cy.get(".MuiButtonBase-root").eq(0).click();
      cy.get(".MuiPaper-root>li").eq(0).click();
      cy.url().should("not.include", "movies");
    })
    it("navigates to favorites movies page", () => {
      cy.get(".MuiButtonBase-root").eq(0).click();
      cy.get(".MuiPaper-root>li").eq(1).click();
      cy.url().should("include", "/movies/favorites");
    })
    it("navigates to upcoming moives page", () => {
      cy.get(".MuiButtonBase-root").eq(0).click();
      cy.get(".MuiPaper-root>li").eq(2).click();
      cy.url().should("include", "/movies/upcoming");
    })
    it("navigates to top rated movies page", () => {
      cy.get(".MuiButtonBase-root").eq(0).click();
      cy.get(".MuiPaper-root>li").eq(3).click();
      cy.url().should("include", "/movies/top-rated");
    })
    it("navigates to popular people page", () => {
      cy.get(".MuiButtonBase-root").eq(1).click();
      cy.get(".MuiPaper-root>li").eq(0).click();
      cy.url().should("include", "/person/popular");
    })
  });
});