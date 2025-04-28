function convertTemperature() {
  const temperature = parseFloat(document.getElementById('temperatureInput').value);
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const resultText = document.getElementById('resultText');

  if (isNaN(temperature)) {
    resultText.textContent = "Please enter a number.";
    return;
  }

  let result;

  // Convert the temperature to Celsius first
  if (fromUnit === "celsius") {
    result = temperature;
  } else if (fromUnit === "fahrenheit") {
    result = (temperature - 32) * (5 / 9);
  } else if (fromUnit === "kelvin") {
    result = temperature - 273.15;
  }

  // Then from Celsius to the target unit
  if (toUnit === "celsius") {
    result = result;
  } else if (toUnit === "fahrenheit") {
    result = (result * 9 / 5) + 32;
  } else if (toUnit === "kelvin") {
    result = result + 273.15;
  }

  resultText.textContent = `Result: ${result.toFixed(2)}° ${toUnit.charAt(0).toUpperCase() + toUnit.slice(1)}`;
}