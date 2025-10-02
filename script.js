async function sendData() {
  const input = document.getElementById("userInput").value;

  // Replace with your Firebase function URL later
  const url = "https://us-central1-YOUR_PROJECT_ID.cloudfunctions.net/getPrediction";

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: input }),
    });

    const result = await response.json();
    document.getElementById("output").innerText = "Prediction: " + result.result;
  } catch (error) {
    console.error(error);
    document.getElementById("output").innerText = "Error getting prediction.";
  }
}
