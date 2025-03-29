const cards = document.querySelectorAll(".mushroom-guide .card");
const seasonalFilter = document.querySelector("#season");
const edibleFilter = document.querySelector("#edible");
const noMatches = document.querySelector(".no-matches");

const currentFilters = {
  season: "all",
  edible: "all",
};

function updateFilter(e) {
  const filterType = e.target.name;
  currentFilters[filterType] = e.target.value;
  if (!document.startViewTransition) {
    filterCards();
    return;
  }
  // If the browser does not support View Transitions, fallback to the default behavior
  // Otherwise, use View Transitions to animate the changes
  // to the DOM
  document.startViewTransition(() => {
    filterCards();
  });
}

seasonalFilter.addEventListener("change", updateFilter);
edibleFilter.addEventListener("change", updateFilter);
cards.forEach((card, index) => {
  const mushroomId = `mushroom-${index + 1}`;
  card.style.viewTransitionName = `card-${mushroomId}`;
});

function filterCards() {
  let hasVisibleCards = false;
  cards.forEach((card) => {
    const season = card.querySelector("[data-season]").dataset.season;
    const edible = card.querySelector("[data-edible]").dataset.edible;
    const isSeasonMatch =
      currentFilters.season === "all" || season === currentFilters.season;
    const isEdibleMatch =
      currentFilters.edible === "all" || edible === currentFilters.edible;
    const isMatch = isSeasonMatch && isEdibleMatch;
    card.hidden = !isMatch;
    if (isMatch) {
      hasVisibleCards = true;
    }
  });
  if (!hasVisibleCards) {
    noMatches.hidden = false;
  } else {
    noMatches.hidden = true;
  }
}

function enableFilters() {
  seasonalFilter.removeAttribute("hidden");
  edibleFilter.removeAttribute("hidden");
}
enableFilters();
// Show the filters by default
