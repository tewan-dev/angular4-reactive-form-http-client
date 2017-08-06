import { TestHttpClientPage } from './app.po';

describe('test-http-client App', () => {
  let page: TestHttpClientPage;

  beforeEach(() => {
    page = new TestHttpClientPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
