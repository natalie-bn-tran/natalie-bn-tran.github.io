window.addEventListener("DOMContentLoaded", () => {
  const tocLinks = Array.from(document.querySelectorAll(".toc a"));
  const sections = Array.from(document.querySelectorAll("section[id]"));

  // Track which sections are currently intersecting
  const intersecting = new Map(); // id -> IntersectionObserverEntry

  function setActive(id) {
    tocLinks.forEach(a => a.classList.toggle("active", a.getAttribute("href") === `#${id}`));
  }

  const observer = new IntersectionObserver((entries) => {
    // Update our stored intersection state
    for (const entry of entries) {
      intersecting.set(entry.target.id, entry);
    }

    // Candidates: currently intersecting sections
    const candidates = Array.from(intersecting.values())
      .filter(e => e.isIntersecting);

    if (!candidates.length) return;

    // Pick the one closest to the top of the viewport (feel free to tweak)
    candidates.sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

    setActive(candidates[0].target.id);
  }, {
    // This makes "current section" switch when it crosses the middle-ish of the screen
    rootMargin: "-40% 0px -55% 0px",
    threshold: 0
  });

  sections.forEach(section => observer.observe(section));
});