import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [ovenTemp, setOvenTemp] = useState(180); // Default oven temperature in Celsius
  const [ovenTime, setOvenTime] = useState(60); // Default oven time in minutes
  const [tempUnit, setTempUnit] = useState("C"); // Temperature unit, 'C' for Celsius, 'F' for Fahrenheit
  const [airfryerTemp, setAirfryerTemp] = useState(0);
  const [airfryerTime, setAirfryerTime] = useState(0);

  // Convert Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => (celsius * 9) / 5 + 32;

  // Convert Fahrenheit to Celsius
  const fahrenheitToCelsius = (fahrenheit) => ((fahrenheit - 32) * 5) / 9;

  useEffect(() => {
    let convertedTemp = ovenTemp;
    if (tempUnit === "F") {
      convertedTemp = fahrenheitToCelsius(ovenTemp);
    }
    convertedTemp = convertedTemp - 20; // Airfryer conversion in Celsius
    const convertedTime = ovenTime - ovenTime * 0.2;

    if (tempUnit === "F") {
      convertedTemp = celsiusToFahrenheit(convertedTemp);
    }

    setAirfryerTemp(Math.round(convertedTemp));
    setAirfryerTime(Math.round(convertedTime));
  }, [ovenTemp, ovenTime, tempUnit]);

  const handleTabClick = (unit) => {
    setTempUnit(unit);
    // Convert the current ovenTemp to the new unit
    if (unit === "F" && tempUnit !== "F") {
      setOvenTemp(Math.round(celsiusToFahrenheit(ovenTemp)));
    } else if (unit === "C" && tempUnit !== "C") {
      setOvenTemp(Math.round(fahrenheitToCelsius(ovenTemp)));
    }
  };

  return (
    <div className="App">
      <h2>Oven to Airfryer Cooking Time Converter</h2>
      <div className="tabs">
        <button
          className={`tab ${tempUnit === "C" ? "active" : ""}`}
          onClick={() => handleTabClick("C")}
        >
          Celsius
        </button>
        <button
          className={`tab ${tempUnit === "F" ? "active" : ""}`}
          onClick={() => handleTabClick("F")}
        >
          Fahrenheit
        </button>
      </div>
      <div>
        <label>Oven Temperature ({tempUnit === "C" ? "°C" : "°F"}): </label>
        <input
          type="range"
          min={tempUnit === "C" ? "100" : Math.round(celsiusToFahrenheit(100))}
          max={tempUnit === "C" ? "250" : Math.round(celsiusToFahrenheit(250))}
          value={ovenTemp}
          onChange={(e) => setOvenTemp(e.target.value)}
        />
        {ovenTemp} {tempUnit === "C" ? "°C" : "°F"}
      </div>
      <div>
        <label>Oven Cooking Time (minutes): </label>
        <input
          type="range"
          min="10"
          max="120"
          value={ovenTime}
          onChange={(e) => setOvenTime(e.target.value)}
        />
        {ovenTime} minutes
      </div>
      <div>
        <h3>Converted Airfryer Settings:</h3>
        <p>
          Temperature: {airfryerTemp} {tempUnit === "C" ? "°C" : "°F"}
        </p>
        <p>Time: {airfryerTime} minutes</p>
      </div>
    </div>
  );
}

export default App;
