const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;
var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use((req, res, next)=>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFile('server.log', log + '\n', (err) => {
    if(err) {console.log ('Unable to append to server.log') }
  });
  next();
});

// app.use((req, res, next)=>{
//   res.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));


hbs.registerHelper('getCurrentyear', ()=> {
  return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text) => {
  return text.toUpperCase()
});

app.get('/', (req, res) => {
  res.render('home.hbs', {
    pageTitle: 'This is the pahe to be',
    welcomeMessage: 'Yo yo hope u excited',
  });
});

app.get('/about',(req,res) =>{
  res.render('about.hbs', {
    pageTitle: 'Some awesome variable title',
  });
});

app.get('/projects',(req,res) =>{
  res.render('projects.hbs', {
    pageTitle: 'This is THE projects page',
    welcomeMessage: 'Yo see my projects'
  });
});

app.get('/bad',(req,res) =>{
  res.send({
    error: "this didn't work"
  });
});

app.listen(port, ()=> {console.log(`server is up and running on port ${port}`)});
