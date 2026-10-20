// Theme handling & smooth interactions
(function () {
  const savedTheme = localStorage.getItem("portfolio-theme");
  const systemPrefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
  if (savedTheme === "dark" || (!savedTheme && systemPrefersDark)) {
    // If the user previously chose dark or OS prefers dark, check if they explicitly set it.
    // However, default to the pristine light paper theme unless explicitly toggled dark.
    if (savedTheme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    }
  }
})();

document.addEventListener("DOMContentLoaded", () => {
  // Theme Toggle Button
  const themeToggle = document.getElementById("theme-toggle");
  if (themeToggle) {
    const updateIcon = () => {
      const isDark = document.documentElement.getAttribute("data-theme") === "dark";
      themeToggle.innerHTML = isDark
        ? `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg>`
        : `<svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>`;
      themeToggle.setAttribute("aria-label", isDark ? "Switch to light theme" : "Switch to dark theme");
    };

    updateIcon();

    themeToggle.addEventListener("click", () => {
      const current = document.documentElement.getAttribute("data-theme");
      const next = current === "dark" ? "light" : "dark";
      if (next === "dark") {
        document.documentElement.setAttribute("data-theme", "dark");
        localStorage.setItem("portfolio-theme", "dark");
      } else {
        document.documentElement.removeAttribute("data-theme");
        localStorage.setItem("portfolio-theme", "light");
      }
      updateIcon();
    });
  }

  // One-Click Email Copy with visual feedback
  const copyBtn = document.getElementById("copy-email-btn");
  if (copyBtn) {
    const tooltip = copyBtn.querySelector(".copy-tooltip");
    copyBtn.addEventListener("click", () => {
      const email = "shresthaishan65@gmail.com";
      const onCopied = () => {
        copyBtn.classList.add("copied");
        if (tooltip) tooltip.textContent = "copied!";
        setTimeout(() => {
          copyBtn.classList.remove("copied");
          if (tooltip) tooltip.textContent = "copy";
        }, 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(email).then(onCopied).catch(onCopied);
      } else {
        const ta = document.createElement("textarea");
        ta.value = email;
        ta.style.position = "fixed";
        ta.style.opacity = "0";
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand("copy"); } catch (e) {}
        document.body.removeChild(ta);
        onCopied();
      }
    });
  }

  // Smooth Search and Filtering on Resources / Archive page
  const searchInput = document.getElementById("archive-search");
  const filterBtns = document.querySelectorAll(".filter-tag-btn");
  const catItems = document.querySelectorAll(".cat-nav-item");
  const entries = document.querySelectorAll(".resource-entry");
  const groups = document.querySelectorAll(".archive-group");

  if (searchInput || filterBtns.length || catItems.length) {
    let currentFilter = "all";
    let currentCategory = "all";
    let searchQuery = "";

    function applyFilters() {
      entries.forEach((el) => {
        const text = el.textContent.toLowerCase();
        const tag = (el.getAttribute("data-tag") || "").toLowerCase();
        const cat = (el.getAttribute("data-cat") || "").toLowerCase();

        const matchesSearch = !searchQuery || text.includes(searchQuery);
        const matchesTag = currentFilter === "all" || tag === currentFilter;
        const matchesCat = currentCategory === "all" || cat === currentCategory;

        if (matchesSearch && matchesTag && matchesCat) {
          el.classList.remove("is-hidden");
        } else {
          el.classList.add("is-hidden");
        }
      });

      // Hide group headers if all items in that group are hidden
      groups.forEach((grp) => {
        const visibleChildren = grp.querySelectorAll(".resource-entry:not(.is-hidden)");
        if (visibleChildren.length === 0) {
          grp.style.display = "none";
        } else {
          grp.style.display = "";
        }
      });

      const emptyMsg = document.getElementById("archive-empty");
      if (emptyMsg) {
        const totalVisible = document.querySelectorAll(".resource-entry:not(.is-hidden)").length;
        emptyMsg.style.display = totalVisible === 0 ? "block" : "none";
      }
    }

    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = e.target.value.trim().toLowerCase();
        applyFilters();
      });
    }

    filterBtns.forEach((btn) => {
      btn.addEventListener("click", () => {
        filterBtns.forEach((b) => {
          b.classList.remove("active");
          const marker = b.querySelector(".dot-marker");
          if (marker) marker.textContent = "▫";
        });
        btn.classList.add("active");
        const activeMarker = btn.querySelector(".dot-marker");
        if (activeMarker) activeMarker.textContent = "▪";

        currentFilter = (btn.getAttribute("data-filter") || "all").toLowerCase();
        applyFilters();
      });
    });

    catItems.forEach((cat) => {
      cat.addEventListener("click", () => {
        catItems.forEach((c) => c.classList.remove("active"));
        cat.classList.add("active");
        currentCategory = (cat.getAttribute("data-category") || "all").toLowerCase();
        applyFilters();
      });
    });
  }
});
