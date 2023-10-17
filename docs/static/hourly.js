//Array to store weather codes
const Clear = [1000];
const partlyCloudy = [1003];
const Cloudy = [1006, 1009];
const Fog = [1030, 1135, 1147];
const Rainy = [1063, 1150, 1153, 1180, 1183, 1186, 1189, 1192, 1195, 1240, 1243, 1246];
const Snow = [1066, 1069, 1072, 1114, 1117, 1168, 1171, 1198, 1201, 1204, 1207, 1210, 1213, 1216, 1219, 1222, 1225, 1237, 1249, 1252, 1255, 1258, 1261, 1264];
const Snowstorm = [1279, 1282];
const Thunderstorm = [1087, 1273, 1276];

async function hourlyDisplay (){

    await getUnit();

    let theIpCity = await getUserCity().catch(error => {
        console.error('Error fetching user city:', error);
    });

    let hourlyCity = document.getElementById("hiddencity").innerHTML;

    if (hourlyCity == null) {
        hourlyCity = theIpCity;
    }

    fetch(`https://api.weatherapi.com/v1/forecast.json?key=0771b91fb53d46df9ed190439232209&q=${hourlyCity}&days=2&aqi=no&alerts=no`)
        .then((response) => {
            //Checks for valid response
            if (!response.ok) {

                document.getElementById("hourlycity").innerHTML = hourlyCity;
                throw new Error(`HTTP error: ${response.status}`);
            }
            return response.json();
    }).then(json => {

        let thisUnit = getUnit();

        let jsonHour = json.location.localtime;
        let localTime = getUserHour(jsonHour);
        let localTime24 = localTime.the24Hour;

        let hourlyJson = getHourlyData(json, localTime24)

        //Set header of hourly forecast
        let hourlyHeader = document.getElementById("hourlycity")
        hourlyHeader.innerHTML = `Hourly Forecast: ${json.location.name}, ${json.location.country}`;

        //Hour 1 display elements
        let hourlyTime0 = document.getElementById("time0");
        let hourlyCondition0 = document.getElementById("hour0condition");
        let hourlyImage0 = document.getElementById("hour0image");
        let hourlyTemp0 = document.getElementById("hour0temp");
        let hourlyRain0 = document.getElementById("hour0rain");

        setHourlyWeather (hourlyJson, thisUnit, localTime24, hourlyTime0, hourlyCondition0, hourlyImage0, hourlyTemp0, hourlyRain0, 0);

        //Hour 2 display elements
        let hourlyTime1 = document.getElementById("time1");
        let hourlyCondition1 = document.getElementById("hour1condition");
        let hourlyImage1 = document.getElementById("hour1image");
        let hourlyTemp1 = document.getElementById("hour1temp");
        let hourlyRain1 = document.getElementById("hour1rain");

        setHourlyWeather (hourlyJson, thisUnit, localTime24, hourlyTime1, hourlyCondition1, hourlyImage1, hourlyTemp1, hourlyRain1, 1);

        //Hour 3 display elements
        let hourlyTime2 = document.getElementById("time2");
        let hourlyCondition2 = document.getElementById("hour2condition");
        let hourlyImage2 = document.getElementById("hour2image");
        let hourlyTemp2 = document.getElementById("hour2temp");
        let hourlyRain2 = document.getElementById("hour2rain");

        setHourlyWeather (hourlyJson, thisUnit, localTime24, hourlyTime2, hourlyCondition2, hourlyImage2, hourlyTemp2, hourlyRain2, 2);

        //Hour 4 display elements
        let hourlyTime3 = document.getElementById("time3");
        let hourlyCondition3 = document.getElementById("hour3condition");
        let hourlyImage3 = document.getElementById("hour3image");
        let hourlyTemp3 = document.getElementById("hour3temp");
        let hourlyRain3 = document.getElementById("hour3rain");

        setHourlyWeather (hourlyJson, thisUnit, localTime24, hourlyTime3, hourlyCondition3, hourlyImage3, hourlyTemp3, hourlyRain3, 3);

        //Hour 5 display elements
        let hourlyTime4 = document.getElementById("time4");
        let hourlyCondition4 = document.getElementById("hour4condition");
        let hourlyImage4 = document.getElementById("hour4image");
        let hourlyTemp4 = document.getElementById("hour4temp");
        let hourlyRain4 = document.getElementById("hour4rain");

        setHourlyWeather (hourlyJson, thisUnit, localTime24, hourlyTime4, hourlyCondition4, hourlyImage4, hourlyTemp4, hourlyRain4, 4);

        //Hour 6 display elements
        let hourlyTime5 = document.getElementById("time5");
        let hourlyCondition5 = document.getElementById("hour5condition");
        let hourlyImage5 = document.getElementById("hour5image");
        let hourlyTemp5 = document.getElementById("hour5temp");
        let hourlyRain5 = document.getElementById("hour5rain");

        setHourlyWeather (hourlyJson, thisUnit, localTime24, hourlyTime5, hourlyCondition5, hourlyImage5, hourlyTemp5, hourlyRain5, 5);

        //Hour 7 display elements
        let hourlyTime6 = document.getElementById("time6");
        let hourlyCondition6 = document.getElementById("hour6condition");
        let hourlyImage6 = document.getElementById("hour6image");
        let hourlyTemp6 = document.getElementById("hour6temp");
        let hourlyRain6 = document.getElementById("hour6rain");

        setHourlyWeather (hourlyJson, thisUnit, localTime24, hourlyTime6, hourlyCondition6, hourlyImage6, hourlyTemp6, hourlyRain6, 6);

        //Hour 8 display elements
        let hourlyTime7 = document.getElementById("time7");
        let hourlyCondition7 = document.getElementById("hour7condition");
        let hourlyImage7 = document.getElementById("hour7image");
        let hourlyTemp7 = document.getElementById("hour7temp");
        let hourlyRain7 = document.getElementById("hour7rain");

        setHourlyWeather (hourlyJson, thisUnit, localTime24, hourlyTime7, hourlyCondition7, hourlyImage7, hourlyTemp7, hourlyRain7, 7);

        //Hour 9 display elements
        let hourlyTime8 = document.getElementById("time8");
        let hourlyCondition8 = document.getElementById("hour8condition");
        let hourlyImage8 = document.getElementById("hour8image");
        let hourlyTemp8 = document.getElementById("hour8temp");
        let hourlyRain8 = document.getElementById("hour8rain");

        setHourlyWeather (hourlyJson, thisUnit, localTime24, hourlyTime8, hourlyCondition8, hourlyImage8, hourlyTemp8, hourlyRain8, 8);

        //Hour 10 display elements
        let hourlyTime9 = document.getElementById("time9");
        let hourlyCondition9 = document.getElementById("hour9condition");
        let hourlyImage9 = document.getElementById("hour9image");
        let hourlyTemp9 = document.getElementById("hour9temp");
        let hourlyRain9 = document.getElementById("hour9rain");

        setHourlyWeather (hourlyJson, thisUnit, localTime24, hourlyTime9, hourlyCondition9, hourlyImage9, hourlyTemp9, hourlyRain9, 9);

        //Hour 11 display elements
        let hourlyTime10 = document.getElementById("time10");
        let hourlyCondition10 = document.getElementById("hour10condition");
        let hourlyImage10 = document.getElementById("hour10image");
        let hourlyTemp10 = document.getElementById("hour10temp");
        let hourlyRain10 = document.getElementById("hour10rain");

        setHourlyWeather (hourlyJson, thisUnit, localTime24, hourlyTime10, hourlyCondition10, hourlyImage10, hourlyTemp10, hourlyRain10, 10);

        //Hour 12 display elements
        let hourlyTime11 = document.getElementById("time11");
        let hourlyCondition11 = document.getElementById("hour11condition");
        let hourlyImage11 = document.getElementById("hour11image");
        let hourlyTemp11 = document.getElementById("hour11temp");
        let hourlyRain11 = document.getElementById("hour11rain");

        setHourlyWeather (hourlyJson, thisUnit, localTime24, hourlyTime11, hourlyCondition11, hourlyImage11, hourlyTemp11, hourlyRain11, 11);

    })
};

