function convertTemp() {
  const inputElement = document.getElementById('tempInput');
  const input = parseFloat(inputElement.value.trim());
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const resultBox = document.getElementById('result');

  // Clear previous result message
  resultBox.textContent = "";
  resultBox.style.display = "none"; // Hide result box initially

  // Validate input
  if (isNaN(input) || input === "") {
      showResult("Please enter a valid number.", "#ef4444", "error");
      return;
  }

  // Check for invalid Kelvin values (Kelvin cannot be negative)
  if (fromUnit === "K" && input < 0) {
      showResult("Temperature in Kelvin cannot be negative.", "#ef4444", "error");
      return;
  }

  // Check for unrealistic values (e.g., temperatures too high or too low)
  if (input < -273.15 && fromUnit === "C" || input < -459.67 && fromUnit === "F") {
      showResult("Temperature cannot be below absolute zero.", "#ef4444", "error");
      return;
  }

  // Conversion formulas
  const conversionFormulas = {
      "C": {
          "F": (temp) => (temp * 9 / 5) + 32,
          "K": (temp) => temp + 273.15
      },
      "F": {
          "C": (temp) => (temp - 32) * 5 / 9,
          "K": (temp) => (temp - 32) * 5 / 9 + 273.15
      },
      "K": {
          "C": (temp) => temp - 273.15,
          "F": (temp) => (temp - 273.15) * 9 / 5 + 32
      }
  };

  // If the fromUnit and toUnit are the same, return the same value
  if (fromUnit === toUnit) {
      showResult(`Both units are the same: ${input}°${fromUnit}`, "#10b981", "success");
      return;
  }

  // Check if a valid conversion exists
  if (conversionFormulas[fromUnit] && conversionFormulas[fromUnit][toUnit]) {
      try {
          const output = conversionFormulas[fromUnit][toUnit](input);
          showResult(`${input}°${fromUnit} = ${output.toFixed(2)}°${toUnit}`, "#1D4ED8", "info");
      } catch (error) {
          console.error("Conversion error:", error);
          showResult("An error occurred during the conversion. Please try again.", "#ef4444", "error");
      }
  } else {
      showResult("Invalid conversion units selected.", "#ef4444", "error");
  }
}

// Function to display the result in the result box
function showResult(message, color, type) {
  const resultBox = document.getElementById('result');
  resultBox.textContent = message;

  // Remove any previous classes
  resultBox.classList.remove('success', 'error', 'info');

  // Add class based on the type of result
  if (type === 'success') {
      resultBox.classList.add('success');
  } else if (type === 'error') {
      resultBox.classList.add('error');
  } else {
      resultBox.classList.add('info');
  }

  resultBox.style.color = color;
  resultBox.style.display = "block"; // Show the result box

  // Fade in the result box smoothly
  setTimeout(() => {
      resultBox.style.opacity = 1;
  }, 100);
}