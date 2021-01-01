import { browser, by, element } from 'protractor';

export class LoginPage {
  dataConfig = {
    correct: {
      username: 'username',
      password: '12345',
    },
    wrong: {
      username: 'username',
      password: 'password',
    }
  };

  async navigateToPage(): Promise<unknown> {
    return browser.get(`${browser.baseUrl}login`);
  }

  async getTitleText(): Promise<string> {
    return element(by.css('app-root .content span')).getText();
  }
}
