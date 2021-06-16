describe('Cypress', () => {
    
    beforeEach(() => {
        cy.visit('/')
      })

      it('checkIfPlane1Exist',()=>{
        cy.visit('/airplanes')
        
        cy.get('img')
            .first().should('be.visible')
        
    })

    it('checkIf2PlanesExist',()=>{
        cy.visit('/airplanes')
        
        cy.get('img').eq(0).should('be.visible') 
        cy.get('img').eq(1).should('be.visible')
    })

    it('checkIf3PlanesDontExist',()=>{
        cy.visit('/airplanes')
        
        cy.get('img').eq(0).should('be.visible') 
        cy.get('img').eq(1).should('exist')
        cy.get('img').eq(2).should('not.exist')
    })


})