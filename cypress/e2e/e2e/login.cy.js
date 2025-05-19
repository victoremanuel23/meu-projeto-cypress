describe('Login baseado nos dados de cadastro', () => {
  const timestamp = Date.now();
  const email = `vitorqa@gmail.com`; // template string correta
  const senha = 'SenhaForte123';

  it('Deve fazer login com sucesso usando o usuário criado', () => {
    // Aqui precisa ter feito cadastro antes com o mesmo email e senha
    cy.visit('https://automationexercise.com');
    cy.contains('Signup / Login').should('be.visible').click();

    cy.get('input[data-qa="login-email"]').should('be.visible').type(email);
    cy.get('input[data-qa="login-password"]').should('be.visible').type(senha);

    cy.get('button[data-qa="login-button"]').should('be.enabled').click();

    cy.contains('Logged in as Vitor QA').should('be.visible');
  });
});
