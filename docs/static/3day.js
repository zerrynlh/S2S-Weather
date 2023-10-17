//Array to store weather codes
const Clear = [1000];
const partlyCloudy = [1003];
const Cloudy = [1006, 1009];
const Fog = [1030, 1135, 1147];
const Rainy = [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246];
const Snow = [1066, 1069, 1072, 1114, 1117, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264];
const Snowstorm = [1279, 1282];
const Thunderstorm = [1087, 1273, 1276];

async function threeDayDisplay (){

    await getUnit();

    let theIpCity = await getUserCity().catch(error => {
        console.error('Error fetching user city:', error);
    });

    let threeDayCity = document.getElementById("threedaycity").innerHTML;

    if (threeDayCity == null) {
        threeDayCity = theIpCity;
    }

fetch(`https://api.weatherapi.com/v1/forecast.json?key=0771b91fb53d46df9ed190439232209&q=${threeDayCity}&days=3&aqi=no&alerts=no`)
    .then((response) => {
        //Checks for valid response
        if (!response.ok) {
            document.getElementById("threedaycity").innerHTML = "City not found";
            document.getElementById("day0image").src = 'static/pictures/notfound.png';
            document.getElementById("day1image").src = 'static/pictures/notfound.png';
            document.getElementById("day2image").src = 'static/pictures/notfound.png';
            throw new Error(`HTTP error: ${response.status}`);
        }
        return response.json();
    })
    .then(json => {

        //Get current temperature unit
        let thisUnit = getUnit();

        let dayZero = getForecastDay0(json);
        let dayOne = getForecastDay1(json);
        let dayTwo = getForecastDay2(json);

        //Set header of 3-day forecast
        let threeDayHeader = document.getElementById("threedaycity")
        threeDayHeader.innerHTML = `Forecast: ${json.location.name}, ${json.location.country}`;

        //Select all elements to display day 0 data
        let dayZeroCondition = document.getElementById("day0condition");
        let dayZeroImage = document.getElementById("day0image");
        let dayZeroHigh = document.getElementById("day0high");
        let dayZeroLow = document.getElementById("day0low");
        let dayZeroRain = document.getElementById("day0rain");

        dayZeroCondition.innerHTML = dayZero.forecastText;
        setImage(dayZero, dayZeroImage);

        if (thisUnit == 'F') {
            dayZeroHigh.innerHTML = dayZero.maxTempF;
            dayZeroLow.innerHTML = dayZero.minTempF;
        }
        else{
            dayZeroHigh.innerHTML = dayZero.maxTempC;
            dayZeroLow.innerHTML = dayZero.minTempC;
        }

        dayZeroRain.innerHTML = `${dayZero.willItRain}%`;

        //Select all elements to display day 1 data
        let dayOneCondition = document.getElementById("day1condition");
        let dayOneImage = document.getElementById("day1image");
        let dayOneHigh = document.getElementById("day1high");
        let dayOneLow = document.getElementById("day1low");
        let dayOneRain = document.getElementById("day1rain");

        dayOneCondition.innerHTML = dayOne.forecastText;
        setImage(dayOne, dayOneImage);

        if (thisUnit == 'F') {
            dayOneHigh.innerHTML = dayOne.maxTempF;
            dayOneLow.innerHTML = dayOne.minTempF;
        }
        else {
            dayOneHigh.innerHTML = dayOne.maxTempC;
            dayOneLow.innerHTML = dayOne.minTempC;
        }

        dayOneRain.innerHTML = `${dayOne.willItRain}%`;

        //Select all elements to display day 2 data
        let dayTwoCondition = document.getElementById("day2condition");
        let dayTwoImage = document.getElementById("day2image");
        let dayTwoHigh = document.getElementById("day2high");
        let dayTwoLow = document.getElementById("day2low");
        let dayTwoRain = document.getElementById("day2rain");

        dayTwoCondition.innerHTML = dayTwo.forecastText;
        setImage(dayTwo, dayTwoImage);

        if (thisUnit == 'F') {
            dayTwoHigh.innerHTML = dayTwo.maxTempF;
            dayTwoLow.innerHTML = dayTwo.minTempF;
        }
        else {
            dayTwoHigh.innerHTML = dayTwo.maxTempC;
            dayTwoLow.innerHTML = dayTwo.minTempC;
        }
        dayTwoRain.innerHTML = `${dayTwo.willItRain}%`;

    })
};

