describe('Cadastro rápido - AutomationExercise', () => {
  it('Cria conta e valida login sem delays', () => {
    const timestamp = Date.now();
    const email = `vitorqa@gmail.com`;
    const senha = 'SenhaForte123';

    cy.visit('https://automationexercise.com');

    cy.contains('Signup / Login').click();

    cy.get('input[data-qa="signup-name"]').type('Vitor QA');
    cy.get('input[data-qa="signup-email"]').type(email);
    cy.get('button[data-qa="signup-button"]').click();

    cy.get('#id_gender1').click();
    cy.get('#password').type(senha);
    cy.get('#days').select('5');
    cy.get('#months').select('March');
    cy.get('#years').select('2000');

    cy.get('#first_name').type('Vitor');
    cy.get('#last_name').type('Ferreira');
    cy.get('#address1').type('Rua dos Testes, 123');
    cy.get('#country').select('Canada');
    cy.get('#state').type('São Paulo');
    cy.get('#city').type('Campinas');
    cy.get('#zipcode').type('13000-000');
    cy.get('#mobile_number').type('11999999999');

    cy.get('button[data-qa="create-account"]').click({ force: true });

    // Clique direto no continue, sem esperar texto
    cy.get('a[data-qa="continue-button"]').click();

    // Verifica login
    cy.contains('Logged in as Vitor QA').should('be.visible');
  });
});
