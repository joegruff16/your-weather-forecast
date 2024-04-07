// My API key for making API calls: 8a4161e110974484d73136be7dd84581

// Need to store my API key in a variable
const APIKey = "8a4161e110974484d73136be7dd84581";

// Since we want our users to be able to search by city location to find the weather
// We need to collect the user's input to store in a variable for city
let city;

// https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={8a4161e110974484d73136be7dd84581}

// What we will also want to do is specify state and country since other states and countries have the same city names

// Country
// https://api.openweathermap.org/data/2.5/weather?q={city name},{country code}&appid={API key}

// State
// https://api.openweathermap.org/data/2.5/weather?q={city name},{state code},{country code}&appid={API key}