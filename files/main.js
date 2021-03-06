"use strict";

const puppeteer = require("puppeteer");

// main処理
(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium-browser",
  });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  const url = "https://www.google.com";
  await page.goto(url, { waitUntil: "networkidle0" });

  const datetime = new Date();
  const datetimeFormatted = formatDate(datetime, "yyyy-MM-dd-HH-mm-ss-SSS");

  await page.screenshot({
    path: `caps/${datetimeFormatted}.png`,
    fullPage: true,
  });

  await browser.close();

})();

// date: 日付オブジェクト
// format: 書式フォーマット
function formatDate(date, format) {
  format = format.replace(/yyyy/g, date.getFullYear());
  format = format.replace(/MM/g, ("0" + (date.getMonth() + 1)).slice(-2));
  format = format.replace(/dd/g, ("0" + date.getDate()).slice(-2));
  format = format.replace(/HH/g, ("0" + date.getHours()).slice(-2));
  format = format.replace(/mm/g, ("0" + date.getMinutes()).slice(-2));
  format = format.replace(/ss/g, ("0" + date.getSeconds()).slice(-2));
  format = format.replace(/SSS/g, ("00" + date.getMilliseconds()).slice(-3));
  return format;
}
