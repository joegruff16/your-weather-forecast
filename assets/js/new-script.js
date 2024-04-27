// Global variables -- mainly identily the id's within the html

const APIKey = "8a4161e110974484d73136be7dd84581";
const searchInput = document.querySelector(".form-control");
const searchButton = document.querySelector(".btn-outline-secondary");
const searchHistory = document.querySelector(".searchedCities");
const mainWeatherElement = document.querySelector(".card-weather");
const weeklyContainer = document.querySelector(".weakly-weather");

// Function that will store searched cities into local storage and will display them as buttons
// Each button will be able to fetch the coordinates for the city after you click it


//1. event listener, from the search form




//2. validate the input box


// Tutor assisted with help to display current day
// This is where we will be storing data from our fetch into variables 
const tempDegree = weather.main.temp;
console.log(tempDegree);
const windSpeed = weather.wind.speed;
const humidity = weather.main.humidity;
const mainIconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
const displayIcon = weather.weather[0].description || weather[0].main;

// Dynamically create HTML elements to display after search input is made for the current day
const cardWeather = document.createElement('div');
const mainCard = document.createElement('div');
const mainHeading = document.createElement('h2');
const weatherIcon = document.createElement('img')
const tempDegreeEl = document.createElement('h2');
const windSpeedEl = document.createElement('p');
const humidityEl = document.createElement('p');

cardWeather.setAttribute('class', 'card-weather');
mainCard.setAttribute('class', 'main-card');
cardWeather.append(mainCard);

mainHeading.setAttribute('class', 'current-city');
tempDegreeEl.setAttribute('class', 'todays-temp');
windSpeedEl.setAttribute('class', 'today-wind');
humidityEl.setAttribute('class', 'today-humidity');

mainHeading.textContent = `${city} (${date})`;
weatherIcon.setAttribute('src', mainIconUrl);
weatherIcon.setAttribute('alt', displayIcon);
weatherIcon.setAttribute('class', 'image-today');
mainHeading.append(weatherIcon);
tempDegreeEl.textContent = `Temp: ${tempDegree}°F`;
windSpeedEl.textContent = `Wind: ${windSpeed} MPH`;
humidityEl.textContent = `Humidity: ${humidity} %`;
mainCard.append(mainHeading, tempDegreeEl, windSpeedEl, humidityEl);

// Clear contents of the card
mainWeatherElement.innerHTML = '';

// Display city data onto card
mainWeatherElement.append(cardWeather);
console.log(cardWeather);

//3 take the input and get your first fetch, coordinates of the geo
function getCoordinates(city) {

    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`)
        .then((response) => {
            return response.json()
        }).then((data) => {
            console.log(data);
            searchWeather(data[0]);
        }
        )
}