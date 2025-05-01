function convertTemperature() {
  const inputEl = document.getElementById('temperatureInput');
  const fromUnit = document.getElementById('fromUnit').value.toLowerCase();
  const toUnit = document.getElementById('toUnit').value.toLowerCase();
  const resultEl = document.getElementById('resultText');

  const rawInput = inputEl.value.trim();
  const temperature = parseFloat(rawInput);

  // Display result with fade-in animation
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

  // Hide result initially
  const hideResult = () => {
    resultEl.textContent = "";
    resultEl.className = "result";
    resultEl.style.opacity = "0";
    resultEl.style.visibility = "hidden";
    resultEl.style.transform = "translateY(10px)";
  };

  // Validate numeric input
  if (!rawInput || isNaN(temperature)) {
    showResult("⚠️ Please enter a valid number.", "error");
    return;
  }

  // Temperature conversion formulas to and from Celsius
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

  // Check for valid units
  if (!(fromUnit in toCelsius) || !(toUnit in fromCelsius)) {
    showResult("⚠️ Invalid temperature unit selected.", "error");
    return;
  }

  // Check for physical constraint: Kelvin can't be negative
  if (fromUnit === 'kelvin' && temperature < 0) {
    showResult("⚠️ Kelvin temperature cannot be below 0.", "error");
    return;
  }

  // Skip conversion if units are the same
  if (fromUnit === toUnit) {
    showResult(`ℹ️ ${temperature.toFixed(2)}° ${capitalize(toUnit)} (no conversion needed)`, "success");
    return;
  }

  // Perform conversion
  const tempInCelsius = toCelsius[fromUnit](temperature);
  const converted = fromCelsius[toUnit](tempInCelsius);

  // Ensure final Kelvin result is valid
  if (toUnit === 'kelvin' && converted < 0) {
    showResult("⚠️ Resulting Kelvin value cannot be below 0.", "error");
    return;
  }

  showResult(`${converted.toFixed(2)}° ${capitalize(toUnit)}`, "success");
}

// Capitalize first character of a string
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
