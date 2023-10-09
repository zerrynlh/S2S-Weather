//Array to store weather codes
const Clear = [1000];
const partlyCloudy = [1003];
const Cloudy = [1006, 1009];
const Fog = [1030, 1135, 1147];
const Rainy = [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246];
const Snow = [1066, 1069, 1072, 1114, 1117, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264];
const Snowstorm = [1279, 1282];
const Thunderstorm = [1087, 1273, 1276];

async function getCurrentIndex() {

    await getUnit();

    let theIpCity = await getUserCity().catch(error => {
        console.error('Error fetching user city:', error);
    });

    let userCity2 = document.getElementById("thehiddencity").innerHTML;

    //Search parameters of URL for user's input
    const queryCurrentString = window.location.search;
    const urlCurrentParams = new URLSearchParams(queryCurrentString);
    let userCity = urlCurrentParams.get('thecity');

    if (userCity == null) {
        userCity = theIpCity;
    }

    if (userCity2 != null) {
        userCity = userCity2;
    }

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=0771b91fb53d46df9ed190439232209&q=${userCity}&days=1&aqi=no&alerts=no`)
    .then((response) => {
        //Checks for valid response
        if (!response.ok) {
            document.getElementById("currentindex").innerHTML = "City not found";
            document.getElementById("currentimage").src = 'static/pictures/notfound.png';
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(json => {

        //Get current temperature unit
        let thisUnit = getUnit();
        
        //Sets JSON response to variable
        let currentWeather = json;
        let currentWeatherJson = currentWeatherExpanded(currentWeather);

        //Display message with name of city
        let currentMessage = document.getElementById("currentindex");
        currentMessage.innerHTML = "Current Weather in " + json.location.name + ", " + json.location.country;

        let currentCondition = document.getElementById("currentcondition");
        currentCondition.innerHTML = currentWeatherJson.conditionText;

        let currentTemp = document.getElementById("currenttemp");
        if (thisUnit == "F") {
            currentTemp.innerHTML = "Current temperature: " + currentWeatherJson.tempFahr;
        }
        else {
            currentTemp.innerHTML = "Current temperature: " + currentWeatherJson.tempCels;
        }

        let currentHumid = document.getElementById("currenthumid");
        currentHumid.innerHTML = "Humidity: " + currentWeatherJson.humidity + "%";

        let currentLow = document.getElementById("currentlow");
        if (thisUnit == "F") {
            currentLow.innerHTML = "Low: " + currentWeatherJson.minTempF;
        }
        else {
            currentLow.innerHTML = "Low: " + currentWeatherJson.minTempC;
        }

        let currentHigh = document.getElementById("currenthigh");
        if (thisUnit == "F") {
            currentHigh.innerHTML = "High: " + currentWeatherJson.maxTempF;
        }
        else {
            currentHigh.innerHTML = "High: " + currentWeatherJson.maxTempC;
        }

        let currentFeels = document.getElementById("currentfeels");
        if (thisUnit == "F") {
            currentFeels.innerHTML = "Feels like: " + currentWeatherJson.tempFeelsF;
        }
        else {
            currentFeels.innerHTML = "Feels like: " + currentWeatherJson.tempFeelsC;
        }

        let currentWind = document.getElementById("currentwind");
        currentWind.innerHTML = "Wind: " + `${currentWeatherJson.windMph} MPH`;

        //Image display
        let currentImage = document.getElementById("currentimage");

        //Sets image based on condition codes and time of day of current location
        //Partly cloudy condition
        if (partlyCloudy.includes(currentWeatherJson.conditionCode)) {
            if (currentWeatherJson.dayOrNight === 1) { 
                currentImage.src = "static/pictures/sun-cloudy.png";
            }
            else if (currentWeatherJson.dayOrNight === 0) {
                currentImage.src = "static/pictures/night-cloudy.png";
            }
        }

        //Clear condition
        if (Clear.includes(currentWeatherJson.conditionCode)) {
            if (currentWeatherJson.dayOrNight === 1) { 
                currentImage.src = "static/pictures/sun-clear.png";
            }
            else if (currentWeatherJson.dayOrNight === 0) {
                currentImage.src = "static/pictures/moon-clear.png";
            }
        }

        //Fog condition
        if (Cloudy.includes(currentWeatherJson.conditionCode)) {
            currentImage.src = "static/pictures/cloudy.png";
        }

        //Fog condition
        if (Fog.includes(currentWeatherJson.conditionCode)) {
            currentImage.src = "static/pictures/fog.png";
        }

        //Rainy condition
        if (Rainy.includes(currentWeatherJson.conditionCode)) {
            currentImage.src = "static/pictures/rain.png";
        }

        //Snow condition
        if (Snow.includes(currentWeatherJson.conditionCode)) {
            currentImage.src = "static/pictures/snow.png";
        }

        //Snowstorm condition
        if (Snowstorm.includes(currentWeatherJson.conditionCode)) {
            currentImage.src = "static/pictures/snow-storm.png";
        }

        //Snowstorm condition
        if (Thunderstorm.includes(currentWeatherJson.conditionCode)) {
            currentImage.src = "static/pictures/thunderstorm.png";
        }
    }).catch(error => {
        console.error('Error:', error);
    });
};

//Intialization of current weather display
document.addEventListener("DOMContentLoaded", async function initialCurrent() {

    await getCurrentIndex();
    let theIndexUnit = await getUnit();
    await setTemperatureUnit(theIndexUnit); 
    await setScale();
});

//Call Current function on change on select menu
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("degreeselection").addEventListener("change", async function() {
        getCurrentIndex();
        let theIndexUnit = await getUnit();
        await setTemperatureUnit(theIndexUnit); 
        await setScale();
    });

});

function currentWeatherExpanded(json) {

    return {
        tempFahr: json.current.temp_f,
        tempCels: json.current.temp_c,
        tempFeelsF: json.current.feelslike_f,
        tempFeelsC: json.current.feelslike_c,
        conditionText: json.current.condition.text,
        conditionCode: json.current.condition.code,
        dayOrNight: json.current.is_day,
        humidity: json.current.humidity,
        willItRain: json.forecast.forecastday[0].day.daily_chance_of_rain,
        willItSnow: json.forecast.forecastday[0].day.daily_chance_of_snow,
        whatIsCondition: json.forecast.forecastday[0].day.condition.text,
        maxTempF: json.forecast.forecastday[0].day.maxtemp_f,
        maxTempC: json.forecast.forecastday[0].day.maxtemp_c,
        minTempF: json.forecast.forecastday[0].day.mintemp_f,
        minTempC: json.forecast.forecastday[0].day.mintemp_c,
        windMph: json.current.wind_mph,
        windKph: json.current.wind_kph
    };
};

//Gets user IP if user has not searched a city
function getUserCity() {

    let ipCity;
    let ipCountry;

    var requestOptions = {
        method: 'GET',
    };

    // Gets user's location via accessing userIP
    return fetch('https://api.geoapify.com/v1/ipinfo?&apiKey=3dfb3a2f14bc4fe4a6a78ad1be40fb46', requestOptions)
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

        return `${ipCity}, ${ipCountry}`;
    })
    .catch(error => {
        console.error('Error fetching user city:', error);
      });
};