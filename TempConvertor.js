function convertTemp() {
  const inputElement = document.getElementById("inputTemp");
  const inputTemp = inputElement.value.trim();
  const inputUnit = document.getElementById("inputUnit").value;
  const targetUnit = document.getElementById("targetUnit").value;

  const messageBox = document.getElementById("message"); // Message below input
  const outputElement = document.getElementById("output"); // Output box

  // 🔹 If no input, show message inside form and hide output
  if (!inputTemp) {
    showMessage("ℹ️ Please enter a temperature.", "info-msg");
    hideOutput();
    return;
  }

  const parsedTemp = parseFloat(inputTemp);
  if (!validateInput(parsedTemp)) return;

  const result = convertTemperature(parsedTemp, inputUnit, targetUnit);
  if (result === undefined) return showError("⚠️ Invalid conversion.");

  const { description, className } = getTemperatureDescription(result);
  showResult(result, targetUnit, description, className);
}

// 🔹 Show a small message inside the form
function showMessage(message, className = "") {
  const messageBox = document.getElementById("message");
  messageBox.innerHTML = `<p class="${className}">${message}</p>`;
  messageBox.style.display = "block"; // Show the message box
}

// 🔹 Hide output completely
function hideOutput() {
  const outputElement = document.getElementById("output");
  outputElement.style.display = "none"; // Hide output box
}

// 🔹 Validate user input
function validateInput(temp) {
  if (isNaN(temp) || !Number.isFinite(temp)) {
    showError("⚠️ Please enter a valid number.");
    return false;
  }
  if (temp < -273.15 || temp > 1000) {
    showError("⚠️ Temperature out of realistic range!");
    return false;
  }
  return true;
}

// 🔹 Handle error messages
function showError(message) {
  showMessage(message, "error-msg");
  hideOutput(); // Hide output when there's an error
}

// 🔹 Convert temperature between units
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

// 🔹 Get temperature description
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

// 🔹 Display result with animation
function showResult(result, targetUnit, description, className) {
  const unitSymbols = { celsius: "°C", fahrenheit: "°F", kelvin: "K" };
  const outputElement = document.getElementById("output");
  const messageBox = document.getElementById("message");

  // Clear any previous messages
  messageBox.style.display = "none";

  outputElement.innerHTML = `
    <p><strong>Converted Temperature:</strong> ${result.toFixed(2)} ${
    unitSymbols[targetUnit]
  }</p>
    <p>${description}</p>`;
  outputElement.className = `output-box ${className}`;
  outputElement.style.display = "block"; // Show output box

  outputElement.classList.add("fade-in");
  setTimeout(() => outputElement.classList.remove("fade-in"), 500);
}
