let movies;
let movie;

describe("Movie Details Test", () => {
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
  })

  describe("The movie details page", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/movie/${
          movies[1].id
        }?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((movieDetails) => {
          movie = movieDetails;
        });
    })
    beforeEach(() => {
      cy.visit(`/movies/${movies[1].id}`);
    });
    it(" displays the movie title, overview and genres", () => {
      cy.get("h3").contains(movie.title);
      cy.get("h3").contains("Overview");
      cy.get("h3").next().contains(movie.overview);
      cy.get("ul")
        .eq(1)
        .within(() => {
          const genreChipLabels = movie.genres.map((g) => g.name);
          genreChipLabels.unshift("Genres");
          cy.get("span").each(($card, index) => {
            cy.wrap($card).contains(genreChipLabels[index]);
          });
        });
    });

    it(" displays the movie runtime, revenue, votes, released date and production countries", () => {
      cy.get("ul")
        .eq(2)
        .within(() => {
          const votes = movie.vote_average + " (" + movie.vote_count;
          const movieAttributes = [movie.runtime, movie.revenue.toLocaleString(), 
            votes, movie.release_date];
          cy.get("span").each(($card,index) => {
            cy.wrap($card).contains(movieAttributes[index]);
          })
        });
      cy.get("ul")
        .eq(3)
        .within(() => {
          const productionCountries = movie.production_countries.map((p) => p.name);
          productionCountries.unshift("Production Countries");
          cy.get("span").each(($card, index) => {
            cy.wrap($card).contains(productionCountries[index]);
          });
        });
    });
  })
})