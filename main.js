function convertTemp() {
  const input = parseFloat(document.getElementById('tempInput').value);
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const resultBox = document.getElementById('result');

  // Check if the input is a valid number
  if (isNaN(input)) {
      resultBox.textContent = "Please enter a valid number.";
      resultBox.style.color = "#ef4444";
      return;
  }

  // Check for invalid Kelvin values (Kelvin cannot be negative)
  if (fromUnit === "K" && input < 0) {
      resultBox.textContent = "Temperature in Kelvin cannot be negative.";
      resultBox.style.color = "#ef4444";
      return;
  }

  // Conversion logic
  const conversionFormulas = {
      "C": {
          "F": (temp) => (temp * 9/5) + 32,
          "K": (temp) => temp + 273.15
      },
      "F": {
          "C": (temp) => (temp - 32) * 5/9,
          "K": (temp) => (temp - 32) * 5/9 + 273.15
      },
      "K": {
          "C": (temp) => temp - 273.15,
          "F": (temp) => (temp - 273.15) * 9/5 + 32
      }
  };

  // If the fromUnit and toUnit are the same, return the same value
  if (fromUnit === toUnit) {
      resultBox.textContent = `Both units are the same: ${input}°${fromUnit}`;
      resultBox.style.color = "#10b981";
      return;
  }

  // Check if a valid conversion exists
  if (conversionFormulas[fromUnit] && conversionFormulas[fromUnit][toUnit]) {
      const output = conversionFormulas[fromUnit][toUnit](input);
      resultBox.textContent = `${input}°${fromUnit} = ${output.toFixed(2)}°${toUnit}`;
      resultBox.style.color = "#10b981"; // Green for valid conversion
  } else {
      resultBox.textContent = "Invalid conversion units selected.";
      resultBox.style.color = "#ef4444"; // Red for error
  }
}