import { Projekt#3Page } from './app.po';

describe('Projekt#3Page', function() {
  let page: Projekt#3Page;

  beforeEach(() => {
    page = new Projekt#3Page();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Application works!');
  });
});
