const puppeteer = require("puppeteer");

jest.setTimeout(30000);

test("Adds two numbers", () => {
  const sum = 1 + 2;

  expect(sum).toEqual(3);
});

test("We can launch a browser", async () => {
  // const browser = await puppeteer.launch({
  //   headless: false,
  // });

  // const page = await browser.newPage();

  // await page.goto("http://localhost:3000");

  // const text = await page.$eval("p", (el) => el.innerHTML);

  // expect(text).toEqual("Annals");
});
