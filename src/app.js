const path = require('path');
const express = require('express');
const raw_https = require('./raw-https.js');
const raw_http = require('./raw-http.js');

const app = express();

//console.log(__dirname);
//console.log(path.join(__dirname, '../public'));

//define path for express config
const publicDirPath = path.join(__dirname, './public');
const templatesDirPath = path.join(__dirname, './templates');

// setup handlebars engine & views path
app.set('view engine', 'hbs');
//app.set('views', templatesDirPath);

//setup static directory for express to serve
app.use(express.static(publicDirPath));


// app.com
app.get('', (req, res) => {
    const search = req.query.search;
    raw_https(search, (data) => {
        //res.send('<h1>' + data.place_name + '</h1></br>' + 'Longitude : ' + data.longitude + '</br>Latitude : ' + data.latitude);
        
        raw_http(data.longitude, data.latitude, (weatherData) => {
            res.render('index', {
                place_name: data.place_name,
                longitude: data.longitude,
                latitude: data.latitude,
                currentTemp: weatherData.current.temperature,
                weatherDesc: weatherData.current.weather_descriptions[0]
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
    res.send('<h3>The site created by Zulhisham Tan @019-2820574.</h3>');
})

app.listen(3000, () => {
    console.log('web server is up on port 3000');
});