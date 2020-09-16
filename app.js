const express = require('express');
const fs = require('fs');
const path = require('path');

const port = 80;

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


app.listen(port, ()=>{
    console.log(`the application started at port ${port}`);
})
