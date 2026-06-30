const apiKey = "2cb9aac5b8af43808fa43806260107";

const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");
const currentWeather = document.getElementById("currentWeather");
const forecast = document.getElementById("forecast");
const logoutBtn = document.getElementById("logoutBtn");

// Check login
if (localStorage.getItem("loggedIn") !== "true") {
    window.location.href = "index.html";
}

// Logout
logoutBtn.addEventListener("click", () => {
    localStorage.removeItem("loggedIn");
    window.location.href = "index.html";
});

// Search weather
searchBtn.addEventListener("click", () => {
    const city = cityInput.value.trim();

    if (city === "") {
        alert("Please enter a city.");
        return;
    }

    getWeather(city);
});

async function getWeather(city) {

    try {

        const response = await fetch(
            `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`
        );

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error.message);
        }

        displayCurrentWeather(data);
        displayForecast(data);
        changeBackground(data.current.condition.text);

    } catch (error) {

        currentWeather.innerHTML = `<h2>${error.message}</h2>`;
        forecast.innerHTML = "";

    }

}

function displayCurrentWeather(data) {

    currentWeather.innerHTML = `
        <h2>${data.location.name}, ${data.location.country}</h2>

        <img src="https:${data.current.condition.icon}" alt="Weather Icon">

        <h1>${data.current.temp_c} °C</h1>

        <p><strong>${data.current.condition.text}</strong></p>

        <p>Humidity: ${data.current.humidity}%</p>

        <p>Wind: ${data.current.wind_kph} km/h</p>
    `;
}

function displayForecast(data) {

    forecast.innerHTML = "";

    data.forecast.forecastday.forEach(day => {

        forecast.innerHTML += `

        <div class="forecast-card">

            <h3>${day.date}</h3>

            <img src="https:${day.day.condition.icon}" alt="Icon">

            <p>Max: ${day.day.maxtemp_c}°C</p>

            <p>Min: ${day.day.mintemp_c}°C</p>

            <p>${day.day.condition.text}</p>

        </div>

        `;

    });

}

function changeBackground(weather){

    document.body.className="";

    weather=weather.toLowerCase();

    if(weather.includes("sun") || weather.includes("clear")){

        document.body.classList.add("sunny");

    }
    else if(weather.includes("cloud")){

        document.body.classList.add("cloudy");

    }
    else if(weather.includes("rain") || weather.includes("drizzle")){

        document.body.classList.add("rainy");

    }
    else if(weather.includes("snow")){

        document.body.classList.add("snow");

    }

}