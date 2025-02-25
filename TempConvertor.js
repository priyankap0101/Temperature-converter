function convertTemp() {
  const inputTemp = parseFloat(document.getElementById("inputTemp").value);
  const inputUnit = document.getElementById("inputUnit").value;
  const targetUnit = document.getElementById("targetUnit").value;

  // Validate input
  if (!isValidTemperature(inputTemp))
    return showError("⚠️ Please enter a valid number.");
  if (!isWithinRange(inputTemp))
    return showError("⚠️ Temperature out of realistic range!");

  // Perform conversion
  const result = convertTemperature(inputTemp, inputUnit, targetUnit);
  if (result === undefined) return showError("⚠️ Invalid conversion.");

  // Get temperature description
  const { description, className } = getTemperatureDescription(result);

  // Display the result
  showResult(result, targetUnit, description, className);
}

// 🔹 Function to validate temperature input
function isValidTemperature(temp) {
  return !isNaN(temp) && Number.isFinite(temp);
}

// 🔹 Function to check if temperature is within realistic range
function isWithinRange(temp) {
  return temp >= -273.15 && temp <= 1000;
}

// 🔹 Function to handle error messages
function showError(message) {
  updateOutput(message, "error-msg", "error");
}

// 🔹 Function to update the output display
function updateOutput(content, extraClass = "", baseClass = "") {
  const outputElement = document.getElementById("output");
  outputElement.innerHTML = `<p class="${extraClass}">${content}</p>`;
  outputElement.className = `output-box ${baseClass}`;
  outputElement.style.display = "block";
}

// 🔹 Function to convert temperature between units
function convertTemperature(temp, fromUnit, toUnit) {
  if (fromUnit === toUnit) return temp;

  const conversions = {
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

  return conversions[fromUnit]?.[toUnit]?.(temp);
}

// 🔹 Function to determine temperature description
function getTemperatureDescription(temp) {
  const tempRanges = [
    {
      limit: -30,
      description: "❄️ Dangerously Cold! Stay indoors!",
      className: "extreme-cold",
    },
    {
      limit: 10,
      description: "🧥 Cold, wear warm clothes.",
      className: "cold",
    },
    {
      limit: 25,
      description: "🌤️ Pleasant temperature.",
      className: "pleasant",
    },
    {
      limit: 40,
      description: "☀️ Warm, comfortable weather.",
      className: "hot",
    },
    {
      limit: Infinity,
      description: "🔥 Extremely Hot! Stay Hydrated.",
      className: "extreme-hot",
    },
  ];

  return tempRanges.find((range) => temp < range.limit) || {};
}

// 🔹 Function to display converted temperature with animation
function showResult(result, targetUnit, description, className) {
  const unitSymbols = { celsius: "°C", fahrenheit: "°F", kelvin: "K" };
  const unitSymbol = unitSymbols[targetUnit] || targetUnit;

  updateOutput(
    `<p><strong>Converted Temperature:</strong> ${result.toFixed(
      2
    )} ${unitSymbol}</p><p>${description}</p>`,
    "",
    className
  );

  const outputElement = document.getElementById("output");
  outputElement.classList.add("fade-in");
  setTimeout(() => outputElement.classList.remove("fade-in"), 500);
}
