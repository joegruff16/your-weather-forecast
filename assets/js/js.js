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

//2. validate the input box

//3 take the input and get your first fetch, coordinates of the geo


//4. go to the 2nd fetch to get the weather, applying the lat and lon of the geo as variables. 


//5a - current day, create one card for the cuurent day.  declare the data at the top of the function, and then create the card

//5b  - forecast is the 5 day, two parts: First is getting the tile  to display, clear the area of the scection/container for the 5day, then a for loop will follow.

//5b - a this is the function for the card, striclty -- which will be called out/ evoked in the for loop.  Copy the card created in current and reuse in this function

//A fore loop will process one thing /index/ at a time -- but it will go thru and process the entire array.,  logic in a form loop is always for 1.