//Intialization of 3 day display
document.addEventListener("DOMContentLoaded", async function initialThreeDay() {

    await threeDayDisplay();
    let theIndexUnit = await getUnit();
    await setTemperatureUnit(theIndexUnit); 
    await setScale();
});

//Call 3Day function on change on select menu
document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("degreeselection").addEventListener("change", async function() {
        threeDayDisplay();
        let theIndexUnit = await getUnit();
        await setTemperatureUnit(theIndexUnit); 
        await setScale();
    });
});

function getForecastDay0(json) {
    
    return {
        maxTempF: json.forecast.forecastday[0].day.maxtemp_f,
        minTempF: json.forecast.forecastday[0].day.mintemp_f,
        maxTempC: json.forecast.forecastday[0].day.maxtemp_c,
        minTempC: json.forecast.forecastday[0].day.mintemp_c,
        willItRain: json.forecast.forecastday[0].day.daily_chance_of_rain,
        willItSnow: json.forecast.forecastday[0].day.daily_chance_of_snow,
        forecastText: json.forecast.forecastday[0].day.condition.text,
        forecastCode: json.forecast.forecastday[0].day.condition.code
    };
};

function getForecastDay1(json) {
    
    return {
        maxTempF: json.forecast.forecastday[1].day.maxtemp_f,
        minTempF: json.forecast.forecastday[1].day.mintemp_f,
        maxTempC: json.forecast.forecastday[1].day.maxtemp_c,
        minTempC: json.forecast.forecastday[1].day.mintemp_c,
        willItRain: json.forecast.forecastday[1].day.daily_chance_of_rain,
        willItSnow: json.forecast.forecastday[1].day.daily_chance_of_snow,
        forecastText: json.forecast.forecastday[1].day.condition.text,
        forecastCode: json.forecast.forecastday[1].day.condition.code
    };
};

function getForecastDay2(json) {
    
    return {
        maxTempF: json.forecast.forecastday[2].day.maxtemp_f,
        minTempF: json.forecast.forecastday[2].day.mintemp_f,
        maxTempC: json.forecast.forecastday[2].day.maxtemp_c,
        minTempC: json.forecast.forecastday[2].day.mintemp_c,
        willItRain: json.forecast.forecastday[2].day.daily_chance_of_rain,
        willItSnow: json.forecast.forecastday[2].day.daily_chance_of_snow,
        forecastText: json.forecast.forecastday[2].day.condition.text,
        forecastCode: json.forecast.forecastday[2].day.condition.code
    };
};

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

function setImage(weatherJson, imageSource) {
    //Sets image based on condition codes and time of day of location

    //Partly cloudy condition
    if (partlyCloudy.includes(weatherJson.forecastCode)) {
            imageSource.src = "static/pictures/sun-cloudy.png";
    }
    //Clear condition
    else if (Clear.includes(weatherJson.forecastCode)) {
        imageSource.src = "static/pictures/sun-clear.png";
    }
    //Cloudy condition
    else if (Cloudy.includes(weatherJson.forecastCode)) {
        imageSource.src = "static/pictures/cloudy.png";
    }
    //Fog condition
    else if (Fog.includes(weatherJson.forecastCode)) {
        imageSource.src = "static/pictures/fog.png";
    }
    //Rainy condition
    else if (Rainy.includes(weatherJson.forecastCode)) {
        imageSource.src = "static/pictures/rain.png";
    }
    //Snow condition
    else if (Snow.includes(weatherJson.forecastCode)) {
        imageSource.src = "static/pictures/snow.png";
    }
    //Snowstorm condition
    else if (Snowstorm.includes(weatherJson.forecastCode)) {
        imageSource.src = "static/pictures/snow-storm.png";
    }
    //Thunderstorm condition
    else if (Thunderstorm.includes(weatherJson.forecastCode)) {
        imageSource.src = "static/pictures/thunderstorm.png";
    }
};