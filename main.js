function convertTemperature() {
  const inputEl = document.getElementById('temperatureInput');
  const fromUnit = document.getElementById('fromUnit').value.toLowerCase();
  const toUnit = document.getElementById('toUnit').value.toLowerCase();
  const resultEl = document.getElementById('resultText');

  const rawInput = inputEl.value.trim();
  const temperature = parseFloat(rawInput);

  // Function to display messages
  const showResult = (message, type = "info") => {
    resultEl.textContent = message;
    resultEl.className = `result ${type} show`;
    resultEl.setAttribute("aria-live", "polite");

    resultEl.style.display = "block";
    requestAnimationFrame(() => {
      resultEl.style.opacity = "1";
      resultEl.style.visibility = "visible";
      resultEl.style.transform = "translateY(0)";
    });
  };

  // Function to hide result
  const hideResult = () => {
    resultEl.textContent = "";
    resultEl.className = "result";
    resultEl.style.opacity = "0";
    resultEl.style.visibility = "hidden";
    resultEl.style.transform = "translateY(10px)";
  };

  // Input validation
  if (!rawInput) {
    showResult("⚠️ Please enter a temperature value.", "error");
    return;
  }

  if (isNaN(temperature)) {
    showResult("⚠️ Temperature must be a numeric value.", "error");
    return;
  }

  // Unit conversion maps
  const toCelsius = {
    celsius: t => t,
    fahrenheit: t => (t - 32) * 5 / 9,
    kelvin: t => t - 273.15,
  };

  const fromCelsius = {
    celsius: t => t,
    fahrenheit: t => (t * 9 / 5) + 32,
    kelvin: t => t + 273.15,
  };

  // Validate units
  if (!toCelsius[fromUnit] || !fromCelsius[toUnit]) {
    showResult("⚠️ Please select valid temperature units.", "error");
    return;
  }

  // Kelvin constraint
  if (fromUnit === 'kelvin' && temperature < 0) {
    showResult("⚠️ Temperature in Kelvin cannot be below 0 K.", "error");
    return;
  }

  // No conversion needed
  if (fromUnit === toUnit) {
    showResult(`ℹ️ ${temperature.toFixed(2)}° ${formatUnit(toUnit)} (no conversion needed)`, "success");
    return;
  }

  // Perform conversion
  const tempInCelsius = toCelsius[fromUnit](temperature);
  const convertedTemp = fromCelsius[toUnit](tempInCelsius);

  // Final validation for Kelvin
  if (toUnit === 'kelvin' && convertedTemp < 0) {
    showResult("⚠️ Resulting temperature in Kelvin cannot be below 0 K.", "error");
    return;
  }

  showResult(`${convertedTemp.toFixed(2)}° ${formatUnit(toUnit)}`, "success");
}

// Format unit label for readability
function formatUnit(unit) {
  return {
    celsius: "Celsius",
    fahrenheit: "Fahrenheit",
    kelvin: "Kelvin",
  }[unit] || unit.charAt(0).toUpperCase() + unit.slice(1);
}
