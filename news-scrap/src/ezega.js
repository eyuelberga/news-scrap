const puppeteer = require('puppeteer');
const axios = require('axios');
let newsSiteUrl = 'https://www.ezega.com/News/News/1/Ethiopia';
(async () => {
    const browser = await puppeteer.launch({executablePath: '/usr/bin/google-chrome-stable'});
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    console.log("ezega page loading...");
    await page.goto(newsSiteUrl,{waitUntil: 'load', timeout: 0});
    console.log("page loaded");

    // get news details
    let newsData = await page.evaluate(() => {
      
        let news = [];
        //get the news elements
        let newsElms = document.querySelectorAll('#WebPortalMain_gvwNews > tbody > tr > td');
        //get the news data
        newsElms.forEach((newselement) => {
            let newsJson = {};
            try {
                newsJson.title = newselement.querySelector('b').innerText;
                newsJson.content = newselement.querySelector('p').innerText;
                newsJson.image = newselement.querySelector('p > img').src;
            }
            catch (exception){

            }
           
            news.push(newsJson);
        });
        return news;
    });

    console.log('storing in database');
    newsData.forEach((newsJson) => {
        axios.post('http://[::1]:3000/news', newsJson)
                            .then((res) => {
                            console.log(`status: ${res.status}`);
                            })
                            .catch((error) => {
                            console.error(error);
                            })
    }

    );
})();
