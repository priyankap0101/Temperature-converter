function convertTemperature() {
  const input = document.getElementById('temperatureInput').value.trim();
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const resultText = document.getElementById('resultText');

  const temperature = parseFloat(input);

  if (input === "" || isNaN(temperature)) {
    resultText.style.display = "block";
    resultText.textContent = "⚠️ Please enter a valid number.";
    return;
  }

  let celsius;

  switch (fromUnit) {
    case "celsius":
      celsius = temperature;
      break;
    case "fahrenheit":
      celsius = (temperature - 32) * 5 / 9;
      break;
    case "kelvin":
      celsius = temperature - 273.15;
      break;
    default:
      resultText.style.display = "block";
      resultText.textContent = "⚠️ Invalid source unit.";
      return;
  }

  let result;

  switch (toUnit) {
    case "celsius":
      result = celsius;
      break;
    case "fahrenheit":
      result = (celsius * 9 / 5) + 32;
      break;
    case "kelvin":
      result = celsius + 273.15;
      break;
    default:
      resultText.style.display = "block";
      resultText.textContent = "⚠️ Invalid target unit.";
      return;
  }

  const formattedUnit = toUnit.charAt(0).toUpperCase() + toUnit.slice(1);
  resultText.textContent = `${result.toFixed(2)}° ${formattedUnit}`;
  resultText.style.display = "block"; // Show the box only now
}
