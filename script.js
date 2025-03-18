async function generateQuote() {
    let type = document.getElementById("type").value.trim().toLowerCase();
    let tone = document.getElementById("tone").value.trim().toLowerCase();

    if (!type || !tone) {
        document.getElementById("quote").innerText = "Please enter both type and tone.";
        return;
    }

    try {
        let response = await fetch(`https://api.quotable.io/random?tags=${type}`);
        let data = await response.json();

        if (!data.content) {
            document.getElementById("quote").innerText = "No quotes found for this type.";
            return;
        }

        document.getElementById("quote").innerText = `"${data.content}" - ${data.author}`;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("quote").innerText = "Failed to fetch a quote.";
    }
}
