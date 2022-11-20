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

  describe("Person details page", () => {
    before(() => {
      cy.request(
        `https://api.themoviedb.org/3/person/${
          people[1].id
        }?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((response) => {
            person = response;
            person.gender === 1 ? person.gender = "Female" : person.gender === 2 ? person.gender = "Male" : person.gender = "Other"
        });
      cy.request(
        `https://api.themoviedb.org/3/person/${
          people[1].id
        }/combined_credits?api_key=${Cypress.env("TMDB_KEY")}`
      )
        .its("body")
        .then((response) => {
            personMovies = response.cast.filter((movie) => movie.poster_path!==null && movie.title !== undefined);
            personMovies = JSON.parse( JSON.stringify( personMovies )).sort((a,b) => (a.release_date < b.release_date ? 1 : -1 ))
            .map((movie) => {
              return {
                id: movie.id,
                title: movie.title,
                year: movie.release_date,
                poster_path: movie.poster_path,
              }
            })
        });
    })

    beforeEach(() => {
      cy.visit(`/person/${people[1].id}`)
    })

    it(" displays the person's name, biography, Known for and acting", () => {
      cy.get("h2").contains(person.name);
      cy.get("h4").eq(2).contains("Biography")
      cy.get("h4").eq(2).next().contains(person.biography.substring(0,10))
    });

    it(" displays the person's known for and acting", () => {
      cy.get(".MuiGrid-grid-xs-9>.MuiTypography-h4").eq(1).contains("Known For")
      cy.get("a>.MuiImageListItem-root").should("have.length",personMovies.length);
      cy.get("a>.MuiImageListItem-root").each(($card, index) => {
        cy.wrap($card).find(".MuiImageListItemBar-title").contains(personMovies[index].title);
      });
      cy.get(".MuiPaper-root>li").should("have.length",personMovies.length);
      cy.get(".MuiPaper-root>li").each(($line, index) => {
        cy.wrap($line).find(".MuiTypography-root").contains(personMovies[index].title);
      }); 
    })

    it(" displays personal info", () => {
      const credits = Math.round(person.popularity)
      const attributesName = ["Known For", "Known Credit", "Gender", "Birthday", "Place of Birth", "Also Known As"];
      const personAttributes = [person.known_for_department, credits, 
        person.gender, person.birthday, person.place_of_birth, person.also_known_as[0]]
      cy.get(".MuiGrid-grid-xs-3>.MuiBox-root>.MuiTypography-h4").contains("Personal Info")
      cy.get(".css-q244e7-MuiTypography-root").each(($line, index) => {
        cy.wrap($line).contains(attributesName[index])
        cy.wrap($line).next().contains(personAttributes[index])
      })
      cy.get(".css-ahj2mt-MuiTypography-root").each(($name,index) => {
        cy.wrap($name).contains(person.also_known_as[index])
      })
    })

    it(" from Known_For list to the person's movie details page", () => {
      cy.get("a>.MuiImageListItem-root").eq(0).click()
      cy.url().should("include", `/movies/${personMovies[0].id}`);
    })

    it(" from acting list to the person's movie details page", () => {
      cy.get(".MuiPaper-root>li").eq(0).click()
      cy.url().should("include", `/movies/${personMovies[0].id}`);
    })
  })
})
