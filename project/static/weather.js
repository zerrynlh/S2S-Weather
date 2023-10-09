//Array to store weather codes
const Clear = [1000];
const partlyCloudy = [1003];
const Cloudy = [1006, 1009];
const Fog = [1030, 1135, 1147];
const Rainy = [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246];
const Snow = [1066, 1069, 1072, 1114, 1117, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264];
const Snowstorm = [1279, 1282];
const Thunderstorm = [1087, 1273, 1276];

//Handles setting current weather based on IP location, function for default page
async function indexWeatherHandler() {

    let ipCity;
    let ipCountry;

    var requestOptions = {
        method: 'GET',
    };

    // Gets user's location via accessing userIP
    fetch('https://api.geoapify.com/v1/ipinfo?&apiKey=3dfb3a2f14bc4fe4a6a78ad1be40fb46', requestOptions)
    .then((response) => {
        // Checks for valid response
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(json => {
        // Sets city name and country to the values in JSON response
        ipCity = json.city.name;
        ipCountry = json.country.name;

        let cityIpText = document.getElementById("userIPcity");
        cityIpText.innerHTML = "Current Weather in " + ipCity + ", " + ipCountry;

        // Fetches weather data using city from IP response
        return fetch(`https://api.weatherapi.com/v1/current.json?key=0771b91fb53d46df9ed190439232209&q=${ipCity},${ipCountry}&aqi=no`);
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(json => {

        let thisUnit = getUnit();

        //Set variable for JSON response and return data
        let ipWeatherJson = getCurrentWeatherData(json);

        //Sets condition text
        let ipConditionText = document.getElementById("ipcondition");
        ipConditionText.innerHTML = ipWeatherJson.conditionText;

        //Displays current temparature
        let ipCurrentTempText = document.getElementById("ipcurrenttemp");
        setTemp(thisUnit, ipCurrentTempText, ipWeatherJson);

        // Display feels like temperature
        let ipFeelsLikeText = document.getElementById("ipfeelslike");
        setFeels(thisUnit, ipFeelsLikeText, ipWeatherJson);

        let ipHumidityText = document.getElementById("iphumid");
        ipHumidityText.innerHTML = `${ipWeatherJson.humidity}%`;

        let ipImage = document.getElementById("ipimage");

        //Sets image based on condition codes and time of dayof IP location
        //Partly cloudy condition
        if (partlyCloudy.includes(ipWeatherJson.conditionCode)) {
            if (ipWeatherJson.dayOrNight === 1) { 
                ipImage.src = "static/pictures/sun-cloudy.png";
            }
            else if (ipWeatherJson.dayOrNight === 0) {
                ipImage.src = "static/pictures/night-cloudy.png";
            }
        }

        //Clear condition
        if (Clear.includes(ipWeatherJson.conditionCode)) {
            if (ipWeatherJson.dayOrNight === 1) { 
                ipImage.src = "static/pictures/sun-clear.png";
            }
            else if (ipWeatherJson.dayOrNight === 0) {
                ipImage.src = "static/pictures/moon-clear.png";
            }
        }

        //Cloudy condition
        if (Cloudy.includes(ipWeatherJson.conditionCode)) {
            ipImage.src = "static/pictures/cloudy.png";
        }

        //Fog condition
        if (Fog.includes(ipWeatherJson.conditionCode)) {
            ipImage.src = "static/pictures/fog.png";
        }

         //Rainy condition
         if (Rainy.includes(ipWeatherJson.conditionCode)) {
            ipImage.src = "static/pictures/rain.png";
        }

        //Snow condition
        if (Snow.includes(ipWeatherJson.conditionCode)) {
            ipImage.src = "static/pictures/snow.png";
        }

        //Snowstorm condition
        if (Snowstorm.includes(ipWeatherJson.conditionCode)) {
            ipImage.src = "static/pictures/snow-storm.png";
        }

        //Thunderstorm condition
        if (Thunderstorm.includes(ipWeatherJson.conditionCode)) {
            ipImage.src = "static/pictures/thunderstorm.png";
        }

    })
    .catch(error => {
        console.error('Error:', error);
    });
};

//Initialization of displaying weather of homepage
document.addEventListener("DOMContentLoaded", async function initialIndex() {

    await indexWeatherHandler();
    let theIndexUnit = await getUnit();
    await setTemperatureUnit(theIndexUnit); 
    await setScale();
});

//Call 3Day function on change on select menu
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("degreeselection").addEventListener("change", async function() {
        indexWeatherHandler();
        let theIndexUnit = await getUnit();
        await setTemperatureUnit(theIndexUnit); 
        await setScale();
    });
});

//Handles fetching article data
document.addEventListener("DOMContentLoaded", articleHandler())

function articleHandler() {

    //Random selection of article number
    let envrNum;
    let techNum;

    //Fetches environmental news
    fetch('https://newsdata.io/api/1/news?apikey=pub_299742dd85b76e3663e0228ccb8ac0cbf2a86&category=environment&language=en')
    .then((response) => {
        //Checks for valid response
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(json => {
        
        //Gets length of JSON results
        let envrLength = json.results.length;

        /*Recursive function to choose a random index that is less than the length of the results array in
        the JSON response*/
        function envrRandom() {

            envrNum = Math.floor(Math.random() * 50);
            if (envrNum >= envrLength) {
                return envrRandom();
            }

            //Chooses random environmental article and checks that an image exists
            let envrArticle = json.results[envrNum];

            if (envrArticle.image_url === null) {
                return envrRandom();
                }
                return envrArticle;
        }

        //Function called and environmental news article displayed
        var chosenEnvr = envrRandom();
        var envrDisplay = document.getElementById("envr");
        envrDisplay.innerHTML = chosenEnvr.title;

        //Image from article is displayed
        var envrImage = document.getElementById("envrimage");
        envrImage.src = chosenEnvr.image_url;

        //Updates href to have appropriate link
        var envrLink = document.getElementById("envrlink")
        envrLink.href = chosenEnvr.link;

    }).catch(error => {
        console.error('Error fetching environmental news:', error);
    });

    //Fetches techonology article
    fetch('https://newsdata.io/api/1/news?apikey=pub_299742dd85b76e3663e0228ccb8ac0cbf2a86&category=technology&language=en')
    .then((response) => {
        //Checks for valid response
        if (!response.ok) {
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(json => {
        
        //Gets length of JSON results
        let techLength = json.results.length;

        /*Recursive function to choose a random index that is less than the length of the results array in
        the JSON response*/
        function techRandom() {

            techNum = Math.floor(Math.random() * 50);
            if (techNum >= techLength) {
                return techRandom();
            }

            //Chooses random technology article and checks that an image exists
            let techArticle = json.results[techNum];

            if (techArticle.image_url === null) {
                return techRandom();
                }
                return techArticle;
        }

        //Function called and tech news article displayed
        var chosenTech = techRandom();
        var techDisplay = document.getElementById("tech");
        techDisplay.innerHTML = chosenTech.title;

        //Image from article is displayed
        var techImage = document.getElementById("techimage");
        techImage.src = chosenTech.image_url;

        //Updates href to have appropriate link
        var techLink = document.getElementById("techlink")
        techLink.href = chosenTech.link;
        
    }).catch(error => {
        console.error('Error fetching technology news:', error);
    });
};

//Custom functions
function getCurrentWeatherData(json) {

    return {
        tempFahr: json.current.temp_f,
        tempCels: json.current.temp_c,
        tempFeelsF: json.current.feelslike_f,
        tempFeelsC: json.current.feelslike_c,
        conditionText: json.current.condition.text,
        conditionCode: json.current.condition.code,
        dayOrNight: json.current.is_day,
        humidity: json.current.humidity
    };
};

function setTemp(someUnit, someText, someJson) {
    if (someUnit == 'F') {
        someText.innerHTML = someJson.tempFahr;
    }
    else {
        someText.innerHTML = someJson.tempCels;
    }
};

function setFeels(thatUnit, thatText, thatJson) {
    if (thatUnit == 'F') {
        thatText.innerHTML = thatJson.tempFeelsF;
    }
    else {
        thatText.innerHTML = thatJson.tempFeelsC;
    }
};