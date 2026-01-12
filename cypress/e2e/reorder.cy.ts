describe('Reorder flow', () => {
  it('moves second article to first using move up button', () => {
    cy.visit('/')
    cy.contains('News 2').should('exist')
    // find the News 2 move up button and click it
    cy.contains('News 2').parent().within(() => {
      cy.get('button[aria-label^="Move News 2 up"]').click()
    })
    // check order
    cy.get('h3').then($h => {
      const texts = Cypress._.map($h, 'innerText')
      expect(texts.indexOf('News 2')).to.be.lessThan(texts.indexOf('News 1'))
    })
  })
})