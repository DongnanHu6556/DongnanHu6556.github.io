const body = document.body;
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const menuButton = document.querySelector(".menu-button");
const navLinks = Array.from(document.querySelectorAll(".nav-links a"));
const sections = navLinks
  .map((link) => document.querySelector(link.getAttribute("href")))
  .filter(Boolean);

function openNavigation() {
  body.classList.add("nav-open");
  overlay.hidden = false;
  menuButton.setAttribute("aria-expanded", "true");
  menuButton.setAttribute("aria-label", "Close navigation");
  sidebar.focus({ preventScroll: true });
}

function closeNavigation() {
  body.classList.remove("nav-open");
  overlay.hidden = true;
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Open navigation");
}

menuButton.addEventListener("click", () => {
  if (body.classList.contains("nav-open")) {
    closeNavigation();
  } else {
    openNavigation();
  }
});

overlay.addEventListener("click", closeNavigation);

navLinks.forEach((link) => {
  link.addEventListener("click", () => {
    if (window.matchMedia("(max-width: 992px)").matches) {
      closeNavigation();
    }
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && body.classList.contains("nav-open")) {
    closeNavigation();
  }
});

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) {
        return;
      }

      navLinks.forEach((link) => {
        const isCurrent = link.getAttribute("href") === `#${visible.target.id}`;
        link.classList.toggle("is-active", isCurrent);
      });
    },
    {
      rootMargin: "-20% 0px -55% 0px",
      threshold: [0.15, 0.4, 0.7],
    }
  );

  sections.forEach((section) => observer.observe(section));
}
