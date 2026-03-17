// Intentionally minimal for now.
// You can add small interactions here later if you want.

const titles = {
  home: "Dashboard",
  discover: "Find Mentors",
  messages: "Messages",
  qa: "Q&A Board",
  groups: "Discussion Groups"
};

function showScreen(name, el) {
  document.querySelectorAll(".screen").forEach((s) => s.classList.remove("active"));
  document.querySelectorAll(".nav-item").forEach((n) => n.classList.remove("active"));

  const screen = document.getElementById("screen-" + name);
  if (screen) {
    screen.classList.add("active");
  }

  const title = titles[name];
  if (title) {
    const titleEl = document.getElementById("page-title");
    if (titleEl) {
      titleEl.textContent = title;
    }
  }

  if (el) {
    el.classList.add("active");
  }
}

function setChip(el) {
  const row = el.closest(".chip-row");
  if (!row) return;
  row.querySelectorAll(".chip").forEach((c) => c.classList.remove("on"));
  el.classList.add("on");
}

function openChat(initials, name, avClass, status, statusColor) {
  // mark active conversation
  document.querySelectorAll(".conv-item").forEach((c) => c.classList.remove("active"));
  if (window.event && window.event.currentTarget) {
    window.event.currentTarget.classList.add("active");
  }

  // update avatar
  const av = document.getElementById("chat-av");
  if (av) {
    av.textContent = initials;
    av.className = "av " + avClass;
    av.style.width = "38px";
    av.style.height = "38px";
    av.style.fontSize = "12px";
  }

  // update header text
  const nameEl = document.getElementById("chat-name");
  if (nameEl) {
    nameEl.textContent = name;
  }
  const statusEl = document.getElementById("chat-status");
  if (statusEl) {
    statusEl.textContent = status;
    statusEl.style.color = statusColor;
  }
}

const quotes = [
  "you cannot add days to your life but you can add life to your days",
  "sometimes it is better to be kind than right",
  "sunset is the proof that the ending can be beautiful too"
];

function displayQuoteOfTheDay() {
  const quoteContainer = document.getElementById("qotd-content");
  if (!quoteContainer) return;

  const quoteIndex = Math.floor(Math.random() * quotes.length);
  const selectedQuote = quotes[quoteIndex];

  quoteContainer.innerHTML = `<span style="color: var(--fg); font-style: italic;">"${selectedQuote}"</span>`;
}

// Run when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", displayQuoteOfTheDay);
