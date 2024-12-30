const apiKey = "36a40522aca0b2f1f32631ad7fc1cd97"; // Replace with your OpenWeatherMap API key

document.getElementById("location-btn").addEventListener("click", () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(getWeatherByLocation, handleError);
    } else {
        alert("Geolocation is not supported by your browser.");
    }
});

document.getElementById("city-btn").addEventListener("click", () => {
    const city = document.getElementById("city-input").value;
    if (city) {
        fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    } else {
        alert("Please enter a city name.");
    }
});

function getWeatherByLocation(position) {
    const { latitude, longitude } = position.coords;
    fetchWeatherData(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`);
}

function fetchWeatherData(url) {
    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("Failed to fetch weather data.");
            }
            return response.json();
        })
        .then(data => displayWeatherData(data))
        .catch(error => {
            document.getElementById("weather-info").innerText = "Error fetching weather data.";
            console.error(error);
        });
}

function displayWeatherData(data) {
    const { name, main, weather } = data;
    document.getElementById("weather-info").innerHTML = `
        <strong>City:</strong> ${name}<br>
        <strong>Temperature:</strong> ${main.temp} °C<br>
        <strong>Weather:</strong> ${weather[0].description}<br>
        <strong>Humidity:</strong> ${main.humidity} %<br>
        <strong>Pressure:</strong> ${main.pressure} hPa
    `;
}

function handleError(error) {
    console.error(error);
    alert("Failed to get your location.");
}
