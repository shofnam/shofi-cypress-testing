describe('Scenario Verifikasi Fungsi Login OrangeHRM', () => {

  const url = 'https://opensource-demo.orangehrmlive.com/web/index.php/auth/login';

  beforeEach(() => {
    // intercept dipasang di awal
    cy.intercept('**/auth/login**').as('loginRequest');

    cy.visit(url);
  });

  // TC-Login-001
  it('TC-Login-001 - Pengguna berhasil login dengan akun valid', () => {

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);
    cy.url().should('include', '/dashboard');
  });

  // TC-Login-002
  it('TC-Login-002 - Sistem menolak login dengan password salah', () => {

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('wrongpass');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

  // TC-Login-003
  it('TC-Login-003 - Sistem menolak login dengan username salah', () => {

    cy.get('input[name="username"]').type('WrongUser');
    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.wait('@loginRequest').its('response.statusCode').should('eq', 200);

    cy.get('.oxd-alert-content-text')
      .should('contain', 'Invalid credentials');
  });

  // TC-Login-004
  it('TC-Login-004 - Validasi field username kosong', () => {

    cy.get('input[name="password"]').type('admin123');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required');
  });

  // TC-Login-005
  it('TC-Login-005 - Validasi field password kosong', () => {

    cy.get('input[name="username"]').type('Admin');
    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should('contain', 'Required');
  });

  // TC-Login-006
  it('TC-Login-006 - Validasi kedua field kosong', () => {

    cy.get('button[type="submit"]').click();

    cy.get('.oxd-input-field-error-message')
      .should('have.length.at.least', 1);
  });

  // TC-Login-007
  it('TC-Login-007 - Verifikasi tombol login berfungsi', () => {

    cy.get('input[name="username"]').type('Admin');
    cy.get('input[name="password"]').type('admin123');

    cy.get('button[type="submit"]')
    .should('be.visible')
    .and('not.be.disabled')
    .click();

    cy.wait('@loginRequest').then((interception) => {
    // validasi response ada
    expect(interception.response).to.exist;

    // validasi status
    expect(interception.response.statusCode).to.eq(200);
  });

    cy.url().should('include', '/dashboard');
  });

});