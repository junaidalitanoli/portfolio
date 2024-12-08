const API_KEY = `a41a15b8488b6ecd720ba4373a18cead`;
const form = document.querySelector("form");
const search = document.querySelector("#search");
const weather = document.querySelector("#weather");

const getWeather = async (city) => {
    if (!city) {
        weather.innerHTML = `<h2>Please enter a city name.</h2>`;
        return;
    }

    weather.innerHTML = `<h2>Loading...</h2>`;
    try {
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Weather data not found.");
        }
        const data = await response.json();
        return showWeather(data);
    } catch (error) {
        weather.innerHTML = `<h2>Error fetching weather data: ${error.message}</h2>`;
    }
}

const showWeather = (data) => {
    if (data.cod === 404) {
        weather.innerHTML = `<h2>City Not Found</h2>`;
        return;
    }
    weather.innerHTML = `
        <div>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="">
        </div>
        <div>
            <h2>${data.main.temp} ℃</h2>
            <h4>${data.weather[0].main}</h4>
        </div>
    `;
}

form.addEventListener("submit", function(event) {
    event.preventDefault();
    const city = search.value.trim();
    getWeather(city);
    search.value = ""; // Clear the search input after submission
});
