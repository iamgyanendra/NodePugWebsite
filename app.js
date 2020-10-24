const express = require('express');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // body parser module for post throuh express 

mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true});

const port = 80;

// define mongoose schema
const contactSchema = new mongoose.Schema({

    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String,
  });

  const Contact = mongoose.model('Contact', contactSchema);//model

const app= express();

app.use('/static',express.static('static')) // for serving static file
app.use(express.urlencoded())

//pug
app.set('view engine', 'pug') // view engine pug
app.set('views', path.join(__dirname, 'views'))// setting views directory


//end points

app.get('/', (req, res)=>{

    const params={}
    res.status(200).render('home.pug',params);
})

app.get('/contact', (req, res)=>{

    const params={}
    res.status(200).render('contact.pug',params);
})
app.post('/contact', (req, res)=>{

    var myData = new Contact(req.body);
    myData.save().then(()=>{

        res.send("Data is saved into the database")
    }).catch(()=>{
        res.status(400).send("Data is not saved in the database")

    })
   // res.status(200).render('contact.pug',params);
})


app.listen(port, ()=>{
    console.log(`the application started at port ${port}`);
})
