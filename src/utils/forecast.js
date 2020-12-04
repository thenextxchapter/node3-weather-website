const request = require('request');

const forecast = (location, callback) => {
    const url = `http://api.weatherstack.com/current?access_key=238fda8b8aab46e35ef4949354fbda3f&query=${location}`;

    request({ url, json:true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined); 
        } else if (body.error) {
            callback('Unable to find location', undefined);
        } else {
            callback(undefined, `It is currently ${body.current.temperature} degrees out. There is ${body.current.precip}% chance of rain.`);
        }
    });
};

module.exports = forecast;

// const forecast = (latitude, longitude, callback) => {
//     const url = 'http://api.weatherstack.com/current?access_key=238fda8b8aab46e35ef4949354fbda3f&query=Abuja';

//     request({ url: url, json:true }, (error, response) => {
//         if (error) {
//             callback('Unable to connect to weather service!', undefined); 
//         } else if (response.body.error) {
//             callback('Unable to find location', undefined);
//         } else {
//             callback(undefined, `It is currently ${res.temperature} degrees out. There is ${res.precip}% chance of rain.`);
//         }
//     });
// };