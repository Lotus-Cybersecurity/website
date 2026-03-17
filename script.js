const menuToggle = document.getElementById("menuToggle");
const siteNav = document.getElementById("siteNav");
const navLinks = document.querySelectorAll(".site-nav a");
const contactForm = document.getElementById("contactForm");
const formMessage = document.getElementById("formMessage");

if (menuToggle && siteNav) {
  menuToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
}

if (contactForm && formMessage) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const name = document.getElementById("name").value.trim();
    const business = document.getElementById("business").value.trim();

    formMessage.textContent =
      "Thanks" +
      (name ? ", " + name : "") +
      ". Your consultation request for " +
      (business ? business : "your business") +
      " has been received. We will be in touch soon.";

    contactForm.reset();
  });
}
