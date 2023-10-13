const apiKey = "d5d4f3f8cd1c728d53bc3cc2ba50620a";
// const lat = 59.333831; // Stockholm
// const lon = 17.980385; // Stockholm


// const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const URL = `https://api.openweathermap.org/data/2.5/weather?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`;
const API_FORECAST = `https://api.openweathermap.org/data/2.5/forecast?q=Stockholm,Sweden&units=metric&APPID=${apiKey}`
const weatherContainer = document.getElementById("weather-container");
const forecastcontainer = document.getElementById("forecastcontainer");


// Function to get weather icon URL
function getWeatherIconURL(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}.png`;
}

// Function for fetching current weather
const callApiCurrent = () =>
  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse response as JSON
    })
    .then((data) => {
      // Use specific data from the response to display in the container
      const temperature = data.main.temp.toFixed(1);
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon; // Icon code from the API

      // Construct the icon URL
      const iconURL = getWeatherIconURL(iconCode);
      const name = data.name;


      weatherContainer.innerHTML = `
      <div>
        <h2 class="temp">${temperature}°C</h2>
        <h1 class="cityName">${name}</h1>
        <div class="desc"><p>${description}</p><img src="${iconURL}" 
        alt="weather icon" class="img-icon"></div>
      </div>
        `;

    })
    .catch((error) => {
      // Handle errors, such as network issues or invalid responses
      weatherContainer.innerText = `Error: ${error.message}`;
      console.error("Fetch error:", error);
    });

callApiCurrent();


// Function for fetching forecast weather
const fetchForecast = () =>
  fetch(API_FORECAST)
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse response as JSON
    })
    .then((data) => {
      const filteredFore = data.list.filter((foreItem) => foreItem.dt_txt.includes("12:00:00"));
      let forecastContent = '<div class="forecast-content">';

      filteredFore.forEach(foreItem => {
        const temperature = foreItem.main.temp.toFixed(1);
        const temperatureFahr = foreItem.main.temp;
        const iconCode = foreItem.weather[0].icon; // Get icon code from foreItem
        const tempMax = foreItem.main.temp_max.toFixed();
        const tempMin = foreItem.main.temp_min.toFixed();
        console.log(foreItem.main)
        // Construct the icon URL
        const iconURL = `https://openweathermap.org/img/wn/${iconCode}.png`;

        forecastContent += `
        <div class="forecast-item">
        <p>Mon</p>
        <img src="${iconURL}" alt="weather icon" class="img-icon">
        <div class="desc">
        <h2 class="temp">${tempMax}° / ${tempMin} °C</h2>
        </div>
      </div>`;
      });

      forecastContainer.innerHTML = forecastContent;
    })
    .catch((error) => {
      // Handle errors, such as network issues or invalid responses
      forecastcontainer.innerText = `Error: ${error.message}`;
      console.error("Fetch error:", error);
    });

fetchForecast();

