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
        const origin="Venlo"
        const destination="Rotterdam"
        const flightOriginDest="http://localhost:3000/flights/Venlo/Rotterdam"
        cy.get('[placeholder="Flight Origin"]').type(origin).should('have.value',origin)
        cy.get('[placeholder="Flight Destination"]').type(destination).should("have.value",destination)
        cy.get('.formCapsule > .btn').click()
        cy.url().should('eq',flightOriginDest)
        
    })

    it('searchFlightFields',()=>{
        const origin="Venlo"
        const destination="Rotterdam"
        const date="2023-08-19"
        const flightfields="http://localhost:3000/flights/Venlo/Rotterdam/2023-08-19"
        cy.get('[placeholder="Flight Origin"]').type(origin).should('have.value',origin)
        cy.get('[placeholder="Flight Destination"]').type(destination).should("have.value",destination)
        cy.get('#example-date-input').type(date).should("have.value",date)
        cy.get('.formCapsule > .btn').click()
        cy.url().should('eq',flightfields)
        
    })
    

  })