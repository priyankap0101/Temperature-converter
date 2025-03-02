// 🔹 Main function to handle temperature conversion
function convertTemp() {
  const inputElement = document.getElementById("inputTemp");
  const inputTemp = parseFloat(inputElement.value.trim());
  const inputUnit = document.getElementById("inputUnit").value;
  const targetUnit = document.getElementById("targetUnit").value;

  if (!validateInput(inputTemp)) return;

  if (inputUnit === targetUnit) {
    return showError("⚠️ Choose a different target unit!");
  }

  const convertedTemp = convertTemperature(inputTemp, inputUnit, targetUnit);
  if (convertedTemp === undefined) return showError("⚠️ Invalid conversion.");

  displayResult(convertedTemp, targetUnit);
}

// 🔹 Validate user input
function validateInput(temp) {
  if (isNaN(temp) || !Number.isFinite(temp)) {
    return showError("⚠️ Please enter a valid numeric value.");
  }
  if (temp < -273.15 || temp > 1000) {
    return showError("⚠️ Temperature is out of realistic range!");
  }
  return true;
}

// 🔹 Display error messages with animation
function showError(message) {
  updateOutput(`<p class="error-msg">${message}</p>`, "error");
}

// 🔹 Update output display with smooth animation
function updateOutput(content, className = "") {
  const outputElement = document.getElementById("output");
  outputElement.innerHTML = content;
  outputElement.className = `output-box ${className}`;
  outputElement.style.display = "block";

  // Apply fade-in effect
  outputElement.classList.add("fade-in");
  setTimeout(() => outputElement.classList.remove("fade-in"), 500);
}

// 🔹 Convert temperature between different units
function convertTemperature(temp, fromUnit, toUnit) {
  const conversionMap = {
    celsius: {
      fahrenheit: (t) => (t * 9) / 5 + 32,
      kelvin: (t) => t + 273.15,
    },
    fahrenheit: {
      celsius: (t) => ((t - 32) * 5) / 9,
      kelvin: (t) => ((t - 32) * 5) / 9 + 273.15,
    },
    kelvin: {
      celsius: (t) => t - 273.15,
      fahrenheit: (t) => ((t - 273.15) * 9) / 5 + 32,
    },
  };

  return conversionMap[fromUnit]?.[toUnit]?.(temp);
}

// 🔹 Get temperature description and styling
function getTemperatureDescription(temp) {
  const descriptions = [
    {
      limit: -30,
      text: "❄️ Dangerously Cold! Stay Indoors!",
      className: "extreme-cold",
    },
    {
      limit: 0,
      text: "🥶 Freezing! Wear heavy layers.",
      className: "freezing",
    },
    { limit: 10, text: "🧥 Cold, dress warmly.", className: "cold" },
    { limit: 25, text: "🌤️ Pleasant temperature.", className: "pleasant" },
    { limit: 35, text: "☀️ Warm but comfortable.", className: "warm" },
    { limit: 40, text: "🥵 Hot! Stay cool.", className: "hot" },
    {
      limit: Infinity,
      text: "🔥 Extreme Heat! Stay Hydrated!",
      className: "extreme-hot",
    },
  ];

  return descriptions.find((range) => temp < range.limit) || {};
}

// 🔹 Display conversion result with dynamic styling
function displayResult(result, targetUnit) {
  const unitSymbols = { celsius: "°C", fahrenheit: "°F", kelvin: "K" };
  const { text, className } = getTemperatureDescription(result);

  updateOutput(
    `<p><strong>Converted Temperature:</strong> ${result.toFixed(2)} ${
      unitSymbols[targetUnit]
    }</p>
    <p>${text}</p>`,
    className
  );
}
