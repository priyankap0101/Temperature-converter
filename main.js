function convertTemperature() {
  const inputEl = document.getElementById('temperatureInput');
  const fromUnit = document.getElementById('fromUnit').value.toLowerCase();
  const toUnit = document.getElementById('toUnit').value.toLowerCase();
  const resultEl = document.getElementById('resultText');

  const rawInput = inputEl.value.trim();
  const temperature = parseFloat(rawInput);

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

  const formatUnit = unit => ({
    celsius: "Celsius",
    fahrenheit: "Fahrenheit",
    kelvin: "Kelvin",
  }[unit] || unit.charAt(0).toUpperCase() + unit.slice(1));

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

  // Input validations
  if (!rawInput) return showResult("⚠️ Please enter a temperature value.", "error");
  if (isNaN(temperature)) return showResult("⚠️ Temperature must be a numeric value.", "error");
  if (!toCelsius[fromUnit] || !fromCelsius[toUnit])
    return showResult("⚠️ Please select valid temperature units.", "error");
  if (fromUnit === 'kelvin' && temperature < 0)
    return showResult("⚠️ Temperature in Kelvin cannot be below 0 K.", "error");

  // No conversion needed
  if (fromUnit === toUnit) {
    return showResult(`ℹ️ ${temperature.toFixed(2)}° ${formatUnit(toUnit)} (no conversion needed)`, "success");
  }

  // Perform conversion
  const tempInCelsius = toCelsius[fromUnit](temperature);
  const convertedTemp = fromCelsius[toUnit](tempInCelsius);

  if (toUnit === 'kelvin' && convertedTemp < 0)
    return showResult("⚠️ Resulting temperature in Kelvin cannot be below 0 K.", "error");

  showResult(`${convertedTemp.toFixed(2)}° ${formatUnit(toUnit)}`, "success");
}
