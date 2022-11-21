import CircularProgressWithLabel from "../../src/components/cardIcons/circularProgressWithLabel"

describe('Spinner', () => {
  it('added correctly', () => {
    cy.mount(<CircularProgressWithLabel value={70}/>).get(".MuiTypography-root").contains("70%")
  });
})