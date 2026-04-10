class LoginPage {

  visit() {
    cy.visit('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
  }

  inputUsername(username) {
    if (username) {
      cy.get('input[name="username"]').type(username).should('have.value', username);
    }
  }

  inputPassword(password) {
    if (password) {
      cy.get('input[name="password"]').type(password).should('have.value', password);
    }
  }

  clickLogin() {
    cy.get('button[type="submit"]')
      .should('be.visible')
      .and('not.be.disabled')
      .click();
  }

  verifyDashboard() {
    cy.url().should('include', '/dashboard');
  }

  verifyInvalidCredentials() {
    cy.get('.oxd-alert-content-text')
      .should('be.visible')
      .and('contain', 'Invalid credentials');
  }

  verifyRequiredMessage() {
    cy.get('.oxd-input-field-error-message')
      .should('be.visible')
      .and('contain', 'Required');
  }

  verifyMultipleRequired() {
    cy.get('.oxd-input-field-error-message')
      .should('have.length.at.least', 1);
  }
}

export default LoginPage;