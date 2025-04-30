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
    resultEl.style.display = "block"; // Ensure the element is displayed
    resultEl.setAttribute("aria-live", "polite");
    resultEl.className = `result ${type} show`; // Add 'show' class to trigger fade-in

    // Reset opacity and visibility for smooth fade-in effect
    resultEl.style.opacity = 0;
    resultEl.style.visibility = "hidden"; // Ensure it's hidden initially
    requestAnimationFrame(() => {
      resultEl.style.opacity = 1; // Fade-in
      resultEl.style.visibility = "visible"; // Make the element visible
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