document.addEventListener("DOMContentLoaded", async function() {
    hourlyDisplay();
    let theIndexUnit = await getUnit();
    await setTemperatureUnit(theIndexUnit); 
    await setScale();
});

document.addEventListener("DOMContentLoaded", function() {

    document.getElementById("degreeselection").addEventListener("change", async function() {
        hourlyDisplay();
        let theIndexUnit = await getUnit();
        await setTemperatureUnit(theIndexUnit); 
        await setScale();
    });
});

//Get forecast hour by hour
function getHourlyData(json, theHour) {

    //Variable i tracks the day, initialized to first day

    //Variable j that stores the digit of the hour of the user's timezone in 24-hour
    let j = theHour + 1;

    const Rain = [];
    const Text = [];
    const weatherCode = [];
    const nightAndDay = [];
    const Fahr = [];
    const Cels = [];

    /*Loops through the "hour" array from the JSON response, checks if the value is null
    and if the value is null (meaning end of list has been reached), the value of i (the day)
    increases by 1 to begin collecting data from the next day
    */
    for (let i = 0; i < 2; i++) {
        for (j; j < json.forecast.forecastday[i].hour.length; j++) {

            let theRain = json.forecast.forecastday[i].hour[j].chance_of_rain;
            let theForecast = json.forecast.forecastday[i].hour[j].condition.text;
            let theCode = json.forecast.forecastday[i].hour[j].condition.code;
            let dayNight =  json.forecast.forecastday[i].hour[j].is_day;
            let tempF = json.forecast.forecastday[i].hour[j].temp_f;
            let tempC = json.forecast.forecastday[i].hour[j].temp_c;

            Rain.push(theRain);
            Text.push(theForecast);
            weatherCode.push(theCode);
            nightAndDay.push(dayNight)
            Fahr.push(tempF);
            Cels.push(tempC);

            if (Rain.length == 12) {
                i = 2;
                break;
            }
        }
        /*Resets j to 0 if end of forecast day list is reached so new data can begin 
        collecting from next day after i increases
        */
         j = 0;
    }

    return {
        willItRain: Rain,
        forecastText: Text,
        forecastCode: weatherCode,
        dayOrNight: nightAndDay,
        tempFahr: Fahr,
        tempCels: Cels
    }
};

