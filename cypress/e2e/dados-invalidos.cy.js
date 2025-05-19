describe('Stress Teste com Dados Inválidos e Ações Malucas', () => {
  const invalidEmail = 'email-invalido-sem-arroba';
  const invalidPassword = '123';
  const invalidName = '';
  const hugeQuantity = 99999;
  const invalidCardNumber = '1111222233334444';
  const invalidCVC = '12';

  beforeEach(() => {
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit('https://automationexercise.com');
  });

  it('Tenta cadastrar com dados inválidos repetidamente', () => {
    cy.contains('Signup / Login').click();

    cy.get('input[data-qa="signup-name"]').clear().type(invalidName);
    cy.get('input[data-qa="signup-email"]').clear().type(invalidEmail);
    cy.get('button[data-qa="signup-button"]').click();

    // Tenta criar conta mais de uma vez sem erro quebrar teste
    cy.get('body').then(($body) => {
      if ($body.text().includes('Email Address already exist!')) {
        cy.log('Email já existe - erro esperado encontrado');
      } else if ($body.text().includes('Invalid email address!')) {
        cy.log('Email inválido - erro esperado encontrado');
      } else {
        throw new Error('Mensagem de erro esperada não encontrada');
      }
    });
  });

  it('Tenta logar com email e senha inválidos várias vezes', () => {
    cy.contains('Signup / Login').click();

    cy.get('input[data-qa="login-email"]').clear().type(invalidEmail);
    cy.get('input[data-qa="login-password"]').clear().type(invalidPassword);

    // Clica no login várias vezes com espera curta
    for (let i = 0; i < 3; i++) {
      cy.get('button[data-qa="login-button"]').click();
      cy.wait(300);
    }

    // Verifica mensagem de erro
    cy.get('body', { timeout: 5000 }).should(($body) => {
      expect(
        $body.text().includes('Your email or password is incorrect!') ||
        $body.text().includes('Invalid email or password!')
      ).to.be.true;
    });
  });

  it('Tenta adicionar produto com quantidade absurda e finalizar compra inválida', () => {
    cy.contains('Products').click();

    cy.get('.product-image-wrapper').first()
      .should('be.visible')
      .trigger('mouseover');

    cy.get('.product-image-wrapper').first()
      .contains('Add to cart')
      .click({ force: true });

    cy.get('#cartModal').should('be.visible');
    cy.get('.modal-body > :nth-child(2) > a > u').click();

    // Atualiza quantidade para valor alto
    cy.get('input.cart_quantity_input')
      .clear()
      .type(hugeQuantity.toString());

    cy.contains('Update').click({ force: true });

    cy.contains('Proceed To Checkout').click();

    // Preenche dados inválidos do cartão
    cy.get('input[name="name_on_card"]').type('Teste Inválido');
    cy.get('input[name="card_number"]').type(invalidCardNumber);
    cy.get('input[name="cvc"]').type(invalidCVC);
    cy.get('input[name="expiry_month"]').type('13'); // inválido
    cy.get('input[name="expiry_year"]').type('1999'); // inválido

    cy.get('#submit').click();

    // Valida mensagem de erro para cartão
    cy.get('body', { timeout: 5000 }).then(($body) => {
      if ($body.text().includes('Your card number is incorrect') ||
          $body.text().includes('Invalid card number') ||
          $body.text().includes('Payment failed')) {
        cy.log('Erro esperado de cartão inválido encontrado');
      } else {
        throw new Error('Mensagem de erro de cartão inválido não encontrada');
      }
    });
  });
});
