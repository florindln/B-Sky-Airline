describe('Cypress', () => {
    
    beforeEach(() => {
        cy.visit('/')
      })

      it('searchFlightOrigin',()=>{
        const origin="a"

        const flightOriginDest="http://localhost:3000/flights/a"
        cy.get('[placeholder="Flight Origin"]').type(origin).should('have.value',origin)
        cy.get('.formCapsule > .btn').click()
        cy.url().should('eq',flightOriginDest)
        
    })

    it('searchFlightOriginDestination',()=>{
        const origin="a"
        const destination="b"
        const flightOriginDest="http://localhost:3000/flights/a/b"
        cy.get('[placeholder="Flight Origin"]').type(origin).should('have.value',origin)
        cy.get('[placeholder="Flight Destination"]').type(destination).should("have.value",destination)
        cy.get('.formCapsule > .btn').click()
        cy.url().should('eq',flightOriginDest)
        
    })

    it('searchFlightFields',()=>{
        const origin="a"
        const destination="b"
        const date="2021-01-01"
        const flightfields="http://localhost:3000/flights/a/b/2021-01-01"
        cy.get('[placeholder="Flight Origin"]').type(origin).should('have.value',origin)
        cy.get('[placeholder="Flight Destination"]').type(destination).should("have.value",destination)
        cy.get('#example-date-input').type(date).should("have.value",date)
        cy.get('.formCapsule > .btn').click()
        cy.url().should('eq',flightfields)
        
    })
    

  })