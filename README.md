# 🧪 Automação E2E - Automation Exercise com Cypress

Este projeto contém uma suíte de testes end-to-end utilizando **Cypress**, focada no fluxo completo de cadastro, login, adição de produtos ao carrinho, finalização de compra e validação de login com dados inválidos, no site [Automation Exercise](https://automationexercise.com).

---

## 📂 Estrutura dos Testes

- **01 - Cadastro de Usuário**
  - Cria uma conta completa no site.
  - Valida que o login foi feito com sucesso após o cadastro.

- **02 - Login com Usuário Existente**
  - Realiza login com um usuário previamente cadastrado.
  - Verifica se o login foi bem-sucedido.

- **03 - Fluxo Completo de Compra**
  - Acessa o site com login.
  - Adiciona produto ao carrinho.
  - Realiza o checkout com informações de pagamento.
  - Finaliza o pedido com validação da mensagem de sucesso.

- **04 - Validação com Dados Inválidos**
  - Tenta logar com e-mail inexistente.
  - Tenta logar com senha em branco.
  - Tenta logar com e-mail mal formatado.
  - Valida as mensagens de erro apresentadas pelo sistema.

---

## 🚀 Tecnologias Utilizadas

- [Cypress](https://www.cypress.io/)
- JavaScript
- Node.js

---

## 🛠️ Como Executar Localmente

1. **Clone o repositório**
   ```bash
   git clone https://github.com/seu-usuario/nome-do-repositorio.git
   cd nome-do-repositorio
