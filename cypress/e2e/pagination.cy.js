let upcomingMovies;
let upcomingMoviesNextPage;
let upcomingMoviesFinalPage;
let topRatedMovies;
let topRatedMoviesNextPage;
let topRatedMoviesFinalPage;
let discoverMovies;
let discoverMoviesTwoPages;
let discoverMoviesThreePages;

describe("Pagination tests", () => {
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
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&sort_by=popularity.desc&include_adult=false&with_runtime.gte=0&with_runtime.lte=390&vote_average.gte=0&vote_average.lte=10&include_video=false&page=2`
    )
      .its("body")
      .then((response) => {
        discoverMoviesTwoPages = [...discoverMovies, ...response.results];
      });
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&sort_by=popularity.desc&include_adult=false&with_runtime.gte=0&with_runtime.lte=390&vote_average.gte=0&vote_average.lte=10&include_video=false&page=3`
    )
      .its("body")
      .then((response) => {
        discoverMoviesThreePages = [...discoverMoviesTwoPages, ...response.results]
      });
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
    cy.request(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&page=1`
    )
      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
        topRatedMovies = response.results;
      });
    cy.request(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&page=2`
    )
      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
        topRatedMoviesNextPage = response.results;
      });
    cy.request(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&page=497`
    )
      .its("body") // Take the body of HTTP response from TMDB
      .then((response) => {
        topRatedMoviesFinalPage = response.results;
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

  describe("Pagination for top rated movies page", () => {
    beforeEach(() => {
      cy.visit("/movies/top-rated");
    });

    it("displays 20 movies and the pagination panel", () => {
      cy.get(".MuiCardHeader-content").should("have.length", 20);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(topRatedMovies[index].title);
      });
      cy.get(".MuiPagination-root>ul>li").should("have.length", 9)
    });

    it("displays correct 20 movies on another page", () => {
      cy.get(".MuiPagination-root>ul>li").eq(2).click();
      cy.get(".MuiCardHeader-content").should("have.length", 20);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(topRatedMoviesNextPage[index].title);
      });
    });

    it("displays correct 20 movies on last page", () => {
      cy.get(".MuiPagination-root>ul>li").eq(7).click();
      cy.get(".MuiCardHeader-content").should("have.length", topRatedMoviesFinalPage.length);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(topRatedMoviesFinalPage[index].title);
      });
    });
  });

  describe("Infinite Scroll on discover page", () => {
    beforeEach(() => {
      cy.visit("/");
    })

    it("displays more 20 movies when infinite scroll trigger once", () => {
      cy.window().scrollTo('bottom');
      cy.get(".MuiCardHeader-content").should("have.length", 40);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(discoverMoviesTwoPages[index].title);
      });
    })

    it("displays more movies when infinite scroll trigger more than once", () => {
      cy.window().scrollTo('bottom');
      cy.get(".MuiCardHeader-content").should("have.length", 40);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(discoverMoviesTwoPages[index].title);
      });
      cy.window().scrollTo('bottom');
      cy.get(".MuiCardHeader-content").should("have.length", 60);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(discoverMoviesThreePages[index].title);
      });
    })
  })
});