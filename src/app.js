
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

search("San Francisco");

let form = document.querySelector("#search-form");
form.addEventListener("submit", handleSearch);