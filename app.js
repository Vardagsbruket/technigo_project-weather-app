const apiKey = "d5d4f3f8cd1c728d53bc3cc2ba50620a";
const lat = 59.333831; // Stockholm
const lon = 17.980385; // Stockholm
const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
const container = document.getElementById("container");

// Function to get weather icon URL
function getWeatherIconURL(iconCode) {
  return `https://openweathermap.org/img/wn/${iconCode}.png`;
}

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
      const name = data.name;
      // Construct the icon URL
      const iconURL = getWeatherIconURL(iconCode);


      container.innerHTML = `
      <div id="searchBar"></div>
      <div>
        <h2 class="temp">${temperature}°C</h2>
        <h1 class="cityName">${name}</h1>
        <div class="desc"><p>${description}</p><img src="${iconURL}" 
        alt="weather icon" class="img-icon"></div>
      </div>
      <div>
      <div class="gridForecast">
      
      </div>
        `;
      //Forecast displays day, temp, icon, wind
    })
    .catch((error) => {
      // Handle errors, such as network issues or invalid responses
      container.innerText = `Error: ${error.message}`;
      console.error("Fetch error:", error);
    });

callApiCurrent();