const puppeteer = require('puppeteer');
let newsSiteUrl = 'https://www.thereporterethiopia.com/news';
(async () => {
    const browser = await puppeteer.launch({executablePath: '/usr/bin/google-chrome-stable'});
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 926 });
    console.log("page loading...");
    await page.goto(newsSiteUrl,{waitUntil: 'load', timeout: 0});
    console.log("page loaded");

    // get news details
    let newsData = await page.evaluate(() => {
        let news = [];
        // get the news elements
        let newsElms = document.querySelectorAll('#block-gavias-kama-content > div > div > div > div > div > article');
        // get the news data
        newsElms.forEach((newselement) => {
            let newsJson = {};
            try {
                newsJson.title = newselement.querySelector('div > div.post-content > h3 > a').innerText;
                newsJson.content = newselement.querySelector('div > div.post-content > div.post-body > div').innerText;
                newsJson.image = newselement.querySelector('div > div.post-thumbnail.post-image.post-standard > div > a > img').src;

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
