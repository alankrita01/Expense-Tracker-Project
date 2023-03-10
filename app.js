const path = require('path');
const express = require('express');

const bodyParser = require('body-parser');
const sequelize = require('./util/database');
const router = require('./routes/expenseRouter');

var cors = require('cors');

const app=express();

app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/',async (req,res,next) => {
  res.sendFile(__dirname+'/public/form.html');
});

app.use(express.static('public'));

app.use('/expense', router);

sequelize.sync({alter: true})
.then(result => {
  app.listen(3000, () => {
    console.log('server started');
  })
})
.catch(err => console.log(err));