function convertTemp() {
  const inputElement = document.getElementById('tempInput');
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const resultBox = document.getElementById('result');
  const inputValue = inputElement.value.trim();
  const input = parseFloat(inputValue);

  resetResult(resultBox);

  if (!inputValue) {
    return showResult(resultBox, "Please enter a number.", "error");
  }

  if (isNaN(input)) {
    return showResult(resultBox, "Invalid input. Please enter a valid number.", "error");
  }

  if (fromUnit === "K" && input < 0) {
    return showResult(resultBox, "Temperature in Kelvin cannot be negative.", "error");
  }

  if ((fromUnit === "C" && input < -273.15) || (fromUnit === "F" && input < -459.67)) {
    return showResult(resultBox, "Temperature cannot be below absolute zero.", "error");
  }

  if (fromUnit === toUnit) {
    return showResult(resultBox, `Both units are the same: ${input}°${fromUnit}`, "success");
  }

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

  if (typeof convert === "function") {
    const convertedValue = convert(input).toFixed(2);
    showResult(resultBox, `${input}°${fromUnit} = ${convertedValue}°${toUnit}`, "info");
  } else {
    showResult(resultBox, "Invalid conversion units selected.", "error");
  }
}

function resetResult(resultBox) {
  resultBox.textContent = "";
  resultBox.className = "result";
  resultBox.style.display = "none";
}

function showResult(resultBox, message, type = "info") {
  resultBox.className = `result ${type} show`;
  resultBox.textContent = message;
  resultBox.style.display = "block";
}
