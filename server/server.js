const express = require('express'),
      bodyParser = require('body-parser'),
      app = express();
  
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })); 

//folder static
app.use(express.static(process.cwd() + "/views"));
app.set('view engine', 'hbs');

 app.get('/', require('./routes'));
// app.get('/', (req,res) => {
//   console.log(process.cwd() + "/views");
// })
process.env.PORT = process.env.PORT || 3000;

app.listen(process.env.PORT   ,() => {
  console.log('run app on port' + process.env.PORT);
});






