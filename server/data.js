const cheerio = require('cheerio'),
      request = require('request-promise'); 

const getData = async (tags = []) => {

    const info = {},
          articles = [];
          
    let tagsSearch = ['javascript', 'nodejs', 'reactjs'];   //tags preloaded

    try {
        
        const $ = await request({
            uri: 'https://www.freecodecamp.org/news/',
            transform: body => cheerio.load(body)
        });
        
        if(tags.length > 0){
            tagsSearch = tags.slice();
        }

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
                article["link"] = `https://www.freecodecamp.org${link}`;
                article["time"] = time;
                      
                articles.push(article);
            }

        });

        info["tags"] = tagsSearch;
        info["articles"] = articles;
        
    }catch (e) {
       console.log(e);
       info["error"] = e.name; 
    
    } finally {

        return info;

    }

}

module.exports = {getData};

