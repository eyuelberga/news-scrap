const puppeteer = require('puppeteer');
const axios = require('axios');
let newsSiteUrl = 'https://borkena.com/ethiopian-news-3/';
(async () => {
    try{
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
            let newsElms = document.querySelectorAll('body > div > div > main > div > article.entry');
            // get the news data
            newsElms.forEach((newselement) => {
                let newsJson = {};
                try {
                    newsJson.title = newselement.querySelector('h2').innerText;
                    newsJson.content = newselement.querySelector('p:nth-child(4)').innerText;
                    newsJson.image = newselement.querySelector('a > img').src;
                    axios.post('http://[::1]:3000/news', newsJson)
                                .then((res) => {
                                console.log(`status: ${res.status}`);
                                })
                                .catch((error) => {
                                console.error(error);
                                })

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
        
        }
    catch(exception){
       
    }
    finally{
    }
}
)();
