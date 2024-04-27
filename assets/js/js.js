// Global variables -- mainly identily the id's within the html

const APIKey = "8a4161e110974484d73136be7dd84581";
const searchInput = document.querySelector(".form-control");
const searchButton = document.querySelector(".btn-outline-secondary");
const searchHistory = document.querySelector(".searchedCities");
const mainWeatherElement = document.querySelector(".card-weather");
const weeklyContainer = document.querySelector(".weakly-weather");

//1. event listener, from the search form

searchButton.addEventListener("click", addCity)
//  
//     event.preventDefault();
//     let city = searchInput.value
//     searchWeather(city)
//     addCity();
// })


//2. validate the input box
function addCity(event) {
    if (!searchInput.value) {
        return;
    }
    event.preventDefault();
    console.log("addCity");
    const valueEl = searchInput.value;
    // Create function that will display searched cities as a button
    // const newCity = document.createElement("button");
    // newCity.innerText = valueEl;
    // searchHistory.appendChild(newCity);
    getCoordinates(valueEl)
    searchInput.value = "";
}


// newCity.addEventListener("click", (event) => {
//     event.preventDefault();
//     let city = newCity.innerText;
//     searchWeather(city);
// });

//4. go to the 2nd fetch to get the weather, applying the lat and lon of the geo as variables. 
const searchWeather = (location) => {
    console.log(location);
    let { lat, lon } = location;
    // const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;
    const queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIKey}`
    fetch(queryURL).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);
        displayCurrentDay(data.list[0]);
        forecastDisplay(data.list)
    })
}
// Tutor assisted with help to display current day
// This is where we will be storing data from our fetch into variables 
const tempDegree = weather.main.temp;
const windSpeed = weather.wind.speed;
const humidity = weather.main.humidity;
const mainIconUrl = `https://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
const displayIcon = weather.weather[0].description || weather[0].main;

// Dynamically create HTML elements to display after search input is made for the current day

// function displayCurrentDay(weather) {
//     console.log(weather);
//     const cityName = weather.city.name;

//     const mainIcon = weather.weather[0].icon
//     const iconUrl = `https://openweathermap.org/img/wn/${mainIcon}.png`
//     const mainDate = new Date(weather.dt * 1000).toLocaleDateString()
//     console.log(mainDate);
//     //5a - current day, create one card for the current day.  declare the data values at the top of the function, and then create the card
//     let mainCard =
//         `
//             <div class="card-body main-card">
//                 <div class="weather-date-location">
//                     <h3 class="current-city">${cityName}</h3>
//                     <p class="text-gray">
//                         <span class="weather-date">${mainDate}</span>
//                     </p>
//                 </div>
//                 <div class="weather-data d-flex">
//                     <div class="mr-auto">
//                         <h4 class="display-3 todays-temp">
//                             ${weather.main.temp}
//                             <span class="symbol">&deg;</span>
//                             F
//                         </h4>
//                         <img
//                             src="${iconUrl}"
//                             class="image-today"
//                             height="50px"
//                             width="50px"
//                         >
//                             <p class="today-humidity">humidity: ${weather.main.humidity}</p>
//                             <p class="today-wind">wind speed: ${weather.wind.speed}</p>
//                     </div>
//                 </div>
//             </div>
//             `

//     mainWeatherElement.textContent = mainCard;
//     console.log(mainCard);
// }
// https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}
// }).then((weeklyData) => {
//     const filteredWeek = weeklyData.list.filter(day => day.dt_txt.includes("12:00:00"))
//     console.log(filteredWeek)
//     console.log(fiveDayCard)
//     //5a  - forecast is the 5 day, two parts: First is getting the tile to display, clear the area of the section/container for the 5day, then a for loop will follow.
//     searchInput.value = "";
//     mainWeatherElement.innerHTML = "";
//     weeklyContainer.innerHTML = "";
//     console.log(weeklyContainer);
//     console.log(mainWeatherElement);

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
// function clearContent(weeklyContainer) {
//     document.querySelector(weeklyContainer).innerHTML = "";

// }
function forecastDisplay(weather) {
    const fiveDayContainer = document.querySelector("five-day-card");
    const headerEl = document.createElement("h4");
    headerEl.textContent = "5 Day Forecast";
    fiveDayContainer.append(headerEl);
    // Clear contents of card
    weeklyContainer.innerHTML = "";

    for (let i = 0; i < weather.length; i++) {
        const weekDate = new Date(weather[i].dt_txt).toLocaleDateString().split("")[0]
        //5b - a this is the function for the card, strictly -- which will be called out/ evoked in the for loop.  Copy the card created in current and reuse in this function

        let fiveDayCard =
            `
                    <div class="card-body main-card">
                        <div class="weather-date-location">
                            <p class="text-gray">
                                <span class="weather-date">${mainDate}</span>
                            </p>
                        </div>
                        <div class="weather-data d-flex">
                            <div class="mr-auto">
                                <h4 class="display-3 todays-temp">
                                ${data.main.temp}
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
        // `
        //         <div class="weakly-weather-item">
        //         <p class="mb-0">${weekDate}</p>
        //         <p class="mb-0">${filteredWeek[i].main.temp}</p>
        //         <p class="mb-0">Humidity: ${filteredWeek[i].main.humidity}</p>
        //         <p class="mb-0">Wind Speed: ${filteredWeek[i].wind.speed}</p>
        //         </div>
        //         </div>
        //         `;
        // weeklyContainer.innerHTML = fiveDayCard;
        // weeklyContainer.appendChild(fiveDayCard);
        // // searchInput.value = "";
        // console.log(fiveDayCard);

    }
}





//A for loop will process one thing /index/ at a time -- but it will go thru and process the entire array.,  logic in a form loop is always for 1.

// `
// <div class="weakly-weather-item">
// <p class="mb-0">${weekDate}</p>
// <p class="mb-0">${filteredWeek[i].main.temp}</p>
// <p class="mb-0">Humidity: ${filteredWeek[i].main.humidity}</p>
// <p class="mb-0">Wind Speed: ${filteredWeek[i].wind.speed}</p>
// </div>
// `;
// weeklyContainer.innerHTML = fiveDayCard;