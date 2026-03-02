document.addEventListener("DOMContentLoaded", function () {
  const sections = document.querySelectorAll("section[id]");
  const tocLinks = document.querySelectorAll(".toc a");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          tocLinks.forEach(link => link.classList.remove("active"));

          const activeLink = document.querySelector(
            `.toc a[href="#${entry.target.id}"]`
          );
          if (activeLink) {
            activeLink.classList.add("active");
          }
        }
      });
    },
    {
      root: null,
      rootMargin: "112px 0px -33% 0px",
      threshold: 0.5
    }
  );

  sections.forEach(section => observer.observe(section));
});