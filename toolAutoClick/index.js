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
  await Promise.all([
    page.waitForSelector('#login_form_btc_address'),
    page.focus('#login_form_btc_address'),
    page.$eval('#login_form_btc_address', el => el.value = 'tuananh2010jro@gmail.com'),
  ]);

  // Type in query.
  // await page.type('tuananh', {delay: 200});

  await Promise.all([
    page.waitForSelector('#login_form_password'),
    page.focus('#login_form_password'),
    page.$eval('#login_form_password', el => el.value = 'SKhLKX7xBSopbH27'),
  ]);

   // Submit the form.
   await Promise.all([
      page.click('#login_button'),
      page.waitForNavigation({ waitUntil: 'networkidle0' }),
  ]);

  // await Promise.all([
  //    page.waitForSelector('#push_notification_modal'),
  //    page.click('#push_notification_modal')
  // ])

  //await page.click('#push_notification_modal');

  // await Promise.all([
  //    page.waitForSelector('#rc-anchor-container'),
  //    page.click('#rc-anchor-container'),
  //    page.waitForNavigation({ waitUntil: 'networkidle0' }),
  // ]);

  //await browser.close();
})();

// // it augments the installed puppeteer with plugin functionality
// const puppeteer = require('puppeteer-extra')
 
// // add recaptcha plugin and provide it your 2captcha token (= their apiKey)
// // 2captcha is the builtin solution provider but others would work as well.
// // Please note: You need to add funds to your 2captcha account for this to work
// const RecaptchaPlugin = require('puppeteer-extra-plugin-recaptcha')
// puppeteer.use(
//   RecaptchaPlugin({
//     provider: {
//       id: '2captcha',
//       token: '21e96a3f92c5a38143c6da3daa8649be' // REPLACE THIS WITH YOUR OWN 2CAPTCHA API KEY ⚡
//     },
//     visualFeedback: true // colorize reCAPTCHAs (violet = detected, green = solved)
//   })
// )
 
// // puppeteer usage as normal
// puppeteer.launch({ headless: false }).then(async browser => {
//   const page = await browser.newPage()
//   await page.goto('https://www.google.com/recaptcha/api2/demo')
 
//   // That's it, a single line of code to solve reCAPTCHAs
//   await page.solveRecaptchas()
 
//   await Promise.all([
//     page.waitForNavigation(),
//     page.click(`#recaptcha-demo-submit`)
//   ])
//   await page.screenshot({ path: 'response.png', fullPage: true })
//   await browser.close()
// })