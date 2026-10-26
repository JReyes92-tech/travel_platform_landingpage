const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');

const home = document.getElementById('home');
const about = document.getElementById('about');
const contact = document.getElementById('contact');
const recommendations = document.getElementById('recommendations');

const recommendationsInput = document.getElementById('recommendationInput');

const resultDiv = document.getElementById('recommendationsResults');

const homeLink = document.getElementById("homeLink");
const aboutLink = document.getElementById("aboutLink");
const contactLink = document.getElementById("contactLink");

const searchMappings= {
    beach: "beaches",
    beaches: "beaches",
    temple: "temples",
    temples: "temples",
    country: "countries",
    countries: "countries"
};

const countryPairs = [
    ["Australia", "Japan"],
    ["Japan", "Brazil"],
    ["Brazil", "Australia"]
];

let searchCount = 0;
let travelData = null;

/*Load the JSON when the page opens */

fetch('travel_recommendation_api.json')
    .then(response => {
        if(!response.ok) {
            throw new Error("The JSON file could not be loaded");
        }

        return Response.json();
    })
    .then(data => {
         travelData = data;
    })
    .catch(error => {
        console.error('Error', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });

function travelRecommendations () {
    /*
     *Read the input here, not outside the function.
     *That way, the newest value is read on every search.
     */

    const input = recommendationInput.value.toLowerCase().trim();

    resultDiv.innerHTML = "";

    if(!searchMappings[input]){
        resultDiv.textContent = "Please enter a valid value: country, temple, or beach";

        return;
    }

    if(!travelData) {
        resultDiv.textContent = "The travel information has not loaded correctly";

        return;
    }

    const searchTerm = searchMappings[input];

    showRecommendationsView();

    if (searchTerm === "countries"){
        displayCountries();
    } else if (searchTerm === "temples") {
        displayTemples(travelData.temples);
    } else if (searchTerm === "beaches") {
        displayBeaches(travelData.beaches);
    }
}

function displayCountries() {
    const currentPair = countryPairs[searchCount];

    const heading = document.createElement("h2");
    heading.textContent = "Country Recommendations";
    resultDiv.appendChild(heading);

    currentPair.forEach(countryName => {
      const country = travelData.countries.find(country => country.name.toLowerCase() === countryName.toLowerCase());

      if(country) {
        displayCountry(country);
      }
    });
    
    searchCount = (searchCount + 1) % countryPairs.length;
}

function displayCountry(country) {
    const countryHeading = document.createElement("h3");
    countryHeading.textContent = country.name;
    countryHeading.classList.add("country-heading");

    resultDiv.appendChild(countryHeading);

    country.cities.forEach(city => {
        createRecommendationCard(city);
    })
}

function displayTemples(temples){
    const heading = document.createElement("h3");
    heading.textContent = "TEMPLES";

    resultDiv.appendChild(heading);

    temples.forEach(temple => {
        createRecommendationCard(temple);
    });
}

function displayBeaches(beaches) {
    const heading = document.createElement("h3");
    heading.textContent = "BEACHES";

    resultDiv.appendChild(heading);

    beaches.forEach(beach => {
        createRecommendationCard(beach);
    });  
}

function createRecommendationCard(destination){
    const card = document.createElement("div");
    card.classList.add("recommendation-card");

    const image = document.createElement("img");
    image.src = destination.imageUrl;
    image.alt = destination.name;

    const name = document.createElement("h3");
    name.textContent = destination.name;

    const description = document.createElement("p");
    description.textContent = destination.description;

    card.appendChild(image);
    card.appendChild(name);
    card.appendChild(description);

    resultDiv.appendChild(card);
}

function showRecommendationsView() {
    home.style.display = "none";
    about.style.display = "none";
    contact.style.display = "none";

    recommendations.style.display = "block";
}

function showNormalPage() {
    home.style.display = "block";
    about.style.display = "block";
    contact.style.display = "block";

    recommendations.style.display = "none";
}

btnSearch.addEventListener("click", travelRecommendations);

btnReset.addEventListener("click", function() {
    recommendationInput.value = "";
    resultDiv.innerHTML = "";
    showNormalPage();
});

homeLink.addEventListener("click", function () {
    showNormalPage();
});

aboutLink.addEventListener("click", function() {
    showNormalPage();
});

contactLink.addEventListener("click", function() {
    showNormalPage();
});
