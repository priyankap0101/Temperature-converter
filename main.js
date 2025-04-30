function convertTemperature() {
  const inputField = document.getElementById('temperatureInput');
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const resultText = document.getElementById('resultText');

  const input = inputField.value.trim();
  const temperature = parseFloat(input);

  // Utility: Show result box with optional emoji and fade-in effect
  function showMessage(message, isError = false) {
    resultText.textContent = message;
    resultText.style.display = "block";
    resultText.style.color = isError ? "#e63946" : "#333";
    resultText.style.opacity = 0;
    setTimeout(() => {
      resultText.style.opacity = 1;
    }, 10); // triggers fade-in
  }

  if (!input || isNaN(temperature)) {
    showMessage("⚠️ Please enter a valid number.", true);
    return;
  }

  const toCelsius = {
    celsius: temp => temp,
    fahrenheit: temp => (temp - 32) * 5 / 9,
    kelvin: temp => temp - 273.15,
  };

  const fromCelsius = {
    celsius: temp => temp,
    fahrenheit: temp => (temp * 9 / 5) + 32,
    kelvin: temp => temp + 273.15,
  };

  if (!(fromUnit in toCelsius) || !(toUnit in fromCelsius)) {
    showMessage("⚠️ Invalid conversion units selected.", true);
    return;
  }

  const celsius = toCelsius[fromUnit](temperature);
  const converted = fromCelsius[toUnit](celsius);
  const formattedUnit = toUnit.charAt(0).toUpperCase() + toUnit.slice(1);

  showMessage(`🌡️ ${converted.toFixed(2)}° ${formattedUnit}`);
}
