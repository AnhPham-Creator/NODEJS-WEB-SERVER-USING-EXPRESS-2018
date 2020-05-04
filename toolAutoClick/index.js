// const express = require('express')
// const app = express()
// const port = 3000

// const puppeteer = require('puppeteer');

// (async () => {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();
//   await page.goto('https://example.com');
//   //await page.screenshot({path: 'example.png'});

//   await browser.close();
// })();
// //app.get('/', (req, res) => res.send('Hello World!'))


// app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({
    headless: false
  });
  const page = await browser.newPage();
  // Open page.
  await page.goto('https://freebitco.in');

  // save PDFs
  //await page.screenshot({path: 'example.png'});

  // Show login form.
  await page.waitForSelector('.login_menu_button');
  await page.click('.login_menu_button');

  // Focus input field.
  await page.waitForSelector('#login_form_btc_address');
  await page.focus('#login_form_btc_address');
  // fill input value
  await page.$eval('#login_form_btc_address', el => el.value = 'tuananh2010jro@gmail.com');

  // Type in query.
  // await page.type('tuananh', {delay: 200});

  await page.waitForSelector('#login_form_password');
  await page.focus('#login_form_password');
  // fill input value
  await page.$eval('#login_form_password', el => el.value = 'SKhLKX7xBSopbH27');

  await page.waitForSelector('#login_button');
  await page.click('#login_button');

   // Submit the form.
   const searchForm = await page.$('#search-form-top');
   await searchForm.evaluate(searchForm => searchForm.submit());
  //await browser.close();
})();