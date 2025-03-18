async function generateQuote() {
    const type = document.getElementById("type").value.trim();
    const tone = document.getElementById("tone").value.trim();
    const prompt = `Generate a ${tone ? tone : "neutral"} ${type ? type : "motivational"} quote.`;

    document.getElementById("quote").innerText = "Generating...";

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf", {
            method: "POST",
            headers: {
                "Authorization": "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", // Uses .env variable
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: prompt })
        });

        const data = await response.json();

        if (data.error) {
            document.getElementById("quote").innerText = "Error: " + data.error;
            return;
        }

        document.getElementById("quote").innerText = `"${data[0].generated_text}"`;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("quote").innerText = "Failed to generate a quote.";
    }
}
