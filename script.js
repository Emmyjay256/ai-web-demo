async function sendData() {
    // Get input from the text box
    const input = document.getElementById("userInput").value;

    // Convert input string into an array of 7 numbers
    const features = input.split(",").map(num => parseFloat(num.trim()));

    // Validate input
    if (features.length !== 7 || features.some(isNaN)) {
        document.getElementById("output").innerText =
            "Please enter exactly 7 numbers separated by commas.";
        return;
    }

    // Firebase function URL
    const url = "https://predictstar-43yyvuwo6a-uc.a.run.app";

    try {
        // Send POST request with features array
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ features }),
        });

        // Parse JSON response
        const result = await response.json();

        // Display the predicted spectral type
        if (result.pred_label) {
            document.getElementById("output").innerText =
                "Predicted spectral type: " + result.pred_label;
        } else {
            document.getElementById("output").innerText =
                "Prediction received, but no label returned.";
        }

    } catch (error) {
        console.error(error);
        document.getElementById("output").innerText = "Error getting prediction.";
    }
}
