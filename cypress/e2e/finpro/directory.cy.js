import loginPage from '../../support/pageObjects/finpro/loginPage';
import directoryPage from '../../support/pageObjects/finpro/directoryPage';

describe('FINPRO - Directory Feature', () => {

  beforeEach(function () {
    cy.fixture('finproData').then((data) => {
      this.data = data;
    });
});

  beforeEach(function () {
    cy.intercept('POST', '**/auth/validate').as('loginReq');

    loginPage.visit();
    loginPage.inputUsername(this.data.validUser.username);
    loginPage.inputPassword(this.data.validUser.password);
    loginPage.clickLogin();

    cy.wait('@loginReq');
  });

  it('TC-Directory-001 - Masuk menu directory', () => {
    directoryPage.clickDirectory();
    cy.url().should('include', 'directory');
  });

  it('TC-Directory-002 - Search employee valid', () => {
    directoryPage.clickDirectory();

    cy.get('input[placeholder="Type for hints..."]').type('Rebecca');
    cy.contains('Rebecca Harmony').should('be.visible').click();

    directoryPage.clickSearch();

    cy.contains('Rebecca Harmony').should('exist');
  });

  it('TC-Directory-003 - Search kosong', () => {
    directoryPage.clickDirectory();
    directoryPage.clickSearch();

    cy.url().should('include', 'directory');
  });

  it('TC-Directory-004 - Klik profile employee', () => {
    directoryPage.clickDirectory();

    cy.get('input[placeholder="Type for hints..."]').type('Rebecca');
    cy.contains('Rebecca Harmony').should('be.visible').click();

    directoryPage.clickSearch();

    cy.contains('Rebecca Harmony').should('exist');
    cy.contains('Rebecca Harmony').should('be.visible').click({ force: true });

    cy.url().should('include', 'viewDirectory');
  });

});