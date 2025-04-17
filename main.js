function convertTemp() {
  const input = parseFloat(document.getElementById('tempInput').value);
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const resultBox = document.getElementById('result');

  // Hide the result box initially
  resultBox.style.display = "none"; 

  // Check if the input is a valid number
  if (isNaN(input)) {
      showResult("Please enter a valid number.", "#ef4444");
      return;
  }

  // Check for invalid Kelvin values (Kelvin cannot be negative)
  if (fromUnit === "K" && input < 0) {
      showResult("Temperature in Kelvin cannot be negative.", "#ef4444");
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
      showResult(`Both units are the same: ${input}°${fromUnit}`, "#10b981");
      return;
  }

  // Check if a valid conversion exists
  if (conversionFormulas[fromUnit] && conversionFormulas[fromUnit][toUnit]) {
      const output = conversionFormulas[fromUnit][toUnit](input);
      showResult(`${input}°${fromUnit} = ${output.toFixed(2)}°${toUnit}`, "#1D4ED8"); // Blue for valid conversion
  } else {
      showResult("Invalid conversion units selected.", "#ef4444");
  }
}

// Function to display the result in the result box
function showResult(message, color) {
  const resultBox = document.getElementById('result');
  resultBox.textContent = message;
  resultBox.style.color = color;
  resultBox.style.display = "block"; // Show the result box
}
