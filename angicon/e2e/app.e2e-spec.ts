import { AngiconPage } from './app.po';

describe('angicon App', () => {
  let page: AngiconPage;

  beforeEach(() => {
    page = new AngiconPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
