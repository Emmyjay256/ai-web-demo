async function sendData() {
    const input = document.getElementById("userInput").value;
    const features = input.split(",").map(num => parseFloat(num.trim()));

    if (features.length !== 7 || features.some(isNaN)) {
        document.getElementById("output").innerText =
            "Please enter exactly 7 numbers separated by commas.";
        return;
    }

    const url = "https://predictstar-43yyvuwo6a-uc.a.run.app";

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ features }),
        });

        const result = await response.json();

        // Debug: log the full backend response
        console.log("Backend response:", result);

        // Show full JSON response in the page
        document.getElementById("output").innerText =
            "Full response:\n" + JSON.stringify(result, null, 2);

        // If pred_label is available, show it separately too
        if (result.pred_label) {
            document.getElementById("output").innerText +=
                "\n\nPredicted spectral type: " + result.pred_label;
        }

    } catch (error) {
        console.error("Fetch error:", error);
        document.getElementById("output").innerText = "Error getting prediction.";
    }
}
