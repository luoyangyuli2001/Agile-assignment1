let discoverMovies;
let people;


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
    cy.request(
      `https://api.themoviedb.org/3/person/popular?api_key=${Cypress.env(
          "TMDB_KEY"
      )}&language=en-US&page=1`
    )
      .its("body")
      .then((response) => {
          people = response.results;
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
    it("navigates to login page", () => {
      cy.get(".MuiToolbar-root>.MuiButtonBase-root").click();
      cy.url().should("include", "/login");
    })
  });

  describe("From the movie card to a movie's details", () => {
    it("navigates to the movie details page and change browser URL", () => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/movies/${discoverMovies[0].id}`);
    });
  });

  describe("From the person card to a person's details", () => {
    it("navigates to the person details page and change browser URL", () => {
      cy.visit("/person/popular")
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
      cy.url().should("include", `/person/${people[0].id}`);
    })
  })

  describe("The forward/backward links", () => {
    beforeEach(() => {
      cy.get(".MuiCardActions-root").eq(0).contains("More Info").click();
    });
    it("navigates between the movies detail page and the Home page.", () => {
      cy.get("svg[data-testid='ArrowBackIcon'").click();
      cy.url().should("not.include", `/movies/${discoverMovies[0].id}`);
      cy.get("svg[data-testid='ArrowForwardIcon'").click();
      cy.url().should("include", `/movies/${discoverMovies[0].id}`);
    });
  });

});