describe('Login, adicionar produto ao carrinho e finalizar compra', () => {
  const email = 'vitorqa@gmail.com'; // seu email cadastrado
  const senha = 'SenhaForte123';       // sua senha
  const nomeCompleto = 'Vitor Ferreira';

  it('Deve fazer login, adicionar produto, checkout e finalizar', () => {
    cy.visit('https://automationexercise.com');

    // Login
    cy.contains('Signup / Login').click();
    cy.get('input[data-qa="login-email"]').type(email);
    cy.get('input[data-qa="login-password"]').type(senha);
    cy.get('button[data-qa="login-button"]').click();

    cy.contains(`Logged in as Vitor QA`).should('be.visible');

    // Vai para Products
    cy.contains('Products').click();

    // Adiciona o primeiro produto ao carrinho
    cy.get('.product-image-wrapper').first().scrollIntoView().trigger('mouseover');
    cy.get('.product-image-wrapper').first()
      .contains('Add to cart')
      .click();

    // Modal do carrinho aparece
    cy.get('#cartModal').should('be.visible');

    // Clica em View Cart para ir ao carrinho
    cy.get('.modal-body > :nth-child(2) > a > u').click();

    // Valida produto no carrinho
    cy.get('.cart_info').should('contain.text', 'Blue Top');

    // Clica em Proceed To Checkout
    cy.get('.col-sm-6 > .btn').contains('Proceed To Checkout').click();

    // Preenche os dados do cartão
    cy.get('input[name="name_on_card"]').click().type(nomeCompleto);
    cy.get('input[name="card_number"]').click().type('4242424242424242');
    cy.get('input[name="cvc"]').click().type('123');
    cy.get('input[name="expiry_month"]').click().type('12');
    cy.get('input[name="expiry_year"]').click().type('2025');

    // Clica em Pay and Confirm Order
    cy.get('#submit').click();

    // Verifica a mensagem de sucesso
    cy.contains('Your order has been placed successfully!').should('be.visible');
  });
});
