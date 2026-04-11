class LoginPage {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  inputUsername(username) {
    cy.get('input[name="username"]').clear().type(username);
  }

  inputPassword(password) {
    cy.get('input[name="password"]').clear().type(password);
  }

  clickLogin() {
    cy.get('button[type="submit"]').click();
  }

  errorMessage() {
    return cy.contains('Invalid credentials');
  }

}

export default new LoginPage();