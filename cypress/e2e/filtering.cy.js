import { filterByGenre, filterByTitle } from "../support/e2e";
let movies;
let sortedMovies;
let runtimeMovies;
let scoreMovies;
describe("Filtering", () => {
  before(() => {
    cy.request(
      `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
        "TMDB_KEY"
      )}&language=en-US&sort_by=popularity.desc&include_adult=false&with_runtime.gte=0&with_runtime.lte=390&vote_average.gte=0&vote_average.lte=10&include_video=false&page=1`
    )
      .its("body")
      .then((response) => {
        movies = response.results;
      });
  });

  beforeEach(() => {
    cy.visit("/");
  });

  describe("By movie title", () => {
    it("only display movies with 'm' in the title", () => {
      const searchString = "m";
      const matchingMovies = filterByTitle(movies, searchString);
      cy.get("#filled-search").clear().type(searchString); // Enter m in text box
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingMovies.length
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingMovies[index].title);
      });
    });
    it("handles case when there are no matches", () => {
      const searchString = "xyxxzyyzz";
      cy.get("#filled-search").clear().type(searchString); // Enter m in text box
      cy.get(".MuiCardHeader-content").should("have.length", 0);
    });
  });

  describe("By movie genre", () => {
    it("show movies with the selected genre", () => {
      const selectedGenreId = 35;
      const selectedGenreText = "Comedy";
      const matchingMovies = filterByGenre(movies, selectedGenreId);
      cy.get("#genre-select").click();
      cy.get("li").contains(selectedGenreText).click();
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingMovies.length
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingMovies[index].title);
      });
    });
  })

  describe("Combined genre and title", () => {
    it("show movies with 'b' in the title and selected genre", () => {
      const searchString = "b";
      const selectedGenreId = 35;
      const selectedGenreText = "Comedy";
      const matchingMovies = filterByTitle(
        filterByGenre(movies, selectedGenreId),
        searchString
      );
      cy.get("#filled-search").clear().type(searchString);
      cy.get("#genre-select").click();
      cy.get("li").contains(selectedGenreText).click();
      cy.get(".MuiCardHeader-content").should(
        "have.length",
        matchingMovies.length
      );
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(matchingMovies[index].title);
      });
    });

    it("handles case when there are no matches", () => {
      const searchString = "xyxxzyyzz";
      cy.get("#filled-search").clear().type(searchString); 
      cy.get(".MuiCardHeader-content").should("have.length", 0);
    });
  });

  describe("Sorting", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&sort_by=popularity.asc&include_adult=false&with_runtime.gte=0&with_runtime.lte=390&vote_average.gte=0&vote_average.lte=10&include_video=false&page=1`
      )
        .its("body")
        .then((response) => {
          sortedMovies = response.results;
        });
    })
    it("Sorting by popularity.asc", () => {
      cy.get(".MuiCardContent-root>.MuiFormControl-root").eq(2).click()
      cy.get(".MuiPaper-root>.MuiList-root>.MuiButtonBase-root").eq(1).click()
      cy.get("#filled-search").clear();
      cy.get(".MuiCardHeader-root").should("have.length", 20);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(sortedMovies[index].title);
      });
    })
  })

  describe("Runtime filter", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&sort_by=popularity.desc&include_adult=false&with_runtime.gte=60&with_runtime.lte=150&vote_average.gte=0&vote_average.lte=10&include_video=false&page=1`
      )
        .its("body")
        .then((response) => {
          runtimeMovies = response.results;
        });
    })
    it("show movies with runtime between 60mins and 150mins", () => {
      cy.get("span[data-index=4]").eq(0).click({force: true});
      cy.get("span[data-index=20]").eq(0).click({force: true});
      cy.get("span[data-index=13]").eq(0).click({force: true});
      cy.get("span[data-index=10]").eq(0).click({force: true});
      cy.get("#filled-search").clear()
      cy.get(".MuiCardHeader-root").should("have.length", 20);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(runtimeMovies[index].title);
      });
    })
  })

  describe("Score filter", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/discover/movie?api_key=${Cypress.env(
          "TMDB_KEY"
        )}&language=en-US&sort_by=popularity.desc&include_adult=false&with_runtime.gte=0&with_runtime.lte=390&vote_average.gte=3&vote_average.lte=7&include_video=false&page=1`
      )
        .its("body")
        .then((response) => {
          scoreMovies = response.results;
        });
    })
    it("show movies with score between 3 and 7", () => {
      cy.get("span[data-index=3]").eq(1).click({force: true});
      cy.get("span[data-index=7]").eq(1).click({force: true});
      cy.get("#filled-search").clear()
      cy.get(".MuiCardHeader-root").should("have.length", 20);
      cy.get(".MuiCardHeader-content").each(($card, index) => {
        cy.wrap($card).find("p").contains(scoreMovies[index].title);
      });
    })
  })
});