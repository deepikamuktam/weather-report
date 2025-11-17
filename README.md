🌤️ Weather Report Generator

This Node.js project fetches weather data for multiple cities using the OpenWeatherMap API, generates an HTML report using Handlebars, and converts it into a PDF using Puppeteer.


🚀 Features

1.Fetches weather data for 5 cities

2.Shows:

    City name
    
    Temperature
    
    Weather description
    
    Humidity
    
    Calculates average temperature and average humidity
    
3.Generates a styled HTML report

4.Converts the HTML into a PDF file

5.Saves PDF 



📦Requirements

1.Install dependencies:

  ` npm install axios puppeteer dotenv handlebars `


2.Install Chromium for Puppeteer:

  `npx puppeteer browsers install chrome`


3.Create a .env file:

  API_KEY=YOUR_OPENWEATHER_API_KEY

▶️ Run the Application
    `node index.js`




The generated PDF will be saved in your reports/ folder.

📁 Important Files

 - index.js — main script

 -  templates/report.hbs — HTML template

 - styles/style.css — styling for the report

 - .env — stores your API key



📝 Output

A sample PDF like:

weather_report_2025-11-14.pdf
