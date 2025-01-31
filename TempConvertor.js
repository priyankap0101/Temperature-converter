function convertTemp() {
  const inputTemp = parseFloat(document.getElementById("inputTemp").value);
  const inputUnit = document.getElementById("inputUnit").value;
  const targetUnit = document.getElementById("targetUnit").value;
  const outputBox = document.getElementById("output"); // Output container

  // Validate input
  if (isNaN(inputTemp)) {
    outputBox.style.display = "block"; // Show output box for error
    outputBox.innerHTML =
      '<p style="color: red;">Please enter a valid number.</p>';
    return;
  }

  let result;

  // Conversion logic
  if (inputUnit === targetUnit) {
    result = inputTemp;
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

  // Show the output box
  outputBox.style.display = "block";

  // Determine if the temperature is "hot" or "cold" for styling
  if (result > 30) {
    outputBox.classList.add("hot");
    outputBox.classList.remove("cold");
  } else {
    outputBox.classList.add("cold");
    outputBox.classList.remove("hot");
  }

  // Display the converted result
  outputBox.innerHTML = `<p><strong>Converted Temperature:</strong> ${result.toFixed(
    2
  )} ${
    targetUnit === "celsius" ? "°C" : targetUnit === "fahrenheit" ? "°F" : "K"
  }</p>`;
}
