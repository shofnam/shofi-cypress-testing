class ForgotPasswordPage {

  clickForgotPassword() {
    cy.contains('Forgot your password?').click();
  }

  inputUsername(username) {
    cy.get('input[name="username"]').clear().type(username);
  }

  clickReset() {
    cy.get('button[type="submit"]').click();
  }

}

export default new ForgotPasswordPage();