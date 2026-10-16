const menuToggle = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");
const filterButtons = document.querySelectorAll(".filter-button");
const certificationCards = document.querySelectorAll(".cert-card");
const searchInput = document.querySelector("#cert-search");
const noResults = document.querySelector("#no-results");

function updateCertifications() {
  const activeFilter = document.querySelector(".filter-button.is-active")?.dataset.filter ?? "all";
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  certificationCards.forEach((card) => {
    const matchesFilter = activeFilter === "all" || card.dataset.category === activeFilter;
    const searchableText = `${card.dataset.search} ${card.textContent}`.toLowerCase();
    const matchesSearch = !query || searchableText.includes(query);
    const isVisible = matchesFilter && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  noResults.hidden = visibleCount > 0;
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((filter) => {
      const isActive = filter === button;
      filter.classList.toggle("is-active", isActive);
      filter.setAttribute("aria-pressed", String(isActive));
    });
    updateCertifications();
  });
});

searchInput.addEventListener("input", updateCertifications);

searchInput.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    searchInput.value = "";
    updateCertifications();
    searchInput.blur();
  }
});

document.addEventListener("keydown", (event) => {
  if (event.key === "/" && !["INPUT", "TEXTAREA"].includes(document.activeElement.tagName)) {
    event.preventDefault();
    searchInput.focus();
  }
});

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation menu" : "Close navigation menu");
  navigation.classList.toggle("is-open", !isOpen);
});

navigation.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation menu");
    navigation.classList.remove("is-open");
  });
});

document.querySelector("#current-year").textContent = new Date().getFullYear();
