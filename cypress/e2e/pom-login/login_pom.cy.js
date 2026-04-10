import LoginPage from '../../support/pageObjects/loginPage';
import data from '../../fixtures/loginData.json';

describe('Scenario Verifikasi Fungsi Login OrangeHRM - POM', () => {

  const loginPage = new LoginPage();

  beforeEach(() => {
    loginPage.visit();
  });

  it('TC-Login-001 - Pengguna berhasil login dengan akun valid', () => {
    loginPage.inputUsername(data.validUser.username);
    loginPage.inputPassword(data.validUser.password);
    loginPage.clickLogin();
    loginPage.verifyDashboard();
  });

  it('TC-Login-002 - Sistem menolak login dengan password salah', () => {
    loginPage.inputUsername(data.wrongPassword.username);
    loginPage.inputPassword(data.wrongPassword.password);
    loginPage.clickLogin();
    loginPage.verifyInvalidCredentials();
  });

  it('TC-Login-003 - Sistem menolak login dengan username salah', () => {
    loginPage.inputUsername(data.wrongUsername.username);
    loginPage.inputPassword(data.wrongUsername.password);
    loginPage.clickLogin();
    loginPage.verifyInvalidCredentials();
  });

  it('TC-Login-004 - Validasi field username kosong', () => {
    loginPage.inputPassword(data.validUser.password);
    loginPage.clickLogin();
    loginPage.verifyRequiredMessage();
  });

  it('TC-Login-005 - Validasi field password kosong', () => {
    loginPage.inputUsername(data.validUser.username);
    loginPage.clickLogin();
    loginPage.verifyRequiredMessage();
  });

  it('TC-Login-006 - Validasi kedua field kosong', () => {
    loginPage.clickLogin();
    loginPage.verifyMultipleRequired();
  });

  it('TC-Login-007 - Verifikasi tombol login berfungsi', () => {
    loginPage.inputUsername(data.validUser.username);
    loginPage.inputPassword(data.validUser.password);
    loginPage.clickLogin();
    loginPage.verifyDashboard();
  });

});