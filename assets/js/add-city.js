const searchInput = document.querySelector(".form-control");
const searchButton = document.querySelector(".btn-primary");
const searchHistory = document.querySelector(".searchedCities");

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
    addCity();
})