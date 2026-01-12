describe('Search flow', () => {
  it('searches and updates feed results', () => {
    cy.visit('/')
    cy.get('input[placeholder="Search news, movies, posts..."]').type('News 2')
    // allow debounce
    cy.wait(600)
    cy.contains('News 2').should('exist')
  })
})