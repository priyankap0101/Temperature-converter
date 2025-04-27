function convertTemp() {
  const inputElement = document.getElementById('tempInput');
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const resultBox = document.getElementById('result');
  const inputValue = inputElement.value.trim();
  const input = parseFloat(inputValue);

  resetResult(resultBox);

  // Validate input
  const validationMessage = validateInput(inputValue, input, fromUnit);
  if (validationMessage) {
    return showResult(resultBox, validationMessage, "error");
  }

  if (fromUnit === toUnit) {
    return showResult(resultBox, `Both units are the same: ${input}°${fromUnit}`, "success");
  }

  // Perform conversion
  const convertedValue = convertTemperature(input, fromUnit, toUnit);
  if (convertedValue !== null) {
    showResult(resultBox, `${input}°${fromUnit} = ${convertedValue}°${toUnit}`, "info");
  } else {
    showResult(resultBox, "Invalid conversion units selected.", "error");
  }
}

// Validation function
function validateInput(inputValue, input, fromUnit) {
  if (!inputValue) return "Please enter a number.";
  if (isNaN(input)) return "Invalid input. Please enter a valid number.";
  if (fromUnit === "K" && input < 0) return "Temperature in Kelvin cannot be negative.";
  if ((fromUnit === "C" && input < -273.15) || (fromUnit === "F" && input < -459.67)) {
    return "Temperature cannot be below absolute zero.";
  }
  return null;
}

// Conversion function
function convertTemperature(input, fromUnit, toUnit) {
  const conversionFormulas = {
    C: {
      F: (temp) => (temp * 9/5) + 32,
      K: (temp) => temp + 273.15,
    },
    F: {
      C: (temp) => (temp - 32) * 5/9,
      K: (temp) => (temp - 32) * 5/9 + 273.15,
    },
    K: {
      C: (temp) => temp - 273.15,
      F: (temp) => (temp - 273.15) * 9/5 + 32,
    }
  };

  const convert = conversionFormulas[fromUnit]?.[toUnit];
  return convert ? convert(input).toFixed(2) : null;
}

// Reset result box
function resetResult(resultBox) {
  resultBox.textContent = "";
  resultBox.className = "result";
  resultBox.style.display = "none";
}

// Display result
function showResult(resultBox, message, type = "info") {
  resultBox.className = `result ${type} show`;
  resultBox.textContent = message;
  resultBox.style.display = "block";
}
