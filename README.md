# S2S Weather

#### Video Demo:
A video demo can be located [here](https://youtu.be/7sHlLLJPLZY).

![S2s Weather Image:](https://github.com/zerrynlh/S2S-Weather/blob/main/project/s2s-index.png)

### Description: 
For my CS50X final project, I wanted to make something that has utility and could be used in someone's daily life. So, I decided to make a weather application. This is Sunrise to Sunset Weather.

This application uses JavaScript as well as Python and Flask. I chose Flask since it is a more lightweight web framework and my application did not require the use of tools like substantial form validation. This project pulls data from [Weather API](https://www.weatherapi.com/), [NewsData IO](https://newsdata.io/) as well as [Geoapify](https://www.geoapify.com/) for Geolocation which is a design choice that will be explained later. Since I was building a weather app for a computer science course, I thought it would be fitting to use the news API to display technology-related and environmental news.

### Implementation:

The reason I decided to take on learning JavaScript was because it's great for interactivity. Since this language can be used for client-side scripting I thought it would be perfect for the feature that allows the user to select the degree scale of Fahrenheit of Celsius. Upon clicking the option from the dropdown menu, only the temperature-related elements update instead of reloading the entire page. To implement this, I used the localStorage property to store the user's preference.

Geoapify's API was used to get the user's IP location to immediately display data when visiting the page. IP location was utilized since other methods require the user's permission to obtain their location. This allows for instant weather display of weather in the user's area instead of having a blank display. Upon searching a location, the user's input is stored.

The JSON response from the weather API has over 40 weather codes. Instead of displaying 40 images for each condition, I decided to group them by similarity and declared arrays of weather codes that would each have an image assigned based on whether it was day or night. Weather images were obtained from [PNGTree](https://pngtree.com/).

Features I decided to tackle for this project include displaying a 3-day forecast as well as an hourly forecast. The hourly forecast was the most challenging. The API returns the local time of the queried location as a date and time string format, so I wrote a function to get only the hour of the local time from the JSON response to be used in the function of the hourly function. 

Another challenge to consider was writing a function that indexes to the next forecast day. The JSON response from the weather API returns a forecast that returns a list of forecast days which contain a list of hour-by-hour weather data. If a user is checking the hourly forecast at 11 PM, I needed to write the function that knows the end of the list has been reached and begins obtaining data from the next forecast day list which you will see in the file "hourly.js".

When writing the function to display the news articles, some of the articles returned did not contain an image. A recursive function seemed best-fitted to handle this as well as randomization via JavaScript’s Math object.

Additionally, I used the front-end framework Bootstrap to implement components and ensure that the web application looks beautiful across all devices.

#### Install dependencies:
>pip install -r requirements.txt

#### To run this application:
>python manage.py runserver
