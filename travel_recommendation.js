const btnSearch = document.getElementById('btnSearch');
const btnReset = document.getElementById('btnReset');
const home = document.getElementById('home');
const about = document.getElementById('about');
const contact = document.getElementById('contact');
const recommendatiosns = document.getElementById('recommendations');

function travelRecommendations () {
    const searchMappings= {
        beach: "beaches",
        beaches: "beaches",
        temple: "temples",
        temples: "temples",
        country: "countries",
        countries: "countries"
    };
    const resultDiv = document.getElementById('recommnedationsResults');
    let input = document.getElementById('recommnedationInput').value.toLowerCase().trim();
    if (input === '' || input != searchMappings.value){
        console.log("Please enter a valid value, in this case enter country, temple or beach");
    }
    else {
        const searchTerm = searchMappings[input];
    }
    resultDiv.innerHTML = '';



    fetch('travel_recommendation_api.json')
    .then(repsonse => repsonse.json())
    .then(data => {
        const countries = data.countries.find(item => item.name.toLowerCase() === searchTerm);
        
    })

}