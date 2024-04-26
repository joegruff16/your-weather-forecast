// Global variables -- mainly identily the id's within the html

const APIKey = "8a4161e110974484d73136be7dd84581";
const searchInput = document.querySelector(".form-control");
const searchButton = document.querySelector(".btn-outline-secondary");
const searchHistory = document.querySelector(".searchedCities");
const mainWeatherElement = document.querySelector(".card-weather");
const weeklyContainer = document.querySelector(".weakly-weather");

//1. event listener, from the search form

searchButton.addEventListener("click", (event) => {
    event.preventDefault();
    let city = searchInput.value
    searchWeather(city)
    addCity();
})

// Create function that will display searched cities as a button
const addCity = () => {
    const value = searchInput.value;
    if (!value)
        return;
    const newCity = document.createElement("button");
    newCity.innerText = value;
    searchHistory.appendChild(newCity);
    searchInput.value = "";

    newCity.addEventListener("click", (event) => {
        event.preventDefault();
        let city = newCity.innerText;
        searchWeather(city);
    });
}

//2. validate the input box

//3 take the input and get your first fetch, coordinates of the geo
const searchWeather = (city) => {
    console.log(city)
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${APIKey}`;

    fetch(queryURL).then((response) => {
        return response.json()
    }).then((data) => {
        console.log(data);
        const mainIcon = data.weather[0].icon
        const iconUrl = `https://openweathermap.org/img/wn/${mainIcon}.png`
        const mainDate = new Date(data.dt * 1000).toLocaleDateString()
        console.log(mainDate);
        //5a - current day, create one card for the current day.  declare the data at the top of the function, and then create the card
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
        mainWeatherElement.innerHTML = mainCard;
        console.log(mainCard);
        let lat = data.coord.lat;
        let lon = data.coord.lon;

        //4. go to the 2nd fetch to get the weather, applying the lat and lon of the geo as variables. 

        fetch(`
https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}
`).then((response) => {
            return response.json()
        }).then((weeklyData) => {
            const filteredWeek = weeklyData.list.filter(day => day.dt_txt.includes("12:00:00"))
            console.log(filteredWeek)
            console.log(fiveDayCard)
            //5a  - forecast is the 5 day, two parts: First is getting the tile to display, clear the area of the section/container for the 5day, then a for loop will follow.
            searchInput.value = "";
            mainWeatherElement.innerHTML = "";
            weeklyContainer.innerHTML = "";
            console.log(weeklyContainer);
            console.log(mainWeatherElement);
            // function clearContent(weeklyContainer) {
            //     document.querySelector(weeklyContainer).innerHTML = "";

            // }
            for (let i = 0; i < filteredWeek.length; i++) {
                const weekDate = new Date(filteredWeek[i].dt_txt).toLocaleDateString().split("")[0]
                //5b - a this is the function for the card, strictly -- which will be called out/ evoked in the for loop.  Copy the card created in current and reuse in this function

                let fiveDayCard =
                    //             `
                    //         <div class="card-body main-card">
                    //             <div class="weather-date-location">
                    //                 <h3 class="current-city">${data.name}</h3>
                    //                 <p class="text-gray">
                    //                     <span class="weather-date">${mainDate}</span>
                    //                 </p>
                    //             </div>
                    //             <div class="weather-data d-flex">
                    //                 <div class="mr-auto">
                    //                     <h4 class="display-3 todays-temp">
                    //                     ${data.main.temp}
                    //                     <span class="symbol">&deg;</span>
                    //                     F
                    //                 </h4>
                    //                 <img
                    //                     src="${iconUrl}"
                    //                     class="image-today"
                    //                     height="50px"
                    //                     width="50px"
                    //                 >
                    //                 <p class="today-humidity">humidity: ${data.main.humidity}</p>
                    //                 <p class="today-wind">wind speed: ${data.wind.speed}</p>
                    //             </div>
                    //         </div>
                    //     </div>
                    // `
                    `
                <div class="card-body p-0 five-day-card">
                <div class="weakly-weather-item">
                <p class="mb-0">${weekDate}</p>
                <p class="mb-0">${filteredWeek[i].main.temp}</p>
                <p class="mb-0">Humidity: ${filteredWeek[i].main.humidity}</p>
                <p class="mb-0">Wind Speed: ${filteredWeek[i].wind.speed}</p>
                </div>
                </div>
                `;
                weeklyContainer.innerHTML = fiveDayCard;
                weeklyContainer.appendChild(fiveDayCard);
                searchInput.value = "";
                console.log(fiveDayCard);

            }
        })
    });
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