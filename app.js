//Instructionsfrom OpenWeatherMap on how to make an API call (get lat & lon): https://openweathermap.org/api/one-call-3

// Current weather api
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}



const apiKey = "d5d4f3f8cd1c728d53bc3cc2ba50620a";
const lat = 59.333831; // Stockholm
const lon = 17.980385; // Stockholm
const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;

const container = document.getElementById("weather");

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
      const name = data.name;

      container.innerText = `The temperature: ${temperature}°C in ${name} is ${description}.`;
      console.log(data);
    })
    .catch((error) => {
      // Handle errors, such as network issues or invalid responses
      container.innerText = `Error: ${error.message}`;
      console.error("Fetch error:", error);
    });

callApiCurrent();
//

// const URLGeocoding = `http://api.openweathermap.org/geo/1.0/direct?q=${city name},${state code },${country code }& limit=${ limit }& appid=${apiKey} `;
