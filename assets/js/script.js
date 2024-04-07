// My API key for making API calls: 8a4161e110974484d73136be7dd84581

// Need to store my API key in a variable
const APIKey = "8a4161e110974484d73136be7dd84581";

// Since we want our users to be able to search by city location to find the weather
// We need to collect the user's input to store in a variable for city
let city;

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={8a4161e110974484d73136be7dd84581}

// Using the above URL we are going to create a new variable that will store the OpenWeather current weather data
const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIKey}`;

// Now that we have created this query URL we will need to call the Fetch API to pass the query URL as a parameter
fetch(queryURL);

// This variable needs to be adjusted to store in the city variable that I created above
// This indicates then that we need to use localStorage

// What we will also want to do is specify state and country since other states and countries have the same city names

// Country
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

// State
// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}
