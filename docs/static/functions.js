function setHourlyWeather (theJson, someUnit, theTime, theCondition, theImage, theTemp, theChanceRain, num) {

    let thisTime = localTime24 + 1

    if (thisTime > 12) {
        thisTime = thisTime - 12;
        theTime.innerHTML = `${thisTime} PM`
    }
    else {
        theTime.innerHTML = `${thisTime} AM`
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

if (thisTime >= 24) {
    thisTime = thisTime - 24;
    theTime.innerHTML = `${thisTime} PM`;
}
else if (thisTime < 12 && thisTime > 0) {
    theTime.innerHTML = `${thisTime} AM`;
}
else if (thisTime == 0) {
    theTime.innerHTML = `12 AM`;
}