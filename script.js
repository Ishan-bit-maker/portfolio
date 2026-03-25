/**
 * Portfolio Interactions
 */

// --- Quote of the Day ---
const quotes = [
  "with great power comes with great responsibility",
  "you cannot add days to your life but you can add life to your days",
  "sometimes it is better to be kind than right",
  "sunset is the proof that the ending can be beautiful too",
  "the computer is a bicycle for the mind",
  "simplicity is the ultimate sophistication"
];

function displayQuoteOfTheDay() {
  const quoteContainer = document.getElementById("qotd-content");
  if (!quoteContainer) return;

  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[quoteIndex];

  quoteContainer.innerHTML = `<span style="font-style: italic;">"${selectedQuote}"</span>`;
}

// --- Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  displayQuoteOfTheDay();
});
