describe('Home Page', () => {
  it('loads successfully', () => {
    cy.visit('/')
    cy.get('#index-logo').should('be.visible')
    cy.contains('Freelance 3D Generalist').should('be.visible')
  })

  it('navigates to Works page', () => {
    cy.visit('/')
    cy.contains('Explore').click()
    cy.url().should('include', '/works')
    cy.get('.card').should('have.length.gt', 0)
  })
})
