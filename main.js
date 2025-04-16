function convertTemp() {
  const input = parseFloat(document.getElementById('tempInput').value);
  const from = document.getElementById('fromUnit').value;
  const to = document.getElementById('toUnit').value;
  const resultBox = document.getElementById('result');

  if (isNaN(input)) {
    resultBox.textContent = "Please enter a valid number";
    resultBox.style.color = "#ef4444";
    return;
  }

  let output;

  if (from === to) {
    output = input;
  } else if (from === "C" && to === "F") {
    output = (input * 9/5) + 32;
  } else if (from === "C" && to === "K") {
    output = input + 273.15;
  } else if (from === "F" && to === "C") {
    output = (input - 32) * 5/9;
  } else if (from === "F" && to === "K") {
    output = (input - 32) * 5/9 + 273.15;
  } else if (from === "K" && to === "C") {
    output = input - 273.15;
  } else if (from === "K" && to === "F") {
    output = (input - 273.15) * 9/5 + 32;
  }

  resultBox.textContent = `${input}°${from} = ${output.toFixed(2)}°${to}`;
  resultBox.style.color = "#10b981";
}