//Function to get the hour of time returned from the JSON response
function getUserHour(text) {

    let myHourStd;

    let myHour = text.split(" ");
    myHour = myHour[1];
    myHour = myHour.split(":");
    myHour = parseInt(myHour[0]);
    
    myHourStd = myHour
    if (myHourStd > 12) {
        myHourStd = myHourStd - 12;
    }

    return {
        the12Hour: myHourStd,
        the24Hour: myHour
    }
};

//Get inital city using IP
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

function setImage(weatherJson, imageSource, num) {
    //Sets image based on condition codes and time of day of location

    //Partly cloudy condition
    if (partlyCloudy.includes(weatherJson.forecastCode[num])) {
        if (weatherJson.dayOrNight[num] === 1) { 
            imageSource.src = "static/pictures/sun-cloudy.png";
        }
        else if (weatherJson.dayOrNight[num] === 0) {
            imageSource.src = "static/pictures/night-cloudy.png";
        }
    }
    //Clear condition
    else if (Clear.includes(weatherJson.forecastCode[num])) {
        if (weatherJson.dayOrNight[num] === 1) { 
            imageSource.src = "static/pictures/sun-clear.png";
        }
        else if (weatherJson.dayOrNight[num] === 0) {
            imageSource.src = "static/pictures/moon-clear.png";
        }
    }
    //Cloudy condition
    else if (Cloudy.includes(weatherJson.forecastCode[num])) {
        imageSource.src = "static/pictures/cloudy.png";
    }
    //Fog condition
    else if (Fog.includes(weatherJson.forecastCode[num])) {
        imageSource.src = "static/pictures/fog.png";
    }
    //Rainy condition
    else if (Rainy.includes(weatherJson.forecastCode[num])) {
        imageSource.src = "static/pictures/rain.png";
    }
    //Snow condition
    else if (Snow.includes(weatherJson.forecastCode[num])) {
        imageSource.src = "static/pictures/snow.png";
    }
    //Snowstorm condition
    else if (Snowstorm.includes(weatherJson.forecastCode[num])) {
        imageSource.src = "static/pictures/snow-storm.png";
    }
    //Thunderstorm condition
    else if (Thunderstorm.includes(weatherJson.forecastCode[num])) {
        imageSource.src = "static/pictures/thunderstorm.png";
    }
};

//Takes JSON response, temperature unit from local storage and HTML elements to set weather data
function setHourlyWeather (theJson, someUnit, theirTime, theTime, theCondition, theImage, theTemp, theChanceRain, num) {

    let thisTime = theirTime + num + 1;

    if (thisTime >= 24) {
        thisTime -= 24;
        if (thisTime == 0){
            theTime.innerHTML = `12 AM`;
        }
        else {
        theTime.innerHTML = `${thisTime} AM`;
        }
    } 
    else if (thisTime < 12) {
        theTime.innerHTML = `${thisTime} AM`;
    } 
    else if (thisTime >= 12 && thisTime < 24) {
        thisTime -= 12;
        if (thisTime == 0){
            theTime.innerHTML = `12 PM`;
        }
        else {
        theTime.innerHTML = `${thisTime} PM`;
        }
    } 
    else {
        theTime.innerHTML = null;
    }

    theCondition.innerHTML = theJson.forecastText[num];

    setImage(theJson, theImage, num);

    if (someUnit == 'F') {
        theTemp.innerHTML = theJson.tempFahr[num];
    }
    else {
        theTemp.innerHTML = theJson.tempCels[num];
    }

    theChanceRain.innerHTML = `${theJson.willItRain[num]}%`;

};