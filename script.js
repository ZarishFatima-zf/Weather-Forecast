const apiKey = "69c56a3828ff75f514578b39640bdd71";
const cityInput = document.getElementById("cityInput");
const searchBtn = document.getElementById("searchBtn");
const weatherBackground = document.getElementById("weatherBackground");

const defaultCity = "Karachi";
getWeather(defaultCity);

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city) {
    getWeather(city);
  } else {
    alert("Please enter a city name.");
  }
});

async function getWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  try {
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      alert(`Error: ${errorData.message}`);
      console.error("API Error:", errorData);
      return;
    }

    const data = await response.json();
    updateWeatherInfo(data);
    handleWeatherEffects(data.weather[0].main);
  } catch (error) {
    console.error("Fetch Error:", error);
    alert("Error fetching weather data. Please check your internet connection or try again later.");
  }
}

function updateWeatherInfo(data) {
  document.getElementById("cityName").textContent = `${data.name}, ${data.sys.country}`;
  document.getElementById("dateTime").textContent = new Date().toLocaleString();
  document.getElementById("condition").textContent = data.weather[0].main;
  document.getElementById("weatherIcon").src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  document.getElementById("temperature").textContent = `Temp: ${data.main.temp} °C`;
  document.getElementById("feelsLike").textContent = `${data.main.feels_like} °C`;
  document.getElementById("humidity").textContent = `${data.main.humidity}%`;
  document.getElementById("wind").textContent = `${data.wind.speed} m/s`;
  document.getElementById("pressure").textContent = `${data.main.pressure} hPa`;
}

function handleWeatherEffects(condition) {
  switch (condition.toLowerCase()) {
    case "rain":
      weatherBackground.style.animation = "backgroundAnimation 20s infinite alternate";
      break;
    case "clear":
      weatherBackground.style.animation = "";
      break;
    case "clouds":
      weatherBackground.style.animation = "";
      break;
    default:
      weatherBackground.style.animation = "";
  }
}
