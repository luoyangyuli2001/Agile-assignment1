let upComingMovies;
let topRatedMovies;
let discoverMovies;
let movie;

describe("Base tests about movies lists", () => {
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
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env(
      "TMDB_KEY"
      )}&language=en-US&page=1`
    )
      .its("body")
      .then((response) => {
        topRatedMovies = response.results;
      });

    cy.request(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${Cypress.env(
      "TMDB_KEY"
      )}&include_adult=false&language=en-US&page=1`
    )
      .its("body")
      .then((response) => {
        upComingMovies = response.results;
      });
  });
  describe("Discover Movies List", () => {
    beforeEach(()=>{
      cy.visit("/")
    })

    it("displays the page header and 20 movies", () => {
      cy.get("h3").contains("Discover Movies");
      cy.get(".MuiCardHeader-root").should("have.length", 20);
    });

    it("displays the correct movie titles", () => {
      console.log(discoverMovies)
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(discoverMovies[index].title);
      });
    });
  });

  describe("Upcoming Movies List", () => {
    beforeEach(()=>{
      cy.visit("/movies/upcoming")
    })

    it("displays the page header and 20 movies", () => {
      cy.get("h3").contains("Upcoming Movies");
      cy.get(".MuiCardHeader-root").should("have.length", 20);
    });

    it("displays the correct movie titles", () => {
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(upComingMovies[index].title);
      });
    });
  });

  describe("Top Rated Movies List", () => {
    beforeEach(()=>{
      cy.visit("/movies/top-rated")
    })

    it("displays the page header and 20 movies", () => {
      cy.get("h3").contains("Top Rated Movies");
      cy.get(".MuiCardHeader-root").should("have.length", 20);
    });

    it("displays the correct movie titles", () => {
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(topRatedMovies[index].title);
      });
    });
  });

});