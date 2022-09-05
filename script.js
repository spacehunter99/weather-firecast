"use strict"

async function getWeather() {
    let city = document.getElementById("city");
    let state = document.getElementById("state");
    let temperature = document.getElementById("temperature");
    let feelsLike = document.getElementById("feelsLike");
    let wind = document.getElementById("wind");
    let humidity = document.getElementById("humidity");
    let image = document.getElementById("image");

    let form = document.getElementById("WeatherContainer");

    let inputField = document.getElementById("chosenCity");

    let newUrl = encodeURIComponent(`${inputField.value}`);
    let response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${newUrl}&appid=cdf1a7daa4674455386f14cadc943c0f&lang=ru&units=metric`);
    let result = await response.json();

    city.innerHTML = "Город: " + result.name;
    if (result.name == undefined) {
        city.innerHTML = "Город не выбран";
        state.innerHTML = "Нет данных"
        temperature.innerHTML = "";
        feelsLike.innerHTML = "";
        humidity.innerHTML = "";
        image.src = "";
        wind.innerHTML = "";
    };
    temperature.innerHTML = "Температура: " + Math.round(result.main.temp) + "°C";
    state.innerHTML = result.weather[0].description;
    image.src = "https://api.openweathermap.org/img/w/" + result.weather[0].icon + ".png";
    feelsLike.innerHTML = "Ощущается как: " + Math.round(result.main.feels_like) + "°C";
    wind.innerHTML = "Ветер: " + Math.round(result.wind.speed) + "м/с";
    humidity.innerHTML = "Влажность: " + result.main.humidity + "%";
    

    form.addEventListener("submit", function(event) {
        event.preventDefault();
        getWeather();
    })
}

window.addEventListener("load", getWeather);