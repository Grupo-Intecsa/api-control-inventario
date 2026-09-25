const puppeteer = require("puppeteer");
const multer = require('multer')


const storage = multer.diskStorage({
  storage: multer.memoryStorage(),
})

async function snapShotService (url) {

  if (!url || !url.startsWith('https')) {
    return ""
  }

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--unhandled-rejections=strict'],
    headless: true
  })
  
  const page = await browser.newPage();
  await page.goto(url);    
  const response = await Promise.resolve(page.screenshot({ encoding: "base64", fullPage: true }))  
  await browser.close();

  return response

}

module.exports = { snapShotService }