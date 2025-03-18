const API_KEY = "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"; 

async function generateQuote() {
    const prompt = "Generate a motivational quote.";

    document.getElementById("quote").innerText = "Generating...";

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill", { 
            method: "POST",
            headers: {
                "Authorization": `Bearer ${API_KEY}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ inputs: prompt })
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        document.getElementById("quote").innerText = data.generated_text || "No quote generated.";
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("quote").innerText = "Error generating quote.";
    }
}
