const http = require('http');

const getWeather = (lon, lat, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=da7712b4053714565c391d9675125d79&query=' + lat + ',' + lon;

    const request = http.request(url, (response) => {
        let data = "";
        let objData = {};
       
        response.on('data', (chuck) => {
            data = data + chuck.toString();
        });
    
        response.on('end', () => {
            objData = JSON.parse(data);  
            callback(objData);
        });
    });
    
    request.on('error', (error) => {
        console.log('an error occured : ' + error);
    });
    
    request.end();
}

// getWeather(101.58, 3.32, (data) => {
//     console.log(data.current.weather_descriptions[0]);
// });


module.exports = getWeather;

