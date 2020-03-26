describe("Testing inputs and submit for form", function() {
    beforeEach(function() {
        cy.visit("http://localhost:3000/");
    });
    it("Completes form and submits", function() {
        cy
            .get('input[name="name"]')
            .type("name")
            .should("have.value", "name");
        cy
            .get('input[name="email"]')
            .type("email@email.com")
            .should("have.value", "email@email.com");
        cy  
            .get('input[name="password"]')
            .type('password')
            .should("have.value", "password");
        cy  
            .get('[type="checkbox"]')
            .check()
            .should('be.checked');
        cy  
            .get('button')
            .click();
    });
    it('displays errors on submit', function () {
        // incorrect username on purpose
        
        cy.get('input[name=email]').type('email@email')

        // we should have visible errors now
        cy.get('p.error')
        .should('be.visible')
    });

    
});