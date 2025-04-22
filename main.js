function convertTemp() {
    const inputElement = document.getElementById('tempInput');
    const input = parseFloat(inputElement.value.trim());
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultBox = document.getElementById('result');
  
    resultBox.textContent = "";
    resultBox.className = "result"; // Reset to base class
  
    if (isNaN(input)) {
      return showResult("Please enter a valid number.", "error");
    }
  
    if (fromUnit === "K" && input < 0) {
      return showResult("Temperature in Kelvin cannot be negative.", "error");
    }
  
    if ((fromUnit === "C" && input < -273.15) || (fromUnit === "F" && input < -459.67)) {
      return showResult("Temperature cannot be below absolute zero.", "error");
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
  
    if (fromUnit === toUnit) {
      return showResult(`Both units are the same: ${input}°${fromUnit}`, "success");
    }
  
    try {
      const output = conversionFormulas[fromUnit]?.[toUnit];
      if (output) {
        const converted = output(input).toFixed(2);
        showResult(`${input}°${fromUnit} = ${converted}°${toUnit}`, "info");
      } else {
        showResult("Invalid conversion units selected.", "error");
      }
    } catch (err) {
      console.error("Conversion Error:", err);
      showResult("Something went wrong. Please try again.", "error");
    }
  }
  
  function showResult(message, type = "info") {
    const resultBox = document.getElementById('result');
  
    resultBox.className = `result ${type}`;
    resultBox.textContent = message;
    resultBox.style.display = "block";
  
    // Trigger fade-in (if using CSS animation)
    resultBox.classList.add("show");
  }
  