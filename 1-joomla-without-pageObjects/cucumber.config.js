const {Before,After,BeforeAll,AfterAll, setDefaultTimeout} = require('@cucumber/cucumber');
const {chromium} = require('playwright');
const {expect} = require('@playwright/test');

global.expect = expect;
setDefaultTimeout(1000*1000);

BeforeAll(async function(){
  global.browser = await chromium.launch({
    slowMo: 100,
    headless: false,
    channel: "chrome"
  });
});

AfterAll(async function(){
  await global.browser.close();
});

Before(async function(){
  global.context = await global.browser.newContext();
  global.page = await global.context.newPage();
});

After(async function(){
  await global.page.goto('http://localhost/administrator/index.php?option=com_dropbox&view=dropboxes');
  const selectAllBtn = await global.page.locator("//input[@title='Check All Items']");
  await selectAllBtn.click();

  const deleteAllBtn = await global.page.locator("//div[@id='toolbar-delete']/button");
  await deleteAllBtn.click();
  
  await global.page.close();
  await global.context.close();
});