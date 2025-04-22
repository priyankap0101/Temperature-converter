function convertTemp() {
    const inputElement = document.getElementById('tempInput');
    const input = parseFloat(inputElement.value.trim());
    const fromUnit = document.getElementById('fromUnit').value;
    const toUnit = document.getElementById('toUnit').value;
    const resultBox = document.getElementById('result');

    resultBox.textContent = "";
    resultBox.style.display = "none";

    if (isNaN(input) || input === "") {
        showResult("Please enter a valid number.", "#ef4444", "error");
        return;
    }


    if (fromUnit === "K" && input < 0) {
        showResult("Temperature in Kelvin cannot be negative.", "#ef4444", "error");
        return;
    }


    if (input < -273.15 && fromUnit === "C" || input < -459.67 && fromUnit === "F") {
        showResult("Temperature cannot be below absolute zero.", "#ef4444", "error");
        return;
    }

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

    if (fromUnit === toUnit) {
        showResult(`Both units are the same: ${input}°${fromUnit}`, "#10b981", "success");
        return;
    }

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

function showResult(message, color, type) {
    const resultBox = document.getElementById('result');
    resultBox.textContent = message;

    resultBox.classList.remove('success', 'error', 'info');

    if (type === 'success') {
        resultBox.classList.add('success');
    } else if (type === 'error') {
        resultBox.classList.add('error');
    } else {
        resultBox.classList.add('info');
    }

    resultBox.style.color = color;
    resultBox.style.display = "block";


    setTimeout(() => {
        resultBox.style.opacity = 1;
    }, 100);
}
