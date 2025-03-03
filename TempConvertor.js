document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("inputTemp")
    .addEventListener("input", debounce(handleLiveValidation, 300));
  document.getElementById("resetBtn").addEventListener("click", resetForm);
  loadHistory(); // Load history from local storage
});

let history = JSON.parse(localStorage.getItem("conversionHistory")) || []; // Retrieve stored history

function convertTemp() {
  const inputElement = document.getElementById("inputTemp");
  const inputTemp = inputElement.value.trim();
  const inputUnit = document.getElementById("inputUnit").value;
  const targetUnit = document.getElementById("targetUnit").value;

  if (!inputTemp) {
    showMessage("ℹ️ Please enter a temperature.", "info-msg");
    hideOutput();
    inputElement.focus();
    return;
  }

  const parsedTemp = parseFloat(inputTemp);
  if (!validateInput(parsedTemp)) return;

  const result = convertTemperature(parsedTemp, inputUnit, targetUnit);
  if (result === undefined) return showError("⚠️ Invalid conversion.");

  const { description, className } = getTemperatureDescription(result);
  showResult(result, targetUnit, description, className);

  saveToHistory(parsedTemp, inputUnit, result, targetUnit);
}

// 🔹 Debounced Live Validation (Prevents Excessive Calls)
function debounce(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, arguments), delay);
  };
}

// 🔹 Live Validation (Prevents Invalid Input)
function handleLiveValidation() {
  const inputTemp = this.value.trim();
  if (!inputTemp) {
    showMessage("ℹ️ Please enter a temperature.", "info-msg");
    hideOutput();
    return;
  }
  if (isNaN(inputTemp) || inputTemp.match(/[^\d.-]/)) {
    showMessage("⚠️ Enter a valid numeric value.", "error-msg");
    hideOutput();
  } else {
    document.getElementById("output").style.display = "block"; // Ensure result stays visible
  }
}

// 🔹 Show Message with Fade-out Effect
function showMessage(message, className = "") {
  const messageBox = document.getElementById("message");
  messageBox.innerHTML = `<p class="${className}">${message}</p>`;
  messageBox.style.display = "block";
  messageBox.style.opacity = "1"; // Ensure visibility

  setTimeout(() => {
    messageBox.style.opacity = "0";
    setTimeout(() => (messageBox.style.display = "none"), 500);
  }, 2000);
}

// 🔹 Hide Output Completely
function hideOutput() {
  document.getElementById("output").style.display = "none";
}

// 🔹 Validate Input Temperature
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

// 🔹 Show Error Message
function showError(message) {
  showMessage(message, "error-msg");
  hideOutput();
}

// 🔹 Convert Temperature Between Units
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

// 🔹 Get Temperature Description for Styling
function getTemperatureDescription(temp) {
  const tempRanges = [
    {
      limit: -30,
      description: "❄️ Dangerously Cold!",
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

  return (
    tempRanges.find((range) => temp < range.limit) || {
      description: "🌡️ Moderate temperature.",
      className: "moderate",
    }
  );
}

// 🔹 Display Result with Animation
function showResult(result, targetUnit, description, className) {
  const unitSymbols = { celsius: "°C", fahrenheit: "°F", kelvin: "K" };
  const outputElement = document.getElementById("output");

  outputElement.innerHTML = `
    <p class="temp-result">${result.toFixed(2)} ${unitSymbols[targetUnit]}</p>
    <p class="temp-description">${description}</p>
  `;
  outputElement.className = `output-box ${className}`;
  outputElement.style.display = "block";
  outputElement.style.opacity = "1"; // Ensure it stays visible

  outputElement.classList.add("fade-in");
  setTimeout(() => outputElement.classList.remove("fade-in"), 500);
}

// 🔹 Save Conversion History (With Local Storage)
function saveToHistory(inputTemp, inputUnit, result, targetUnit) {
  if (history.length >= 5) history.shift(); // Keep only last 5 conversions
  history.push(
    `${inputTemp}° ${inputUnit.toUpperCase()} → ${result.toFixed(
      2
    )}° ${targetUnit.toUpperCase()}`
  );

  localStorage.setItem("conversionHistory", JSON.stringify(history)); // Save history

  updateHistoryUI();
}

// 🔹 Load History from Local Storage
function loadHistory() {
  updateHistoryUI();
}

// 🔹 Update History UI with Slide Effect
function updateHistoryUI() {
  const historyElement = document.getElementById("history");
  historyElement.innerHTML =
    history.length > 0
      ? "<h3>History:</h3><ul>" +
        history.map((entry) => `<li class="slide-in">${entry}</li>`).join("") +
        "</ul>"
      : "<h3>No history yet.</h3>";

  // Add animation class
  setTimeout(() => {
    document
      .querySelectorAll(".slide-in")
      .forEach((el) => el.classList.add("visible"));
  }, 100);
}

// 🔹 Reset Form (Also Clears Local Storage)
function resetForm() {
  document.getElementById("inputTemp").value = "";
  document.getElementById("message").style.display = "none";
  document.getElementById("output").style.display = "none";
  document.getElementById("history").innerHTML = "<h3>No history yet.</h3>";
  history = [];
  localStorage.removeItem("conversionHistory");
  document.getElementById("inputTemp").focus();
}
