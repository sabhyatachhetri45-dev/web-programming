const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector("#primary-nav");

if (menuButton && navigation) {
  const menuLabel = menuButton.querySelector(".sr-only");
  const menuIcon = menuButton.querySelector(".menu-icon");

  const setMenuOpen = (isOpen) => {
    menuButton.setAttribute("aria-expanded", String(isOpen));
    navigation.classList.toggle("is-open", isOpen);

    if (menuLabel) {
      menuLabel.textContent = isOpen
        ? "Close navigation"
        : "Open navigation";
    }

    if (menuIcon) {
      menuIcon.textContent = isOpen ? "×" : "☰";
    }
  };

  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") !== "true";
    setMenuOpen(isOpen);
  });

  navigation.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      setMenuOpen(false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      setMenuOpen(false);
    }
  });
}

const dateInput = document.querySelector("#visit-date");

if (dateInput instanceof HTMLInputElement) {
  const today = new Date();
  const localToday = new Date(
    today.getTime() - today.getTimezoneOffset() * 60_000
  )
    .toISOString()
    .slice(0, 10);

  dateInput.min = localToday;
}

const plannerForm = document.querySelector("#day-planner");
const plannerMessage = document.querySelector("#planner-message");

const suggestions = {
  culture:
    "Start at Gyeongbokgung Palace, then slow down over tea in a nearby hanok café.",
  food:
    "Begin with market snacks at Gwangjang Market, then follow the neighbourhood to a noodle shop.",
  neighbourhoods:
    "Walk the small streets of Seochon, pause at a local café, and finish with a Namsan view.",
};

if (plannerForm instanceof HTMLFormElement && plannerMessage) {
  plannerForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(plannerForm);
    const visitDate = String(formData.get("visitDate") ?? "");
    const interests = formData.getAll("interest").map(String);

    const today = new Date();
    const localToday = new Date(
      today.getTime() - today.getTimezoneOffset() * 60_000
    )
      .toISOString()
      .slice(0, 10);

    plannerMessage.removeAttribute("data-error");

    if (!visitDate) {
      plannerMessage.textContent =
        "Choose your visit date to get a suggestion.";
      plannerMessage.dataset.error = "true";
      dateInput?.focus();
      return;
    }

    if (visitDate < localToday) {
      plannerMessage.textContent = "Choose today or a future date.";
      plannerMessage.dataset.error = "true";
      dateInput?.focus();
      return;
    }

    if (interests.length === 0) {
      plannerMessage.textContent =
        "Choose at least one interest so we can tailor the idea.";
      plannerMessage.dataset.error = "true";
      plannerForm.querySelector('input[name="interest"]')?.focus();
      return;
    }

    const idea = suggestions[interests[0]] ?? suggestions.culture;

    const formattedDate = new Intl.DateTimeFormat("en", {
      month: "long",
      day: "numeric",
      timeZone: "UTC",
    }).format(new Date(`${visitDate}T00:00:00Z`));

    plannerMessage.textContent = `For ${formattedDate}: ${idea}`;
  });
}

const year = document.querySelector("#current-year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}