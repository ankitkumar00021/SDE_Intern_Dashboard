describe('Favorites flow', () => {
  it('saves an article and shows it in Favorites', () => {
    cy.visit('/')
    cy.contains('News 1').parents('div').within(() => {
      cy.contains('Save').click()
    })
    cy.get('nav').contains('Favorites').click()
    cy.contains('News 1').should('exist')
  })
})