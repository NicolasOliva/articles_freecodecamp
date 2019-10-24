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
        info
      });
    })
    .catch(err => {
      res.render('home',{
        info: 'error'
      })
    })

})

app.listen(3000,() => {
  console.log('run app on port 3000');
});






