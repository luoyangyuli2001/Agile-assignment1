import Spinner from "../../src/components/spinner"

describe('Spinner', () => {
  it('added correctly', () => {
    cy.mount(<Spinner />)
  });
})