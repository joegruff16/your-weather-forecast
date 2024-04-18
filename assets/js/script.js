// My API key for making API calls: 8a4161e110974484d73136be7dd84581
// The README is calling for us to use Reverse geocoding

// Need to store my API key in a variable
const APIKey = "8a4161e110974484d73136be7dd84581";
const searchInput = document.querySelector(".form-control");
const searchButton = document.querySelector(".btn-primary");
const searchHistory = document.querySelector(".searchedCities");
const mainWeatherElement = document.querySelector(".card-weather");
const weeklyContainer = document.querySelector(".weakly-weather");

// Since we want our users to be able to search by city location to find the weather
// We need to collect the user's input to store in a variable for city
// let city;
const searchWeather = (city) => {
    console.log(city)
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;

    fetch(queryURL).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data)
        const mainIcon = data.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${mainIcon}.png`
        const mainDate = new Date(data.dt * 1000).toLocaleDateString()
        console.log(mainDate)
        let mainCard = `
        <div class="card-body main-card">
                                        <div class="weather-date-location">
                                            <h3 class="current-city">${data.name}</h3>
                                            <p class="text-gray">
                                                <span class="weather-date">${mainDate}</span>
                                            </p>
                                        </div>
                                        <div class="weather-data d-flex">
                                            <div class="mr-auto">
                                                <h4 class="display-3 todays-temp">
                                                   temp: ${data.main.temp}
                                                    <span class="symbol">&deg;</span>
                                                    F
                                                </h4>
                                                <img
                                                    src="${iconUrl}"
                                                    class="image-today"
                                                    height="50px"
                                                    width="50px"
                                                >
                                                <p class="today-humidity">humidity: ${data.main.humidity}</p>
                                                <p class="today-wind">wind speed: ${data.wind.speed}</p>
                                            </div>
                                        </div>
                                    </div>
        `
        mainWeatherElement.innerHTML = mainCard;
        const lat = data.coord.lat
        const lon = data.coord.lon

        fetch(`
        https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}
        `).then((response) => {
            return response.json()
        }).then((weeklyData) => {
            const filteredWeek = weeklyData.list.filter(day => day.dt_txt.includes("12:00:00"))
            console.log(filteredWeek)
            let fiveDayCard = ""
            for (let i = 0; i < filteredWeek.length; i++) {
                const weekDate = new Date(filteredWeek[i].dt_txt).toLocaleDateString().split("")[0]
                fiveDayCard += `
                <div class="weakly-weather-item">
                                                <p class="mb-0">
                                                    ${weekDate}
                                                </p>
                                                <i class="mdi mdi-weather-cloudy"></i>
                                                <p class="mb-0">
                                                    ${filteredWeek[i].main.temp}
                                                </p>
                                                <p class="mb-0">
                                                ${filteredWeek[i].main.humidity}
                                                </p>
                                                <p class="mb-0">
                                                ${filteredWeek[i].wind.speed}
                                            </p>
                                            </div>
                `
                weeklyContainer.innerHTML = fiveDayCard
            }
        })
    });
}
// Using the above URL we are going to create a new variable that will store the OpenWeather current weather data

// This variable needs to be adjusted to store in the city variable that I created above
// This indicates then that we need to use localStorage

// What we will also want to do is specify state and country since other states and countries have the same city names

// Country
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

// State
// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}

// We need to use reverse geocoding as the example URL shows that it must include lat and log coordinates
// `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=${limit}&appid=${APIKey}`;
// https://openweathermap.org/api/geocoding-api



// Create function that will display searched cities as a button
const addCity = () => {
    const value = searchInput.value;
    if (!value)
        return;
    const newCity = document.createElement("button");
    newCity.innerText = value;

    searchHistory.appendChild(newCity);
    searchInput.value = "";

}

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    let city = searchInput.value
    searchWeather(city)
    addCity();
})