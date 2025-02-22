function convertTemp() {
  const inputTemp = parseFloat(document.getElementById("inputTemp").value);
  const inputUnit = document.getElementById("inputUnit").value;
  const targetUnit = document.getElementById("targetUnit").value;
  const outputBox = document.getElementById("output");

  // Input validation: Check if the input is a valid finite number
  if (!Number.isFinite(inputTemp)) {
    showErrorMessage("⚠️ Please enter a valid number.");
    return;
  }

  // Range validation: Check if the temperature is within a realistic range
  if (inputTemp < -273.15 || inputTemp > 1000) {
    showErrorMessage("⚠️ Temperature out of realistic range!");
    return;
  }

  // Conversion logic
  const result = convertTemperature(inputTemp, inputUnit, targetUnit);

  if (result === undefined) {
    showErrorMessage("⚠️ Invalid conversion.");
    return;
  }

  // Temperature description based on the result
  const { description, className } = getTemperatureDescription(result);

  // Display the result with a smooth transition
  showResult(result, targetUnit, description, className);
}

// Function to handle displaying error messages
function showErrorMessage(message) {
  const outputBox = document.getElementById("output");
  outputBox.innerHTML = `<p class="error-msg">${message}</p>`;
  outputBox.className = "output-box error";
  outputBox.style.display = "block";
}

// Function to convert temperatures based on selected units
function convertTemperature(temp, fromUnit, toUnit) {
  const conversions = {
    celsius: {
      fahrenheit: (temp) => (temp * 9) / 5 + 32,
      kelvin: (temp) => temp + 273.15,
    },
    fahrenheit: {
      celsius: (temp) => ((temp - 32) * 5) / 9,
      kelvin: (temp) => ((temp - 32) * 5) / 9 + 273.15,
    },
    kelvin: {
      celsius: (temp) => temp - 273.15,
      fahrenheit: (temp) => ((temp - 273.15) * 9) / 5 + 32,
    },
  };

  // If the units are the same, no need to convert
  if (fromUnit === toUnit) {
    return temp;
  }

  return conversions[fromUnit]?.[toUnit]?.(temp);
}

// Function to determine the temperature description based on the result
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
    { limit: 25, description: "🌤️ Pleasant temperature.", className: "" },
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

  return tempRanges.find((range) => temp < range.limit);
}

// Function to display the result with a smooth transition
function showResult(result, targetUnit, description, className) {
  const outputBox = document.getElementById("output");
  const unitSymbol =
    targetUnit === "celsius" ? "°C" : targetUnit === "fahrenheit" ? "°F" : "K";

  outputBox.innerHTML = `
    <p><strong>Converted Temperature:</strong> ${result.toFixed(
      2
    )} ${unitSymbol}<br>${description}</p>
  `;

  outputBox.className = `output-box ${className}`;
  outputBox.style.display = "block";

  // Add smooth transition effect
  outputBox.classList.add("fade-in");

  setTimeout(() => {
    outputBox.classList.remove("fade-in");
  }, 500); // Duration of the fade-in effect
}
