
function formatDate(timestamp){
    //calculate the date 
    let date = new Date(timestamp);
    let hours = date.getHours()
    if (hours < 10){
        hours = `0${hours}`;
    }
    let minutes = date.getMinutes();
    if (minutes < 10){
        minutes = `0${minutes}`;
    }
    let days = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"]
    let day = days[date.getDay()];
    return `${day}, ${hours}:${minutes}`;

}

function displayForecast(response){
    console.log(response.data.daily);
    let forecast = document.querySelector("#forecast");
    let days = ["Thu", "Fri", "Sat", "Sun", "Mon"];

    let forecastHTML = `<div class="row">`;
    days.forEach(function (day) {
      forecastHTML =
        forecastHTML +
        `
        <div class="col-2">
          <div class="weather-forecast-date">${day}</div>
          <img
            src="http://openweathermap.org/img/wn/50d@2x.png"
            alt=""
            width="42"
          />
          <div class="weather-forecast-temperatures">
            <span class="weather-forecast-temperature-max"> 18° </span>
            <span class="weather-forecast-temperature-min"> 12° </span>
          </div>
        </div>
    `;
    });
  
    forecastHTML = forecastHTML + `</div>`;
    forecast.innerHTML = forecastHTML;
}
function getForecast(coordinates){
    console.log(coordinates);
    let apiKey = "d3e02cfab692a13c33a6d6d6aec2acb0";
    let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);

}
function displayTemperature(response){
    console.log(response.data);
    let mainTemp = document.querySelector("#main-temp");
    mainTemp.innerHTML = Math.round(response.data.main.temp);

    let city = document.querySelector("#location");
    city.innerHTML = response.data.name;

    let status = document.querySelector("#status");
    status.innerHTML = response.data.weather[0].main;

    let humidity = document.querySelector("#humidity");
    humidity.innerHTML = response.data.main.humidity;

    let wind = document.querySelector("#wind");
    wind.innerHTML = Math.round(response.data.wind.speed);

    let date = document.querySelector("#date");
    date.innerHTML = formatDate(response.data.dt * 1000);

    let icon = document.querySelector("#icon");
    icon.setAttribute("src",`http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
    icon.setAttribute("alt",response.data.weather[0].description);

    cTemp = response.data.main.temp;
    getForecast(response.data.coord);
}
function search(city){
let apiKey = "d3e02cfab692a13c33a6d6d6aec2acb0";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayTemperature);
}

function handleSearch(event){
    event.preventDefault();
    let cityInput = document.querySelector("#city-input");
    search(cityInput.value);
}
function displayFahrenheit(event){
    event.preventDefault();
    let mainTemp = document.querySelector("#main-temp");
    //remove active class from celsius ink
    cLink.classList.remove("active");
    fLink.classList.add("active");
    let fTemp = (cTemp * 9/5) + 32;
    mainTemp.innerHTML = Math.round(fTemp);
}
function displayCelsius(event){
    event.preventDefault();
        //remove active class from celsius ink
        cLink.classList.add("active");
        fLink.classList.remove("active");
    let mainTemp = document.querySelector("#main-temp");
    mainTemp.innerHTML = Math.round(cTemp);
}

//global variables


let cTemp = null;

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);

let fLink = document.querySelector("#f-link");
fLink.addEventListener("click", displayFahrenheit);

let cLink = document.querySelector("#c-link");
cLink.addEventListener("click", displayCelsius);

search("San Francisco");