function convertTemperature() {
  const inputEl = document.getElementById('temperatureInput');
  const fromUnit = document.getElementById('fromUnit').value.toLowerCase();
  const toUnit = document.getElementById('toUnit').value.toLowerCase();
  const resultEl = document.getElementById('resultText');

  const rawInput = inputEl.value.trim();
  const temperature = parseFloat(rawInput);

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

  const hideResult = () => {
    resultEl.textContent = "";
    resultEl.className = "result";
    resultEl.style.opacity = "0";
    resultEl.style.visibility = "hidden";
    resultEl.style.transform = "translateY(10px)";
  };

  // Validate input
  if (!rawInput || isNaN(temperature)) {
    showResult("⚠️ Please enter a valid numeric temperature.", "error");
    return;
  }

  // Supported units
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
  if (!(fromUnit in toCelsius) || !(toUnit in fromCelsius)) {
    showResult("⚠️ Please select valid temperature units.", "error");
    return;
  }

  // Validate Kelvin input
  if (fromUnit === 'kelvin' && temperature < 0) {
    showResult("⚠️ Temperature in Kelvin cannot be below 0 K.", "error");
    return;
  }

  // If no conversion needed
  if (fromUnit === toUnit) {
    showResult(`ℹ️ ${temperature.toFixed(2)}° ${formatUnit(toUnit)} (no conversion needed)`, "success");
    return;
  }

  const tempInCelsius = toCelsius[fromUnit](temperature);
  const convertedTemp = fromCelsius[toUnit](tempInCelsius);

  // Check converted result for invalid Kelvin
  if (toUnit === 'kelvin' && convertedTemp < 0) {
    showResult("⚠️ Resulting temperature in Kelvin cannot be below 0 K.", "error");
    return;
  }

  showResult(`${convertedTemp.toFixed(2)}° ${formatUnit(toUnit)}`, "success");
}

// Properly formats unit labels
function formatUnit(unit) {
  const unitMap = {
    celsius: "Celsius",
    fahrenheit: "Fahrenheit",
    kelvin: "Kelvin",
  };
  return unitMap[unit] || unit.charAt(0).toUpperCase() + unit.slice(1);
}
