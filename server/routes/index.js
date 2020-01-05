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

router.post('/', (req,res) => {
    console.log(req.body.tags);
    res.render('home');
});

module.exports = router;