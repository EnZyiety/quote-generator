async function generateQuote() {
    try {
        let response = await fetch("https://api.quotable.io/random");
        let data = await response.json();
        document.getElementById("quote").innerText = `"${data.content}" - ${data.author}`;
    } catch (error) {
        console.error("Error:", error);
        document.getElementById("quote").innerText = "Failed to fetch a quote.";
    }
}
