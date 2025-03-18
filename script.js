const API_KEY = "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"; // ⚠️ Store this securely!

async function generateQuote() {
    const prompt = "Generate a motivational quote.";

    document.getElementById("quote").innerText = "Generating...";

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/meta-llama/Llama-2-7b-chat-hf", {
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

        if (data && data.generated_text) {
            document.getElementById("quote").innerText = `"${data.generated_text}"`;
        } else if (Array.isArray(data) && data.length > 0 && data[0].generated_text) {
            document.getElementById("quote").innerText = `"${data[0].generated_text}"`;
        } else {
            document.getElementById("quote").innerText = "No quote generated.";
        }
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("quote").innerText = "Error generating quote.";
    }
}

