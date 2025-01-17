function convertTemp() {
  const inputTemp = parseFloat(document.getElementById("inputTemp").value); // Input temperature
  const inputUnit = document.getElementById("inputUnit").value; // From unit
  const targetUnit = document.getElementById("targetUnit").value; // To unit
  const output = document.getElementById("output"); // Output container

  // Validate input
  if (isNaN(inputTemp)) {
    output.innerHTML =
      '<p style="color: red;">Please enter a valid number.</p>';
    return;
  }

  let result;

  // Conversion logic
  if (inputUnit === targetUnit) {
    result = inputTemp; // No conversion needed
  } else if (inputUnit === "celsius") {
    if (targetUnit === "fahrenheit") {
      result = (inputTemp * 9) / 5 + 32;
    } else if (targetUnit === "kelvin") {
      result = inputTemp + 273.15;
    }
  } else if (inputUnit === "fahrenheit") {
    if (targetUnit === "celsius") {
      result = ((inputTemp - 32) * 5) / 9;
    } else if (targetUnit === "kelvin") {
      result = ((inputTemp - 32) * 5) / 9 + 273.15;
    }
  } else if (inputUnit === "kelvin") {
    if (targetUnit === "celsius") {
      result = inputTemp - 273.15;
    } else if (targetUnit === "fahrenheit") {
      result = ((inputTemp - 273.15) * 9) / 5 + 32;
    }
  }

  // Display the converted result
  output.innerHTML = `<p><strong>Converted Temperature:</strong> ${result.toFixed(
    2
  )} ${
    targetUnit === "celsius" ? "°C" : targetUnit === "fahrenheit" ? "°F" : "K"
  }</p>`;
}
