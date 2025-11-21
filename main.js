function convertTemperature() {
  const inputEl = document.getElementById("temperatureInput");
  const fromUnit = document.getElementById("fromUnit").value.toLowerCase();
  const toUnit = document.getElementById("toUnit").value.toLowerCase();
  const resultEl = document.getElementById("resultText");

  const rawInput = inputEl.value.trim();
  const temperature = parseFloat(rawInput);

  // Centralized unit labels
  const UNIT_LABELS = {
    celsius: "Celsius",
    fahrenheit: "Fahrenheit",
    kelvin: "Kelvin",
  };

  // Conversion Maps
  const CONVERT = {
    toCelsius: {
      celsius: t => t,
      fahrenheit: t => (t - 32) * 5 / 9,
      kelvin: t => t - 273.15,
    },
    fromCelsius: {
      celsius: t => t,
      fahrenheit: t => (t * 9 / 5) + 32,
      kelvin: t => t + 273.15,
    }
  };

  // 🔵 Reusable show message
  const showResult = (msg, type = "info") => {
    resultEl.textContent = msg;
    resultEl.className = `result ${type} show`;

    resultEl.style.display = "block";
    requestAnimationFrame(() => {
      resultEl.style.opacity = "1";
      resultEl.style.visibility = "visible";
      resultEl.style.transform = "translateY(0)";
    });
  };

  // 🔵 Hide message
  const hideResult = () => {
    resultEl.textContent = "";
    resultEl.className = "result";
    resultEl.style.opacity = "0";
    resultEl.style.visibility = "hidden";
    resultEl.style.transform = "translateY(10px)";
  };

  // ----------------------
  // 🔴 Input Validations
  // ----------------------

  if (!rawInput) return showResult("⚠️ Please enter a temperature value.", "error");

  if (isNaN(temperature))
    return showResult("⚠️ Temperature must be a numeric value.", "error");

  if (!CONVERT.toCelsius[fromUnit] || !CONVERT.fromCelsius[toUnit])
    return showResult("⚠️ Please select valid temperature units.", "error");

  // Kelvin cannot be negative
  if (fromUnit === "kelvin" && temperature < 0)
    return showResult("⚠️ Temperature in Kelvin cannot be below 0 K.", "error");

  // ----------------------
  // 🔵 No conversion needed
  // ----------------------
  if (fromUnit === toUnit) {
    return showResult(
      `ℹ️ ${temperature.toFixed(2)}° ${UNIT_LABELS[toUnit]} (no conversion needed)`,
      "success"
    );
  }

  // ----------------------
  // 🔵 Conversion Logic
  // ----------------------

  const tempInCelsius = CONVERT.toCelsius[fromUnit](temperature);
  const finalTemp = CONVERT.fromCelsius[toUnit](tempInCelsius);

  // Kelvin cannot be negative after conversion
  if (toUnit === "kelvin" && finalTemp < 0)
    return showResult("⚠️ Resulting temperature in Kelvin cannot be below 0 K.", "error");

  // Show success result
  showResult(`${finalTemp.toFixed(2)}° ${UNIT_LABELS[toUnit]}`, "success");
}
