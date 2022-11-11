const puppeteer = require('puppeteer');

DnsScrapper();
async function DnsScrapper() {

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
    
        const articul = `9S7-14D334-1226`
        const dnsPage = await browser.newPage()
        await dnsPage.goto(`https://www.dns-shop.ru/search/?q=${articul}`)
        let price = await dnsPage.evaluate(() => {
            return Array.from(document.querySelectorAll('.product-buy__price').values()).map(el => el.textContent)
        })
        console.log(price[0])
        await dnsPage.click('.product-characteristics__footer > button')
        let gabarit = await dnsPage.evaluate(() => {
            return Array.from(document.querySelectorAll('.product-characteristics__spec ')).map(el => el.textContent)  
            //Array.from(document.querySelectorAll('.product-characteristics__spec-value').values()).map(el => el.textContent)
            
        })
        let photo = await dnsPage.evaluate(() =>{
            return Array.from(document.querySelectorAll('.product-images-slider__img[src]')).map(el => el.getAttribute('src'))
        })
        console.log(photo[0])
        console.log(gabarit)
    
}