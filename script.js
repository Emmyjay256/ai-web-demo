async function sendData() {
    // Get the input string from the text box
    const input = document.getElementById("userInput").value;

    // Split input into 7 numbers
    const features = input.split(",").map(num => parseFloat(num.trim()));

    // Validate the input
    if (features.length !== 7 || features.some(isNaN)) {
        document.getElementById("output").innerText = 
            "Please enter exactly 7 numbers separated by commas.";
        return;
    }

    // Your deployed Firebase function URL
    const url = "https://predictstar-43yyvuwo6a-uc.a.run.app";

    try {
        // Send the features array as JSON
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ features: features }),
        });

        const result = await response.json();

        // Display the predicted spectral type returned by your function
        document.getElementById("output").innerText = 
            "Predicted spectral type: " + result.pred_label;
    } catch (error) {
        console.error(error);
        document.getElementById("output").innerText = "Error getting prediction.";
    }
}
