function convertTemperature() {
  const inputEl = document.getElementById('temperatureInput');
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const resultEl = document.getElementById('resultText');

  const input = inputEl.value.trim();
  const temperature = parseFloat(input);

  // Handle result display
  function showResult(message, type = "info") {
    resultEl.textContent = message;
    resultEl.style.display = "block";
    resultEl.setAttribute("aria-live", "polite");
    resultEl.className = `result ${type}`;

    // Trigger smooth fade-in
    resultEl.style.opacity = 0;
    requestAnimationFrame(() => {
      resultEl.style.opacity = 1;
    });
  }

  // Input validation
  if (!input || isNaN(temperature)) {
    showResult("⚠️ Please enter a valid number.", "error");
    return;
  }

  // Conversion maps
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

  // Perform conversion
  const tempCelsius = toCelsius[fromUnit](temperature);
  const converted = fromCelsius[toUnit](tempCelsius);
  const unitLabel = toUnit.charAt(0).toUpperCase() + toUnit.slice(1);

  showResult(`🌡️ ${converted.toFixed(2)}° ${unitLabel}`, "success");
}
