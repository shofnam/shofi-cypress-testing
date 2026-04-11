import loginPage from '../../support/pageObjects/finpro/loginPage';
import forgotPasswordPage from '../../support/pageObjects/finpro/forgotPasswordPage';

describe('FINPRO - Forgot Password Feature', () => {

  beforeEach(() => {
    loginPage.visit();
    forgotPasswordPage.clickForgotPassword();
    cy.fixture('finproData').as('data');
  });

  it('TC-Forgot Password-001 - Field username kosong', () => {
    forgotPasswordPage.clickReset();
    cy.contains('Required').should('exist');
  });

  it('TC-Forgot Password-002 - Reset password link berhasil terkirim ke email', () => {
    cy.intercept('POST', '**/auth/*').as('resetReq');

    forgotPasswordPage.inputUsername('Adminshofia');

    cy.get('button[type="submit"]').should('be.visible').click({ force: true });
    cy.wait('@resetReq').its('response.statusCode').should('be.oneOf', [200, 302]);
    cy.contains('Reset Password link sent').should('exist');
  });

});