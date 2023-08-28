const express = require('express');
const mongoose = require('mongoose');
const homeRoute = require('./routes/home');
//const Keys = require('.config/keys');
//const club = require('..models/club');
const bodyParser = require('body-parser');
const { body } = require('express-validator');


const app = express()
const port=3000  


mongoose.connect('mongodb://127.0.0.1:27017/book_shelf', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to database successfully');
}).catch((error) => {
  console.error('Failed to connect to database:', error);
});


app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())



app.use('/', homeRoute);

app.listen(port, ()=> console.log(`Example app listening on port  ${port}` ));

