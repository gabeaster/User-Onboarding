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
    });
});