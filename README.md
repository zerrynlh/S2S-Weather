# S2S-Weather

#### Video Demo:  <URL HERE>

### Description: 
For my CS50X final project, I wanted to make something that has utility and could be used in someone's daily life. So I decided to make a weather application.

This application uses JavaScript, a language that I was least familiar with, as well as Python and Flask. I chose Flask since it is a more lightweight web framework and my application did not require the use of tools like substantial form validation. This project pulls data from [Weather API](https://www.weatherapi.com/), [NewsData IO](https://newsdata.io/) as well as [Geoapify](https://www.geoapify.com/) for Geolocation which is a design choice that will be explained later. Since I was building a weather app for a computer science course, I thought it would be fitting to use the news API to display technology-related and environmental news.

### Implementation:

The reason I decided to take on learning JavaScript was because it's great for interactivity. Since it can be used for client-side scripting I thought it would be perfect for the feature that allows the user to select the degree scale of Fahrenheit of Celsius. Upon clicking the option from the dropdown menu, only the temperature-related elements update instead of reloading the entire page. To implement this, I used the localStorage property to store the user's preference.

Geoapify's API was used to get the user's IP location to immediately display data when visiting the page. IP location was utilized since other methods require the user's permission to obtain their location. This allows for instant weather display of weather in the user's area instead of having a blank display. Upon searching a location, the user's input is stored.

Features I decided to tackle for this project include displaying a 3-day forecast as well as an hourly forecast. The hourly forecast was the most challenging. The API returns the local time of the queried location as a date and time string format so I wrote a function to get only the hour of the local time from the JSON response to be used in the function of the hourly function. 

Another challenge to consider was writing a function that indexes to the next forecast day. The JSON response from the weather API returns a forecast that returns a list of forecast days which contain a list of hour-by-hour weather data. If a user is checking the hourly forecast at 11 PM, I needed to write the function that knows the end of the list has been reached and begins obtaining data from the next forecast day list which you will see in the file "hourly.js".

Additionally, I used Bootstrap 






