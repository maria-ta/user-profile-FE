import { browser, by, element, logging } from 'protractor';
import { LoginPage } from './login.po';

describe('Login Page', () => {
  const loginPage = new LoginPage();

  beforeEach(async () => {
    await loginPage.navigateToPage();
    await setTimeout(() => {}, 5000);
  });

  it('should have title', () => {
    const formTitle = element(by.tagName('mat-card-title'));

    formTitle.getText().then((title) => {
      expect(title).toEqual('Sign in');
    });
  });

  describe('enter data', () => {
    let usernameInput;
    let passwordInput;
    let submitButton;

    beforeEach(() => {
      usernameInput = element(by.id('username-input'));
      passwordInput = element(by.id('password-input'));
      submitButton = element(by.id('submit-button'));
    });

    it('should show error message if no username', async () => {
      await usernameInput.clear().sendKeys('');
      await passwordInput.clear().sendKeys('12345');
      await submitButton.click();

      const errorMessage = element(by.id('format-error-message'));

      errorMessage.getText().then((message) => {
        expect(message).toEqual('Please enter username and password');
      });
    });

    it('should show error message if no password', async () => {
      await usernameInput.clear().sendKeys('12345');
      await passwordInput.clear().sendKeys('');
      await submitButton.click();

      const errorMessage = element(by.id('format-error-message'));

      errorMessage.getText().then((message) => {
        expect(message).toEqual('Please enter username and password');
      });
    });
  });

  describe('submit wrong data', () => {
    const { username, password } = loginPage.dataConfig.wrong;

    let usernameInput;
    let passwordInput;
    let submitButton;

    beforeEach(() => {
      usernameInput = element(by.id('username-input'));
      passwordInput = element(by.id('password-input'));
      submitButton = element(by.id('submit-button'));
    });

    it('should show error message if wrong data were entered', async () => {
      await usernameInput.clear().sendKeys(username);
      await passwordInput.clear().sendKeys(password);
      await submitButton.click();

      await setTimeout(() => {}, 5000);

      const errorMessage = element(by.id('data-error-message'));

      errorMessage.getText().then((message) => {
        expect(message).toEqual('Username or password is wrong');
      });
    });
  });

  describe('submit correct data', () => {
    const { username, password } = loginPage.dataConfig.correct;

    let usernameInput;
    let passwordInput;
    let submitButton;

    beforeEach(() => {
      usernameInput = element(by.id('username-input'));
      passwordInput = element(by.id('password-input'));
      submitButton = element(by.id('submit-button'));
    });

    it('should navigate to profile page if correct data were entered', async () => {
      await usernameInput.clear().sendKeys(username);
      await passwordInput.clear().sendKeys(password);
      await submitButton.click();

      await setTimeout(() => {}, 5000);

      browser.getCurrentUrl().then((url) => {
        expect(url).toEqual(`${browser.baseUrl}profile`);
      });
    });
  });

  afterEach(async () => {
    // Assert that there are no errors emitted from the browser
    const logs = await browser.manage().logs().get(logging.Type.BROWSER);
    expect(logs).not.toContain(jasmine.objectContaining({
      level: logging.Level.SEVERE,
    } as logging.Entry));
  });
});
