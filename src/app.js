
function displayTemperature(response){
    console.log(response.data);
    let mainTemp = document.querySelector("#main-temp");
    mainTemp.innerHTML = Math.round(response.data.main.temp);
    let city = document.querySelector("#location");
    city.innerHTML = response.data.name;
    let status = document.querySelector("#status");
    status.innerHTML = response.data.weather[0].description;
    let date = document.querySelector("#date");
    date.innerHTML = response.data.dt;
    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;
    let wind = document.querySelector("#wind");
    wind.innerHTML = response.data.wind.speed;
    
}

let apiKey = "d3e02cfab692a13c33a6d6d6aec2acb0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=New York&appid=${apiKey}&units=metric`;


console.log(apiUrl);
axios.get(apiUrl).then(displayTemperature);