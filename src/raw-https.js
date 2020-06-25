const https = require('https');

const getCordinate = (placeName, callback) => {
    const geocodingUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(placeName) +'.json?limit=1&access_token=pk.eyJ1IjoiYXp6dWxoaXNoYW0iLCJhIjoiY2s5bjR1NDBqMDJqNDNubjdveXdiOGswYyJ9.SYlfXRzRtpbFoM2PHskvBg';

    const request = https.request(geocodingUrl, (response) => {
        let data = "";
        let objData = {};
        let longitude = 0;
        let latitude = 0;
        let place_name = '';
    
        response.on('data', (chuck) => {
            data = data + chuck.toString();
        });
    
        response.on('end', () => {
            objData = JSON.parse(data);
            longitude = objData.features[0].center[0];
            latitude = objData.features[0].center[1];
            place_name = objData.features[0].place_name;
    
            //console.log(longitude, latitude, place_name);
    
            //object destructuring
            //const {features} = objData;
            //console.log(features[0].center[0], features[0].center[1], features[0].place_name);

            //object shorthand
            const positionData = {
                longitude,
                latitude,
                place_name
            };

            callback(positionData);
        });
    });
    
    request.on('error', (error) => {
        console.log('an error occured : ' + error);
    });
    
    request.end();
}

// getCordinate((data) => {
//     console.log(data.place_name);
// });


module.exports = getCordinate;

