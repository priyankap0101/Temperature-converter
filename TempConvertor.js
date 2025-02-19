function convertTemp() {
  const inputTemp = parseFloat(document.getElementById("inputTemp").value);
  const inputUnit = document.getElementById("inputUnit").value;
  const targetUnit = document.getElementById("targetUnit").value;
  const outputBox = document.getElementById("output");

  if (isNaN(inputTemp)) {
    outputBox.innerHTML =
      '<p class="error-msg">⚠️ Please enter a valid number.</p>';
    outputBox.className = "output-box error";
    outputBox.style.display = "block";
    return;
  }

  // Temperature conversion logic using a map
  const conversions = {
    celsius: {
      fahrenheit: (temp) => (temp * 9) / 5 + 32,
      kelvin: (temp) => temp + 273.15,
    },
    fahrenheit: {
      celsius: (temp) => ((temp - 32) * 5) / 9,
      kelvin: (temp) => ((temp - 32) * 5) / 9 + 273.15,
    },
    kelvin: {
      celsius: (temp) => temp - 273.15,
      fahrenheit: (temp) => ((temp - 273.15) * 9) / 5 + 32,
    },
  };

  const result =
    inputUnit === targetUnit
      ? inputTemp
      : conversions[inputUnit]?.[targetUnit]?.(inputTemp);

  // Temperature description
  const tempRanges = [
    {
      limit: -30,
      description: "❄️ Dangerously Cold! Stay indoors!",
      className: "extreme-cold",
    },
    {
      limit: 10,
      description: "🧥 Cold, wear warm clothes.",
      className: "cold",
    },
    { limit: 25, description: "🌤️ Pleasant temperature.", className: "" },
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

  const { description, className } = tempRanges.find(
    (range) => result < range.limit
  );

  // Apply Changes
  outputBox.innerHTML = `
    <p><strong>Converted Temperature:</strong> ${result.toFixed(2)} 
    ${
      targetUnit === "celsius" ? "°C" : targetUnit === "fahrenheit" ? "°F" : "K"
    }<br>${description}</p>
  `;
  outputBox.className = `output-box ${className}`;
  outputBox.style.display = "block";
  outputBox.style.opacity = "0";

  // Smooth transition effect
  setTimeout(() => (outputBox.style.opacity = "1"), 100);
}
