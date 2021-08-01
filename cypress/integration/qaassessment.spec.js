describe('QA Assessment', () => {
  beforeEach(() => {
    cy.visit('http://localhost:8080/#/')
    cy.get('.new-todo')
      .type('hello')
      .type('{enter}')
      .type('world')
      .type('{enter}')
      .type('really though')
      .type('{enter}')
  })

  it('should have a UL with class of todo-list that has 3 children', () => {
    cy.get('.todo-list').children().should('have.length', 3)
  })

  context('with 2 checked tasks', () => {
    beforeEach(() => {
      cy.contains('world')
        .parent()
        .find('input[type=checkbox]')
        .check()

      cy.contains('really')
        .parent()
        .find('input[type=checkbox]')
        .check()
    })
    it('should have a Ul with a class of todo-list with 3 children in the base route', () => {
      cy.visit('http://localhost:8080/#/')  
      cy.get('.todo-list').children().should('have.length', 3)
      })
    it('should have a Ul with a class of todo-list with 2 children in the completed route', () => {
      cy.visit('http://localhost:8080/#/completed')  
      cy.get('.todo-list').children().should('have.length', 2)
      })
    it('should have a Ul with a class of todo-list with 1 children in the active route', () => {
      cy.visit('http://localhost:8080/#/active')  
      cy.get('.todo-list').children().should('have.length', 1)
    })
  })

  context('with 2 checked tasks and 1 active', () => {
    beforeEach(() => {
      cy.contains('world')
        .parent()
        .find('input[type=checkbox]')
        .check()

      cy.contains('really')
        .parent()
        .find('input[type=checkbox]')
        .check()

      cy.get("button.clear-completed")
        .click()
    })
    it('should have a Ul with class of class of todo-list with 1 child in the base route', () => {
      cy.visit('http://localhost:8080/#/')
      cy.get('.todo-list').children().should('have.length', 1)
    })
    it('should have a Ul with class of class of todo-list with 1 child in the active route', () => {
      cy.visit('http://localhost:8080/#/active')
      cy.get('.todo-list').children().should('have.length', 1)
    })
    it('should have a Ul with class of class of todo-list with 0 children in the active route', () => {
      cy.visit('http://localhost:8080/#/completed')
      cy.get('.todo-list').children().should('have.length', 0)
    })
  })
})

