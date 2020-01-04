const {Router} = require('express'),
      {getData} = require('../data'),
      router = Router();
      
router.get('/', async (req, res) => {
   
    // res.render('home');
  getData()
    .then(info => {
      res.render('home', {
        tags: info["tags"],
        articles: info["articles"]
      });
    })
    .catch(err => {
      res.render('home',{
        info: 'error'
      })
    })
})

router.post('/tags', (req,res) => {
    console.log(req.body.tags);
    // res.render('home');
})

module.exports = router;