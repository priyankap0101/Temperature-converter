function convertTemperature() {
  const inputField = document.getElementById('temperatureInput');
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const resultText = document.getElementById('resultText');

  const input = inputField.value.trim();
  const temperature = parseFloat(input);

  // Utility: Display result box
  function showMessage(message) {
    resultText.textContent = message;
    resultText.style.display = "block";
  }

  if (!input || isNaN(temperature)) {
    showMessage("⚠️ Please enter a valid number.");
    return;
  }

  // Convert to Celsius
  const toCelsius = {
    celsius: (temp) => temp,
    fahrenheit: (temp) => (temp - 32) * 5 / 9,
    kelvin: (temp) => temp - 273.15,
  };

  // Convert from Celsius
  const fromCelsius = {
    celsius: (temp) => temp,
    fahrenheit: (temp) => (temp * 9 / 5) + 32,
    kelvin: (temp) => temp + 273.15,
  };

  if (!toCelsius[fromUnit] || !fromCelsius[toUnit]) {
    showMessage("⚠️ Invalid conversion units selected.");
    return;
  }

  const celsius = toCelsius[fromUnit](temperature);
  const converted = fromCelsius[toUnit](celsius);

  const formattedUnit = toUnit.charAt(0).toUpperCase() + toUnit.slice(1);
  showMessage(`🌡️ ${converted.toFixed(2)}° ${formattedUnit}`);
}
