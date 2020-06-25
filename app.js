const path = require('path');
const express = require('express');
const hbs = require('hbs');

const raw_https = require('./raw-https.js');
const raw_http = require('./raw-http.js');



const app = express();

//console.log(__dirname);
//console.log(path.join(__dirname, '../public'));

//define path for express config
const publicDirPath = path.join(__dirname, './public');
const partialsDirPath = path.join(__dirname, './views/partials');

// setup handlebars engine & views path
app.set('view engine', 'hbs');
//app.set('views', templatesDirPath);
hbs.registerPartials(partialsDirPath);

//setup static directory for express to serve
app.use(express.static(publicDirPath));


// app.com
app.get('', (req, res)=> {
    res.render('index');
});

app.get('/getcurrentweather', (req, res) => {
    const search = req.query.search;
    raw_https(search, (data) => {
        //res.send('<h1>' + data.place_name + '</h1></br>' + 'Longitude : ' + data.longitude + '</br>Latitude : ' + data.latitude);
        
        raw_http(data.longitude, data.latitude, (weatherData) => {
            res.render('getCurrentWeather', {
                place_name: data.place_name,
                longitude: data.longitude,
                latitude: data.latitude,
                currentTemp: weatherData.current.temperature,
                weatherDesc: weatherData.current.weather_descriptions[0],
                searchRequest: search
            });
        });
    });
});

// app.com/raw
app.get('/raw', (req, res) => {
    const search = req.query.search;
    raw_https(search, (data) => {
        res.send(data);
    });
});

app.get('/rawweather', (req, res) => {
    const search = req.query.search;
    raw_https(search, (data) => {
        raw_http(data.longitude, data.latitude, (weatherData) => {
            res.send(weatherData);
        });
    });
});

// app.com/help
app.get('/help', (req, res) => {
    res.render('help');
})

// app.com/about
app.get('/about', (req, res) => {
    //res.send('<h3>The site created by Zulhisham Tan @019-2820574.</h3>');
    res.render('about');
})

// 404 page
app.get('*', (req, res) => {
    res.render('error');
});

// app.listen(80, () => {
//     console.log('web server is up on port 3000');
// });

module.exports = app;