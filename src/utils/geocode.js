const request = require('request');

const geocode = (address, callback) => {
    const url = 'https://api.mailbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_';

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to location services!', undefined);
        } else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined);
        } else {
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            });
        }
    });
};

module.exports = geocode;

// const geocode = (address, callback) => {
//     const url = 'https://api.mailbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_';

//     request({ url: url, json: true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to location services!', undefined);
//         } else if (response.body.features.length === 0) {
//             callback('Unable to find location. Try another search.', undefined);
//         } else {
//             callback(undefined, {
//                 latitude: response.body.features[0].center[1],
//                 longitude: response.body.features[0].center[0],
//                 location: response.body.features[0].place_name
//             });
//         }
//     });
// };