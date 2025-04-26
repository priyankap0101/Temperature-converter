function convertTemp() {
  const inputElement = document.getElementById('tempInput');
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const resultBox = document.getElementById('result');
  const inputValue = inputElement.value.trim();
  const input = parseFloat(inputValue);

  resetResult();

  if (!inputValue || isNaN(input)) {
    return showResult("Please enter a valid number.", "error");
  }

  if (fromUnit === "K" && input < 0) {
    return showResult("Temperature in Kelvin cannot be negative.", "error");
  }

  if ((fromUnit === "C" && input < -273.15) || (fromUnit === "F" && input < -459.67)) {
    return showResult("Temperature cannot be below absolute zero.", "error");
  }

  if (fromUnit === toUnit) {
    return showResult(`Both units are the same: ${input}°${fromUnit}`, "success");
  }

  const conversionFormulas = {
    C: {
      F: (temp) => (temp * 9 / 5) + 32,
      K: (temp) => temp + 273.15
    },
    F: {
      C: (temp) => (temp - 32) * 5 / 9,
      K: (temp) => (temp - 32) * 5 / 9 + 273.15
    },
    K: {
      C: (temp) => temp - 273.15,
      F: (temp) => (temp - 273.15) * 9 / 5 + 32
    }
  };

  const convert = conversionFormulas[fromUnit]?.[toUnit];

  if (convert) {
    const convertedValue = convert(input).toFixed(2);
    showResult(`${input}°${fromUnit} = ${convertedValue}°${toUnit}`, "info");
  } else {
    showResult("Invalid conversion units selected.", "error");
  }
}

function resetResult() {
  const resultBox = document.getElementById('result');
  resultBox.textContent = "";
  resultBox.className = "result";
  resultBox.style.display = "none";
}

function showResult(message, type = "info") {
  const resultBox = document.getElementById('result');
  resultBox.className = `result ${type} show`;
  resultBox.textContent = message;
  resultBox.style.display = "block";
}
