const request = require('request');
const constants = require('../config');

const weatherdata = (city , callback) =>{
    const url = constants.openweather.base_url + encodeURIComponent(city) + '&appid=' + constants.openweather.SECRET_KEY;
    console.log(url);
    request({url, json:true}, (error, {body}) =>{
        console.log(body);
        if(error){
            callback("Cant fetch the data", undefined)
        }
        else{
            callback(undefined, {
                temperature: body.main.temp,
                city_name : body.name,
                desc : body.weather[0].description


            })
        }
    });
}

module.exports = weatherdata;