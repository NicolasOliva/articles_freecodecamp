const {Router} = require('express'),
      {getData} = require('../data'),
      router = Router();
 
router.get('/', async (req, res) => {
  
  try {
  
    const data = await getData();
    
    if(data['error']){
      res.render('home',{
        error: data['error']
      });
    }else {
      res.render('home', {
        tags: data['tags'],
        articles: data['articles']  
      })
    }

  } catch (error) {
    
    console.log(error);
  
  }
  
}); 

router.post('/', async (req,res) => {
  
  const tags = req.body.tags.split(',').map(tag => tag.trim().toLowerCase());  //create array whit tags whitout space and lower case

  try {

    const data = await getData(tags);
    
    if(data['error']){
      res.render('home',{
        error: data['error']
      });
    }else {
      res.render('home', {
        tags: data['tags'],
        articles: data['articles']  
      })
    }

  } catch (error) {
    
    console.log(error);

  }

});

module.exports = router;