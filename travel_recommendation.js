const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const home = document.getElementById('home');
const about = document.getElementById('about');
const contact = document.getElementById('contact');
const recommendations = document.getElementById('recommendations');
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
const resultDiv = document.getElementById('recommendationsResults');
let input = document.getElementById('recommendationInput').value.toLowerCase().trim();
resultDiv.innerHTML = '';

if(!searchMappings[input]){
    console.log("Please tner a valid value: country, tenple or beach");
    return;
}

const searchTerm = searchMappings[input];

let travelData;

fetch('travel_recommendation_api.json')
    .then(repsonse => repsonse.json())
    .then(data => {
         travelData = data;
    })
    .catch(error => {
        console.error('Error', error);
        resultDiv.innerHTML = 'An error occurred while fetching data.';
    });

function travelRecommendations () {
    const currentPair = countryPairs[searchCount];
          
    currentPair.forEach(countryName => {
      const country = travelData.countries.find(country => country.name.toLowerCase() === countryName.toLowerCase());

      if(country) {
        displayCountry(country);
      }
    });
    
    searchCount = (searchCount + 1) % countryPairs.length;
}

function displayCountry(country) {
    const card = document.createElement("div");
    card.classList.add("recommendations-card");

    
}