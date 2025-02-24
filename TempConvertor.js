function convertTemp() {
  const inputTemp = parseFloat(document.getElementById("inputTemp").value);
  const inputUnit = document.getElementById("inputUnit").value;
  const targetUnit = document.getElementById("targetUnit").value;
  const outputElement = document.getElementById("output");

  // Input validation: Ensure a valid finite number
  if (isNaN(inputTemp) || !Number.isFinite(inputTemp)) {
    return showError("⚠️ Please enter a valid number.");
  }

  // Range validation: Check if temperature is within realistic limits
  if (inputTemp < -273.15 || inputTemp > 1000) {
    return showError("⚠️ Temperature out of realistic range!");
  }

  // Perform conversion
  const result = convertTemperature(inputTemp, inputUnit, targetUnit);
  if (result === undefined) {
    return showError("⚠️ Invalid conversion.");
  }

  // Determine the temperature description
  const { description, className } = getTemperatureDescription(result);

  // Display the result with animation
  showResult(result, targetUnit, description, className);
}

// Function to display error messages
function showError(message) {
  const outputElement = document.getElementById("output");
  outputElement.textContent = message;
  outputElement.className = "output-box error";
  outputElement.style.display = "block";
}

// Function to convert temperatures between different units
function convertTemperature(temp, fromUnit, toUnit) {
  if (fromUnit === toUnit) return temp; // No conversion needed

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

// Function to determine temperature description
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

// Function to display the converted temperature with a smooth effect
function showResult(result, targetUnit, description, className) {
  const outputElement = document.getElementById("output");
  const unitMap = { celsius: "°C", fahrenheit: "°F", kelvin: "K" };
  const unitSymbol = unitMap[targetUnit] || targetUnit;

  outputElement.innerHTML = `
    <p><strong>Converted Temperature:</strong> ${result.toFixed(
      2
    )} ${unitSymbol}</p>
    <p>${description}</p>
  `;

  outputElement.className = `output-box ${className} fade-in`;
  outputElement.style.display = "block";

  // Remove fade-in effect after animation
  setTimeout(() => outputElement.classList.remove("fade-in"), 500);
}
