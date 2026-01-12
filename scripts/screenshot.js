const puppeteer = require('puppeteer')
const fs = require('fs')

;(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox','--disable-setuid-sandbox'] })
  const page = await browser.newPage()
  await page.goto('http://localhost:3000', { waitUntil: 'networkidle2', timeout: 30000 })
  await page.setViewport({ width: 1280, height: 800 })
  await page.screenshot({ path: 'screenshots/home.png', fullPage: true })
  await browser.close()
  console.log('Screenshot saved to screenshots/home.png')
})().catch(err => {
  console.error(err)
  process.exit(1)
})