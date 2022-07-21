const puppeteer = require('puppeteer');

let browser = null;
let page = null;

jest.setTimeout(1000000);

describe('App flow', () => {
  beforeAll(async () => {
    browser = await puppeteer.launch({
      headless: false,
      args: ['--lang=en-US,en'],
      slowMo: 50,
    });

    page = await browser.newPage();
    page.setDefaultNavigationTimeout(0);
    await page.setViewport({
      width: 1280,
      height: 800,
    });
  });

  beforeEach(async () => {
    await page.goto(process.env.URL);
  });

  it('Login with valid account', async () => {
    await page.waitForNetworkIdle();
    // Insert info
    await page.type('input[type="email"]', process.env.REGISTERED_EMAIL);
    await page.type('input[type="password"]', process.env.REGISTERED_PASSWORD);
    await page.keyboard.press('Enter');
    await page.waitForNetworkIdle();
    await page.waitForTimeout(1000);

    const texts = await page.$$eval('span', (item) =>
      item.map((p) => p.textContent)
    );
    expect(texts).toEqual(
      expect.arrayContaining([
        `Welcome ${process.env.REGISTERED_EMAIL}`,
      ])
    );
  });

  // it('Share a movie flow', async () => {
  //   await page.waitForNetworkIdle();
  //   // Insert info
  //   await page.waitForTimeout(500);
  //   await page.type('input[type="email"]', process.env.REGISTERED_EMAIL);
  //   await page.type('input[type="password"]', process.env.REGISTERED_PASSWORD);
  //   await page.keyboard.press('Enter');
  //   await page.waitForNetworkIdle();

  //   const [link] = await page.$x("//a[contains(., 'Share a movie')]");
  //   if (link) {
  //     await link.click();
  //   }
  //   await page.waitForNavigation({ waitUntil: 'load' });
  //   await page.waitForNetworkIdle();
  //   await page.waitForTimeout(1000);
  //   await page.type('input[name="url"]', process.env.YOUTUBE_URL);

  //   const [button] = await page.$x("//button[contains(., 'Share')]");
  //   if (button) {
  //     await button.click();
  //   }
  //   await page.waitForNetworkIdle();
  //   await page.waitForTimeout(1000);


  //   const texts = await page.$$eval('a', (item) =>
  //     item.map((p) => p.textContent)
  //   );

  //   expect(texts).toEqual(
  //     expect.arrayContaining([
  //       `Maroon 5 - Sugar (Official Music Video)`,
  //     ])
  //   );
  // });

  afterAll(() => browser.close());
});
