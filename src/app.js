
function displayTemperature(response){
    console.log(response.data);

}

let apiKey = "d3e02cfab692a13c33a6d6d6aec2acb0";
let apiUrl = `api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;


axios.get(apiUrl).then(displayTemperature);