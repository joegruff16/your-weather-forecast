
let searchHistory = [];
// Need to store my API key in a variable
const APIKey = "8a4161e110974484d73136be7dd84581";

// HTML DOM elements
const searchForm = document.querySelector('#search-form');
const searchInput = document.querySelector('#search-input');
const todayContainer = document.querySelector('#today');
const forecastContainer = document.querySelector('#forecast');
const searchHistoryContainer = document.querySelector('#history');

// Added timezone plugins day.js 
// Tutor assisted with help to display the current day
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);




// This is the section where we store data from our fetch into varibales
function renderCurrentWeather(city, weather) {
    const date = dayjs().format('M/D/YYYY');

    const temp = weather.main.temp;
    const windSpeed = weather.wind.speed;
    const humidity = weather.main.humidity;
    const iconLink = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    const iconDesc = weather.weather[0].description || weather[0].main;

    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const heading = document.createElement('h2');
    const weatherImg = document.createElement('img');
    const tempEl = document.createElement('p');
    const windEl = document.createElement('p');
    const humidityEl = document.createElement('p');

    card.setAttribute('class', 'card');
    cardBody.setAttribute('class', 'card-body');
    card.append(cardBody);

    heading.setAttribute('class', 'h3 card-title');
    tempEl.setAttribute('class', 'card-text');
    windEl.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');

    heading.textContent = `(${city}) (${date})`;

    weatherImg.setAttribute('src', iconLink);
    weatherImg.setAttribute('alt', iconDesc);
    weatherImg.setAttribute('class', 'weather-img');
    heading.append(weatherImg);
    tempEl.textContent = `Temp: ${temp}°F`;
    windEl.textContent = `Wind: ${windSpeed} MPH`;
    humidityEl.textContent = `Humidity: ${humidity}%`;
    cardBody.append(heading, tempEl, windEl, humidityEl);

    todayContainer.innerHTML = '';
    todayContainer.append(card);

}
// Define a specific time of day when weather forecast is displayed
function displayForecast(dailyForecast) {
    // Create timestamps for beginning and end of 5 Day Weather Forecast
    const startDate = dayjs().add(1, 'day').startOf('day').unix();
    const endDate = dayjs().add(6, 'day').startOf('day').unix();

    const headingCol = document.createElement('div');
    const heading = document.createElement('h4');

    headingCol.setAttribute('class', 'col-12');
    heading.textContent = '5 Day Forecast'
    headingCol.append(heading);

    forecastContainer.innerHTML = '';
    forecastContainer.append(headingCol);

    for (let i = 0; i < dailyForecast.length; i++) {
        if (dailyForecast[i].dt >= startDate && dailyForecast[i].dt < endDate) {
            // Filters through data to return the data that for noon of each day
            if (dailyForecast[i].dt_txt.slice(11, 13) == '12') {
                displayForecastCard(dailyForecast[i]);
            }
        }
    }

}

// While the loop is iterating through the arrray of daily weather for the 5 day Forecast, the forecast card is called everytime and all the data of the card is made for that specific iteration day of the forecast
function displayForecastCard(forecast) {
    // These are the variables with need from the WeatherAPI
    const iconLink = `https://openweathermap.org/img/w/${forecast.weather[0].icon}.png`;
    const iconDesc = forecast.weather[0].description;
    const temp = forecast.main.temp;
    const windSpeed = forecast.wind.speed;
    const humidity = forecast.main.humidity;

    // Create card elements
    const col = document.createElement('div');
    const card = document.createElement('div');
    const cardBody = document.createElement('div');
    const cardHeading = document.createElement('h5');
    const weatherImg = document.createElement('img');
    const tempEl = document.createElement('p');
    const windEl = document.createElement('p');
    const humidityEl = document.createElement('p');

    col.append(card);
    card.append(cardBody);
    cardBody.append(cardHeading, weatherImg, tempEl, windEl, humidityEl);

    col.setAttribute('class', 'col-md');
    col.classList.add('five-day-card');
    card.setAttribute('class', 'card bg-primary h-100 text-white');
    cardBody.setAttribute('class', 'card-body p-2');
    cardHeading.setAttribute('class', 'card-title');
    tempEl.setAttribute('class', 'card-text');
    windEl.setAttribute('class', 'card-text');
    humidityEl.setAttribute('class', 'card-text');

    // Add data to elements
    cardHeading.textContent = dayjs(forecast.dt_txt).format('M/D/YYYY');
    weatherImg.setAttribute('src', iconLink);
    weatherImg.setAttribute('alt', iconDesc);
    tempEl.textContent = `Temp: ${temp}°F`;
    windEl.textContent = `Wind: ${windSpeed} MPH`;
    humidityEl.textContent = `Humidity: ${humidity}%`;

    forecastContainer.append(col);
}

// Tutor assisted a clearer way to show how the data is dispered for each function to display the current weather and forecast
function renderItems(city, data) {
    renderCurrentWeather(city, data.list[0], data.city.timezone);
    console.log(city, data);
    console.log(renderCurrentWeather);
    displayForecast(data.list);

}

// 2nd Fetch to get the weather
function fetchWeather(location) {
    console.log(location)
    let { lat, lon } = location;
    var city = location.none;

    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`;

    fetch(queryURL)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            renderItems(city, data);
        })
        .catch(function (err) {
            console.error(err);
        });
}

// Gather the input to get your first fetch the coordinates of the geo
function fetchGeo(search) {
    const apiUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${search}&limit=5&appid=${APIKey}`;

    fetch(apiUrl)
        .then(function (res) {
            return res.json();
        })
        .then(function (data) {
            if (!data[0]) {
                alert('Location not found');
            } else {
                appendToHistory(search);
                fetchWeather(data[0]);
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}

// Validate the input box
function handleSearchFormSubmit(e) {
    if (!searchInput.value) {
        return;
    }

    e.preventDefault();
    const search = searchInput.value.trim();
    fetchGeo(search);
    searchInput.value = '';
}

// Search form event listener
searchForm.addEventListener('submit', handleSearchFormSubmit);

// This function will display the search history list

function displaySearchHistory() {
    searchHistoryContainer.innerHTML = '';

    // We need an array to count down to the most recent that will display on top
    for (let i = searchHistory.length - 1; i >= 0; i--) {
        const btn = document.createElement('button');
        btn.setAttribute('type', 'button');
        btn.setAttribute('aria-controls', 'today forecast');
        btn.classList.add('history-btn', 'btn-history');

        btn.setAttribute('data-search', searchHistory[i]);
        btn.textContent = searchHistory[i];
        searchHistoryContainer.append(btn);

    }
}
// This function will update history in local storage to display history 
function appendToHistory(search) {
    // If the user doesn't input a city return this function
    if (searchHistory.indexOf(search) !== -1) {
        return;
    }
    searchHistory.push(search);

    localStorage.setItem('search-history', JSON.stringify(searchHistory));
    displaySearchHistory();
}

// Function to get search history from local storage -- this is persistent data
function initializeSearchHistory() {
    const storedHistory = localStorage.getItem('search-history');
    if (storedHistory) {
        searchHistory = JSON.parse(storedHistory);
    }
    displaySearchHistory();
}
initializeSearchHistory();

// Validate the button value -- The buttons that will display after each user search; a user can click the displayed target of the div as it will become the event
function handleSearchHistoryClick(e) {
    if (!e.target.matches('btn-history')) {
        return;
    }

    const btn = e.target;
    const search = btn.getAttribute('data-search');
    fetchGeo(search);
}

// Event listener for the container that holds the history buttons
searchHistoryContainer.addEventListener('click', handleSearchHistoryClick);


