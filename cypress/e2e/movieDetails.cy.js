let movies;
let movie;
let movieReviews;

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

  describe("Reviews on the movie details page", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/movie/
        ${movies[1].id}
        /reviews?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((reviews) => {
          movieReviews = reviews.results;
        });
    });

    it(" display the review author and excerpt", () => {
      cy.visit(`/movies/${movies[1].id}`);
      cy.get("h3");
      cy.get("button").contains("Reviews").click();
      const authorList = movieReviews.map(a => a.author);
      const excerptList = movieReviews.map(c => c.content);
      cy.get("tbody>tr").each(($review, index) => {
        cy.wrap($review).get("th").contains(authorList[index]);
        cy.wrap($review).contains(excerptList[index].substring(0,10));
      });
    });

    it("a situation that doesn't have any reviews", () => {
      cy.visit(`/movies/1051170`);
      cy.get("h3");
      cy.get("button").contains("Reviews").click();
      cy.get("tbody>tr").should("have.length", 0);
    });
  })

  describe("Review on movie's full review page", () => {
    beforeEach(() => {
      cy.visit(`/movies/${movies[1].id}`);
      cy.get("h3");
      cy.get("button").contains("Reviews").click();
      cy.get("td>a").contains("Full Review").eq(0).click();
    });

    it("displays the name of the author", () => {
      const author = movieReviews[0].author;
      cy.get("p").eq(0).contains(author);
    });

    it("displays the content of the review", () => {
      const excerpt = movieReviews[0].content;
      cy.get("p").eq(1).contains(excerpt.substring(0,10));
    });
  });

})