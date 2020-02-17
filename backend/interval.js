var axios = require("axios");

setInterval(function sendData(){
  console.log('Sending data');
    const data = {temperature: Math.floor(Math.random()*100), //units: F
                  humidity: Math.floor(Math.random()*100),  //units: % rel humidity
                  light: Math.floor(Math.random()*1000),  //units: lux
                  pollution: Math.floor(Math.random()*50),  //units: ppm
                }
    axios.defaults.withCredentials = true;
    //make a post request with the user data
    axios.post("http://localhost:3002/senddata", data)
    // .then(response => {
      // console.log(response);
    // })
      // console.log("Status Code : ", response.status);
      // console.log(response.data.results);
}, 10)