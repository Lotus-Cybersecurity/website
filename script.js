const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("show");
  });

  navMenu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("show");
    });
  });
}

const pricingToggle = document.getElementById("pricingToggle");
const monitorPrice = document.getElementById("monitorPrice");
const monitorSubtext = document.getElementById("monitorSubtext");
const monthlyLabel = document.getElementById("monthlyLabel");
const yearlyLabel = document.getElementById("yearlyLabel");

if (pricingToggle && monitorPrice && monitorSubtext && monthlyLabel && yearlyLabel) {
  pricingToggle.addEventListener("change", () => {
    if (pricingToggle.checked) {
      monitorPrice.innerHTML = "$765<span>/device/year</span>";
      monitorSubtext.textContent = "Billed yearly • Save 15%";
      monthlyLabel.classList.remove("active");
      yearlyLabel.classList.add("active");
    } else {
      monitorPrice.innerHTML = "$75<span>/device/month</span>";
      monitorSubtext.textContent = "Billed monthly";
      monthlyLabel.classList.add("active");
      yearlyLabel.classList.remove("active");
    }
  });
}

const contactForm = document.querySelector(".contact-form");

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("Form submitted. Connect this form to your email or form backend when you're ready.");
  });
}
