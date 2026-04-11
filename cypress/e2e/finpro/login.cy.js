import loginPage from '../../support/pageObjects/finpro/loginPage';

describe('FINPRO - Login Feature', () => {

  beforeEach(() => {
    loginPage.visit();
    cy.fixture('finproData').as('data');
  });

  it('TC-Login-001 - Berhasil login', function () {
    cy.intercept('POST', '**/auth/validate').as('loginReq');

    loginPage.inputUsername(this.data.validUser.username);
    loginPage.inputPassword(this.data.validUser.password);
    loginPage.clickLogin();

    cy.wait('@loginReq').its('response.statusCode').should('eq', 302);
  });

  it('TC-Login-002 - Username salah', function () {
    loginPage.inputUsername('WrongUser');
    loginPage.inputPassword(this.data.validUser.password);
    loginPage.clickLogin();

  cy.contains('Invalid credentials').should('be.visible');
});

  it('TC-Login-003 - Password salah', function () {
    loginPage.inputUsername(this.data.invalidUser.username);
    loginPage.inputPassword(this.data.invalidUser.password);
    loginPage.clickLogin();

    loginPage.errorMessage().should('be.visible');
  });

  it('TC-Login-004 - Field username kosong', function () {
    loginPage.inputPassword(this.data.validUser.password);
    loginPage.clickLogin();

    cy.contains('Required').should('exist');
  });

  it('TC-Login-005 - Field password kosong', function () {
    loginPage.inputUsername(this.data.validUser.username);
    loginPage.clickLogin();

    cy.contains('Required').should('exist');
  });

  it('TC-Login-006 - Semua field kosong', () => {
    loginPage.clickLogin();
    cy.contains('Required').should('exist');
  });

});