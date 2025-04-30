function convertTemperature() {
  const inputEl = document.getElementById('temperatureInput');
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const resultEl = document.getElementById('resultText');

  const rawInput = inputEl.value.trim();
  const temperature = parseFloat(rawInput);

  // Show result with animation
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

  // Clear and hide result area
  const hideResult = () => {
    resultEl.textContent = "";
    resultEl.className = "result";
    resultEl.style.opacity = "0";
    resultEl.style.visibility = "hidden";
    resultEl.style.transform = "translateY(10px)";
  };

  // Early exit on invalid input
  if (!rawInput || isNaN(temperature)) {
    showResult("⚠️ Please enter a valid numeric value.", "error");
    return;
  }

  // Conversion logic maps
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

  // Unit validation
  if (!(fromUnit in toCelsius) || !(toUnit in fromCelsius)) {
    showResult("⚠️ Invalid unit selection.", "error");
    return;
  }

  // Absolute zero check (Kelvin cannot be below 0)
  if (fromUnit === 'kelvin' && temperature < 0) {
    showResult("⚠️ Temperature in Kelvin cannot be below 0 K.", "error");
    return;
  }

  // Same unit shortcut
  if (fromUnit === toUnit) {
    showResult(`ℹ️ ${temperature.toFixed(2)}° ${capitalize(toUnit)} (no conversion needed)`, "success");
    return;
  }

  // Perform conversion
  const celsiusValue = toCelsius[fromUnit](temperature);
  const convertedValue = fromCelsius[toUnit](celsiusValue);
  const unitName = capitalize(toUnit);

  // Absolute zero check for converted temperature
  if (toUnit === 'kelvin' && convertedValue < 0) {
    showResult("⚠️ Result in Kelvin cannot be below 0 K.", "error");
    return;
  }

  showResult(`🌡️ ${convertedValue.toFixed(2)}° ${unitName}`, "success");
}

// Utility to capitalize first letter
function capitalize(text) {
  return text.charAt(0).toUpperCase() + text.slice(1);
}
