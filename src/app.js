const express = require('express');
const hbs = require('hbs');
const path = require('path');
const app = express();

const weatherdata = require('../utils/weatherdata');

const port = process.env.PORT || 3000;

const publicpath = path.join(__dirname, '../public'); //connecting all the files containing images html css with app

const viewspath = path.join(__dirname, '../templates/views');
const partialspath = path.join(__dirname, '../templates/partials');

app.set("views engine", "hbs");
app.set("views", viewspath);
hbs.registerPartials(partialspath);


app.use(express.static(publicpath));



app.get('/weather', (req, res) =>{
    const city = req.query.city;
    
    weatherdata(city, (error, {temperature, city_name, desc}) =>{
        if(error){
            res.send('Error')
            return
        }
        res.send({
            temperature,
            city_name,
            desc
        })
        console.log(temperature, city_name, desc)
    })

});


app.get("*", (req, res) =>{

    res.send("Page not found");
});

app.listen(port, () =>{
    console.log(`Listning to port : ${port} `);

});