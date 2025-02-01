function convertTemp() {
  const inputTemp = parseFloat(document.getElementById("inputTemp").value);
  const inputUnit = document.getElementById("inputUnit").value;
  const targetUnit = document.getElementById("targetUnit").value;
  const outputBox = document.getElementById("output");

  // Hide output before displaying a new result
  outputBox.classList.remove("show", "hot", "cold");

  if (isNaN(inputTemp)) {
    outputBox.innerHTML =
      '<p style="color: red;">❌ Please enter a valid number.</p>';
    outputBox.classList.add("show");
    return;
  }

  let result;

  // Temperature Conversion Logic
  if (inputUnit === targetUnit) {
    result = inputTemp;
  } else if (inputUnit === "celsius") {
    result =
      targetUnit === "fahrenheit"
        ? (inputTemp * 9) / 5 + 32
        : inputTemp + 273.15;
  } else if (inputUnit === "fahrenheit") {
    result =
      targetUnit === "celsius"
        ? ((inputTemp - 32) * 5) / 9
        : ((inputTemp - 32) * 5) / 9 + 273.15;
  } else if (inputUnit === "kelvin") {
    result =
      targetUnit === "celsius"
        ? inputTemp - 273.15
        : ((inputTemp - 273.15) * 9) / 5 + 32;
  }

  // Get Temperature Description
  let description = getTempDescription(result, targetUnit);

  // Display the converted temperature + description
  outputBox.innerHTML = `
    <p><strong>Converted Temperature:</strong> ${result.toFixed(2)} ${
    targetUnit === "celsius" ? "°C" : targetUnit === "fahrenheit" ? "°F" : "K"
  }</p>
    <p class="description">${description}</p>
  `;

  // Show the output box with animation
  setTimeout(() => outputBox.classList.add("show"), 100);

  // Apply hot/cold effect
  if (result >= 30 && targetUnit !== "kelvin") {
    outputBox.classList.add("hot");
  } else if (result <= 10 && targetUnit !== "kelvin") {
    outputBox.classList.add("cold");
  }
}

// Function to get temperature description dynamically
function getTempDescription(temp, unit) {
  let tempCelsius =
    unit === "fahrenheit"
      ? ((temp - 32) * 5) / 9
      : unit === "kelvin"
      ? temp - 273.15
      : temp;

  if (tempCelsius <= -30) return "❄️ Dangerously Cold! Stay indoors!";
  if (tempCelsius > -30 && tempCelsius <= 0)
    return "❄️ Freezing! Water turns into ice.";
  if (tempCelsius > 0 && tempCelsius <= 10)
    return "🥶 Cold! Wear warm clothes.";
  if (tempCelsius > 10 && tempCelsius <= 20) return "🌤️ Cool and pleasant!";
  if (tempCelsius > 20 && tempCelsius <= 30)
    return "☀️ Warm, comfortable weather.";
  if (tempCelsius > 30 && tempCelsius <= 40) return "🔥 Hot! Stay hydrated.";
  if (tempCelsius > 40 && tempCelsius <= 50)
    return "🥵 Extremely hot! Avoid sun exposure.";
  if (tempCelsius > 50)
    return "🚨 Dangerously high temperature! Risk of heatstroke.";

  return "🌡️ Normal temperature range.";
}
