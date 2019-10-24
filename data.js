const cheerio = require('cheerio'),
      request = require('request-promise'); 

const getData = async () => {
    
    try {
        
        const $ = await request({
            uri: 'https://www.freecodecamp.org/news/',
            transform: body => cheerio.load(body)
        });

        const articles = [],
              tagsSearch = ['javascript','nodejs', 'expressjs', 'react'];

        $('article').each((i,element) => {
            
            const tag = $(element).find('.post-card-tags a').text().trim().substr(1).toLowerCase();
            
            if(tagsSearch.includes(tag)){ //search only tags that matter to me. If is true...
                const title = $(element).find('.post-card-title a').text().trim(),
                      link = $(element).find('.post-card-title a').attr('href'),
                      time = $(element).find('.post-card-meta time').text(),
                      article = {};
                
                article["indice"] = i; 
                article["tag"] = tag;
                article["title"] = title;
                article["link"] = link;
                article["time"] = time;
                      
                articles.push(article);
            }

        });

        return articles;

    }catch (e) {
        console.log(e);
    }

}

module.exports = {getData};

