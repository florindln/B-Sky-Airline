describe('Cypress', () => {
    // it('is working', () => {
    //   expect(true).to.equal(true)
    // })
    beforeEach(() => {
        cy.visit('/')
      })

    it('visit the app',()=>{
        cy.visit('/')
    })

    it('login',()=>{
        const user="a@a.com"
        const password="a"
        const profileUrl="http://localhost:3000/profile"
        cy.visit('/login')
        cy.get("[cy-test=usr]").type(user).should('have.value',user)
        cy.get("[cy-test=pswrd]").type(password).should("have.value",password)
        cy.get(':nth-child(1) > form > .btn').click()
        cy.url().should('eq',profileUrl)
        
    })

  })