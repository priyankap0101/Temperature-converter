function convertTemp() {
  const inputTemp = parseFloat(document.getElementById("inputTemp").value);
  const inputUnit = document.getElementById("inputUnit").value;
  const targetUnit = document.getElementById("targetUnit").value;
  const outputBox = document.getElementById("output");

  if (isNaN(inputTemp)) {
    outputBox.innerHTML =
      '<p style="color: red;">⚠️ Please enter a valid number.</p>';
    outputBox.style.display = "block";
    return;
  }

  let result;
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

  // Determine Temperature Description
  let description = "";
  let className = "";

  if (result < -30) {
    description = "❄️ Dangerously Cold! Stay indoors!";
    className = "extreme-cold";
  } else if (result < 10) {
    description = "🧥 Cold, wear warm clothes.";
    className = "cold";
  } else if (result < 25) {
    description = "🌤️ Pleasant temperature.";
    className = "";
  } else if (result < 40) {
    description = "☀️ Warm, comfortable weather.";
    className = "hot";
  } else {
    description = "🔥 Extremely Hot! Stay Hydrated.";
    className = "extreme-hot";
  }

  // Apply Changes
  outputBox.innerHTML = `<p><strong>Converted Temperature:</strong> ${result.toFixed(
    2
  )} ${
    targetUnit === "celsius" ? "°C" : targetUnit === "fahrenheit" ? "°F" : "K"
  }<br>${description}</p>`;

  outputBox.className = `output-box ${className}`;

  // Display the output box with animation
  outputBox.style.display = "block";
  outputBox.style.opacity = "0";

  setTimeout(() => {
    outputBox.style.opacity = "1";
  }, 100);
}
