import axios from "axios";
import fs from "fs";
import path from "path";
import puppeteer from "puppeteer";
import Handlebars from "handlebars";
import dotenv from "dotenv";

dotenv.config();

const __dirname = path.resolve(); 

const API_KEY = process.env.API_KEY;
const cities = ["Hyderabad", "Bengaluru", "Mumbai", "Chennai", "Anantapur"];

async function fetchWeather(city) {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;
  const res = await axios.get(url);
  const data = res.data;

  return {
    name: data.name,
    temp: data.main.temp.toFixed(1),
    description: data.weather[0].description,
    humidity: data.main.humidity,
  };
}

async function generateReport() {
  try {
    console.log("Fetching weather data...");
    const results = await Promise.all(cities.map(fetchWeather));

    const avgTemp =
      (results.reduce((sum, c) => sum + parseFloat(c.temp), 0) / results.length).toFixed(1);

    const avgHumidity =
      (results.reduce((sum, c) => sum + c.humidity, 0) / results.length).toFixed(1);

    // Load Handlebars Template
    const templatePath = path.join(__dirname, "templates", "report.hbs");
    const templateSource = fs.readFileSync(templatePath, "utf-8");
    const template = Handlebars.compile(templateSource);

    // Load CSS
    const cssPath = path.join(__dirname, "styles", "style.css");
    const cssContent = fs.readFileSync(cssPath, "utf-8");

    // Render HTML
    const html = template({
      cities: results,     
      avgTemp,
      avgHumidity,
      timestamp: new Date().toLocaleString(),
      css: cssContent
    });

    // Generate PDF
    const pdfPath = path.join(__dirname, `weather_report_${new Date().toISOString().split("T")[0]}.pdf`);

    const browser = await puppeteer.launch();
    const page = await browser.newPage();

    await page.setContent(html, { waitUntil: "networkidle0" });
    await page.pdf({ path: pdfPath, format: "A4" });

    await browser.close();

    console.log("✅ Weather report generated:", pdfPath);
  } catch (error) {
    console.error("❌ Error:", error.message);
  }
}

generateReport();
