describe('cart', () => {
  beforeEach(function () {
    cy.visit('http://localhost:3000/');
  });

  it('should add product to cart', function () {
    cy.get('#yfdv31sgjeikyyhdizq').click();
    cy.get('.number_of_cart').should('have.text', '1')
  });

  it('should add promotion to order', function() {
    cy.get('#yfdv31sgjeikyyhdizq').click();
    cy.get('.cart_link').click();
    cy.get('.promo_input').focus();
    cy.get('.promo_input').type('SECOND');
    cy.get('.add_promo_to_cart').click();
    cy.get('.result_price').should('have.text', 'Prix total de la commande: 316.41€');
  });

  it('should paid order', function() {
    // Iframe block cypress tests
  });
  it('cheking my orders', function() {
    cy.get('.signin_link').click();
    cy.get('.signin_email_input').focus();
    cy.get('.signin_email_input').type("regular@example.com");
    cy.get('.signin_pass_input').focus();
    cy.get('.signin_pass_input').type("password");
    cy.get('.signin_btn').click();
    cy.get('.account_link').click();
    cy.get('.get_my_orders').click();
    cy.get('.number_of_orders').should('have.text', 'Nombre d\'articles commandé: 2');
  });
})