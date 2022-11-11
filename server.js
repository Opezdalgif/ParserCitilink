const puppeteer = require('puppeteer');



START_SCRIPTS();

async function START_SCRIPTS() {

  const browser = await puppeteer.launch({
    headless: false,
    slowMo: 30, // замедляет работу браузера
    ignoreHTTPSErrors: true,
    args: [
      `--window-size=1920,1080`
    ],
    defaultViewport: {
      width: 1920,
      height: 1080
    }
  });


  const pageSearch = await browser.newPage();
  await pageSearch.setDefaultNavigationTimeout(0); 
  

  pageSearch.on('dialog', async dialog => {
    await dialog.dismiss();
  });

  const articul = [`53013MER`, `53013ERT` , `53013ERV`] 
  await pageSearch.waitForTimeout(1000);

  
    
    // if(city[0].indexOf('Оренбург') == -1) {
    //   await page.click('body > div > div.MainLayout.js--MainLayout.HeaderFixer > header > div.Container.Container_has-grid.MainHeader__inner.MainHeader__inner_top.js--MainHeader__inner_top > div.row-start-1.md-col4.xs-col3.col2.md-col-start-2.Main__max-width.MainHeader__info-block > div.MainHeader__city-block > div.MainHeader__city > button')
    //   await page.click('body > div > div.MainLayout.js--MainLayout.HeaderFixer > header > div.Container.Container_has-grid.MainHeader__inner.MainHeader__inner_bottom.js--MainHeader__inner_bottom > div.MainHeader__actions-block.md-col-start-2.row-start-1.md-col3.xs-col3.ml-col4 > div.MainHeader__search > div > div > form > div > div.SearchQuickResult__input-wrapper > div > label > input');
    //   await page.keyboard.sendCharacter('Оренбург');
    //   await page.click('body > div.MainWrapper > div.MainLayout.js--MainLayout.HeaderFixer > header > div.Container.Container_has-grid.MainHeader__inner.MainHeader__inner_top.js--MainHeader__inner_top > div.row-start-1.md-col4.xs-col3.col2.md-col-start-2.Main__max-width.MainHeader__info-block > div.MainHeader__city-block > div.MainHeader__cities-search-popup.Popup.js--MainHeader__cities-search-popup.Popup__fixed > div.MainHeader__cities-search-popup__inner.Popup__inner.js--MainHeader__cities-search-popup__inner.Popup__left.ps.Popup__substrate.Popup__show-popup > div.Popup__content.Popup__animation_left.MainHeader__cities-search-popup__popup-content.MainHeader__popup-content > div > div.CitiesSearch.js--CitiesSearch.ps.ps--active-y.CitiesSearch__activated > div.CitiesSearch__cities.js--CitiesSearch__cities > div:nth-child(1) > ul > li > a')
    // }
    for(let i = 0 ; i < articul.length; i++){

      await pageSearch.goto('https://www.citilink.ru/?action=changeCity&space=orn_cl:', {
       waitUntil: 'domcontentloaded',
       timeout: 0, 
      })
      let city = await pageSearch.evaluate(() => {
        return Array.from(document.querySelectorAll('body > div > div.MainLayout.js--MainLayout.HeaderFixer > header > div.Container.Container_has-grid.MainHeader__inner.MainHeader__inner_top.js--MainHeader__inner_top > div.row-start-1.md-col4.xs-col3.col2.md-col-start-2.Main__max-width.MainHeader__info-block > div.MainHeader__city-block > div.MainHeader__city > button').values()).map(el => el.textContent)
    
      })
      console.log(city[0])
      await pageSearch.waitForTimeout(1000); //
      await pageSearch.click('body > div > div.MainLayout.js--MainLayout.HeaderFixer > header > div.Container.Container_has-grid.MainHeader__inner.MainHeader__inner_bottom.js--MainHeader__inner_bottom > div.MainHeader__actions-block.md-col-start-2.row-start-1.md-col3.xs-col3.ml-col4 > div.MainHeader__search > div > div > form > div > div.SearchQuickResult__input-wrapper > div > label > input');
      await pageSearch.keyboard.sendCharacter(articul[i]);
      await pageSearch.waitForTimeout(1000)
      sleep(100)
      let productName = await pageSearch.evaluate(() => {
        return Array.from(document.querySelectorAll('.css-0.e3wizew0 > span').values()).map(el => el.textContent)
      })

      let hrefProperties = await pageSearch.evaluate(() => {
        return Array.from(document.querySelectorAll('.css-0.e1sdktbo0 > a[href]')).map(el => el.getAttribute('href'))
      })
      console.log(hrefProperties[0])
      
    let newHrefProperties = hrefProperties[0].replace(`/?text=${articul[i]}`, '/properties')
    
      console.log(newHrefProperties)
      console.log(productName[0])
      if(productName[0].indexOf(articul[i]) != -1) {
        let productPrice = await pageSearch.evaluate(() => {
          return Array.from(document.querySelectorAll('span.e1j9birj0.e106ikdt0.css-xh9ajp.e1gjr6xo0').values()).map(el => el.textContent)
        })
        const pageProperties = await browser.newPage()
        await pageProperties.goto(newHrefProperties)
        let productGabarit = await pageProperties.evaluate(async() => {
          let result = '';
          Array.from(document.querySelectorAll('.Specifications__row')).map(el => {
            const regex = /Габариты.*\s(\w+)/gms;
            if (el.textContent.includes('Габариты')) {
              result = el.querySelector('.Specifications__column_value').textContent;
            }
          })
          return result.trim();
        })                                          
        console.log(productPrice[0])
        console.log(productGabarit)
        
    }
  }
}
async function sleep(time) {
  return await new Promise(function (resolve) {
      setTimeout(() => {
          resolve()
      }, time)
  })

}
