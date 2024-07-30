// Function to fetch weather data from OpenWeatherMap API
async function getWeather() {
    const city = document.getElementById('city-input').value.trim();
    const apiKey = "1f217efb3e56210f1d2632c4f82a803b";  // Your OpenWeatherMap API key
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (!city) {
        alert('Please enter a city name.');
        return;
    }

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        console.log('API Response:', data); // Log the response data for debugging
        
        if (response.ok) {
            // Update the UI with weather data
            document.getElementById('city-name').textContent = data.name;
            document.getElementById('temperature').textContent = `${data.main.temp}°C`;
            document.getElementById('humidity').textContent = `${data.main.humidity}%`;
            document.getElementById('wind-speed').textContent = `${data.wind.speed} km/hr`;

            // Determine weather icon based on condition
            const weatherCondition = data.weather[0].main.toLowerCase();
            console.log('Weather Condition:', weatherCondition); // Log the weather condition

            let weatherIcon = ''; // Initialize the weatherIcon variable

            switch (weatherCondition) {
                case 'rain':
                    weatherIcon = 'https://img.icons8.com/ios/100/000000/rain.png';
                    break;
                case 'clouds':
                    weatherIcon = 'https://img.icons8.com/ios/100/000000/cloud.png'; // Clouds icon
                    break;
                case 'clear':
                    weatherIcon = 'https://img.icons8.com/ios/100/000000/sun.png';
                    break;
                case 'snow':
                    weatherIcon = 'https://img.icons8.com/ios/100/000000/snow.png';
                    break;
                case 'thunderstorm':
                    weatherIcon = 'https://img.icons8.com/ios/100/000000/thunderstorm.png'; // Thunderstorm icon
                    break;
                case 'drizzle':
                    weatherIcon = 'https://img.icons8.com/ios/100/000000/drizzle.png'; // Drizzle icon
                    break;
                default:
                    weatherIcon = 'https://img.icons8.com/ios/100/000000/partly-cloudy-day--v1.png'; // Default icon
                    break;
            }

            // Update the weather icon image source
            document.getElementById('weather-icon').src = weatherIcon;
        } else {
            alert('City not found. Please enter a valid city name.');
        }
    } catch (error) {
        console.error('Error fetching the weather data:', error);
        alert('An error occurred while fetching the weather data. Please try again.');
    }
}
 
// Function to toggle dark mode
document.getElementById('dark-mode-toggle').addEventListener('change', function() {
    document.body.classList.toggle('dark-mode', this.checked);
    document.querySelector('.card').classList.toggle('dark-mode', this.checked);
    document.querySelector('.search input').classList.toggle('dark-mode', this.checked);
});
