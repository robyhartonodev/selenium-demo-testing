import { Builder, By, Key, until, WebDriver } from "selenium-webdriver";
import * as fs from 'fs';
import { log, error } from "console";

let driver: WebDriver;

beforeAll(async () => {
  driver = await new Builder().forBrowser('chrome').build();
});

afterAll(async () => {
  await driver.quit();
});

test('Google search', async () => {
  log("help123");
  await driver.get('https://www.google.com');

  const screenshot = await driver.takeScreenshot();
  fs.writeFileSync('screenshot.png', screenshot, 'base64');

  // Click accept all for the cookie consent
  const consentAcceptAllButtonDiv = await driver.wait(
    until.elementLocated(By.xpath("/html/body/div[2]/div[2]/div[3]/span/div/div/div/div[3]/div[1]/button[2]/div")),
    10000
  );
  await consentAcceptAllButtonDiv.click();

  // Find google search bar and type input
  let textarea = await driver.wait(
    until.elementLocated(By.css("textarea[name='q']")),
    10000
  );

  const searchInputText = "Hello, world!";

  // Mimic typing slowly to bypass robot detection
  for (let i = 0; i < searchInputText.length; i++) {
    await textarea.sendKeys(searchInputText[i]);

    const randomDelay = Math.floor(Math.random() * (200 - 50 + 1)) + 50;

    await driver.sleep(randomDelay);
  }

  await driver.sleep(150);
  await textarea.sendKeys(Key.RETURN);

  // Got blocked by google captcha, because google is too smart
  await driver.sleep(10000);
});
