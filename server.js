const express = require('express'),
      {getData} = require('./data.js'),
      app = express();

//folder static
app.use(express.static(process.cwd() + '/views'));
app.set('view engine', 'hbs');

app.get('/', (req,res) => {

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

process.env.PORT = process.env.PORT || 3000;

app.listen(process.env.PORT   ,() => {
  console.log('run app on port' + process.env.PORT);
});






