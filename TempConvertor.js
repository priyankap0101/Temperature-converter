document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("inputTemp")
    .addEventListener("input", debounce(handleLiveValidation, 300));
  document.getElementById("convertBtn").addEventListener("click", convertTemp);
  document.getElementById("resetBtn").addEventListener("click", resetForm);
  loadHistory();
});

let history = JSON.parse(localStorage.getItem("conversionHistory")) || [];

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

  showResult(result, targetUnit);
  saveToHistory(parsedTemp, inputUnit, result, targetUnit);
}

function debounce(func, delay) {
  let timer;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, arguments), delay);
  };
}

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
    document.getElementById("output").style.display = "block";
  }
}

function showMessage(message, className = "") {
  const messageBox = document.getElementById("message");
  messageBox.innerHTML = `<p class="${className}">${message}</p>`;
  messageBox.style.display = "block";
  messageBox.style.opacity = "1";

  setTimeout(() => {
    messageBox.style.opacity = "0";
    setTimeout(() => (messageBox.style.display = "none"), 500);
  }, 2000);
}

function hideOutput() {
  document.getElementById("output").style.display = "none";
}

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

function showError(message) {
  showMessage(message, "error-msg");
  hideOutput();
}

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

function showResult(result, targetUnit) {
  const unitSymbols = { celsius: "°C", fahrenheit: "°F", kelvin: "K" };
  const outputElement = document.getElementById("output");

  outputElement.innerHTML = `<p class="temp-result">${result.toFixed(2)} ${
    unitSymbols[targetUnit]
  }</p>`;
  outputElement.style.display = "block";
  outputElement.style.opacity = "1";

  outputElement.classList.add("fade-in");
  setTimeout(() => outputElement.classList.remove("fade-in"), 500);
}

function saveToHistory(inputTemp, inputUnit, result, targetUnit) {
  if (history.length >= 5) history.shift();
  history.push(
    `${inputTemp}° ${inputUnit.toUpperCase()} → ${result.toFixed(
      2
    )}° ${targetUnit.toUpperCase()}`
  );

  localStorage.setItem("conversionHistory", JSON.stringify(history));
  updateHistoryUI();
}

function loadHistory() {
  updateHistoryUI();
}

function updateHistoryUI() {
  const historyElement = document.getElementById("history");
  historyElement.innerHTML =
    history.length > 0
      ? "<h3>History:</h3><ul>" +
        history.map((entry) => `<li>${entry}</li>`).join("") +
        "</ul>"
      : "<h3>No history yet.</h3>";
}

function resetForm() {
  document.getElementById("inputTemp").value = "";
  document.getElementById("message").style.display = "none";
  document.getElementById("output").style.display = "none";
  document.getElementById("history").innerHTML = "<h3>No history yet.</h3>";
  history = [];
  localStorage.removeItem("conversionHistory");
  document.getElementById("inputTemp").focus();
}
