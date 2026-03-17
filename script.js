/* ============================================================
   LOTUS CYBERSECURITY — script.js
   ============================================================ */

(function () {
  "use strict";

  /* ----------------------------------------------------------
     1. NAVBAR — scroll detection + mobile toggle
  ---------------------------------------------------------- */
  const navbar = document.getElementById("navbar");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");

  function handleNavScroll() {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  }

  window.addEventListener("scroll", handleNavScroll, { passive: true });
  handleNavScroll(); // Run on load in case page is refreshed mid-scroll

  navToggle.addEventListener("click", function () {
    const isOpen = navLinks.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", isOpen);
    // Animate hamburger to X
    const spans = navToggle.querySelectorAll("span");
    if (isOpen) {
      spans[0].style.transform = "translateY(7px) rotate(45deg)";
      spans[1].style.opacity = "0";
      spans[2].style.transform = "translateY(-7px) rotate(-45deg)";
    } else {
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    }
  });

  // Close mobile nav on link click
  navLinks.querySelectorAll(".nav-link").forEach(function (link) {
    link.addEventListener("click", function () {
      navLinks.classList.remove("open");
      const spans = navToggle.querySelectorAll("span");
      spans[0].style.transform = "";
      spans[1].style.opacity = "";
      spans[2].style.transform = "";
    });
  });

  // Highlight active nav link based on scroll position
  const sections = document.querySelectorAll("section[id]");
  const navLinkEls = document.querySelectorAll(".nav-link:not(.nav-cta)");

  function highlightActiveNavLink() {
    let currentId = "";
    sections.forEach(function (section) {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentId = section.getAttribute("id");
      }
    });
    navLinkEls.forEach(function (link) {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + currentId) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", highlightActiveNavLink, { passive: true });

  /* ----------------------------------------------------------
     2. HERO PARTICLES
  ---------------------------------------------------------- */
  const particlesContainer = document.getElementById("heroParticles");

  function createParticle() {
    const particle = document.createElement("div");
    particle.classList.add("particle");

    const startX = Math.random() * window.innerWidth;
    const size = Math.random() * 3 + 1;
    const duration = Math.random() * 8 + 6;
    const delay = Math.random() * 4;

    particle.style.left = startX + "px";
    particle.style.bottom = "-10px";
    particle.style.width = size + "px";
    particle.style.height = size + "px";
    particle.style.animationDuration = duration + "s";
    particle.style.animationDelay = delay + "s";
    particle.style.opacity = "0";

    // Randomize color between accent and cyan
    if (Math.random() > 0.6) {
      particle.style.background = "#7dd3fc";
    }

    particlesContainer.appendChild(particle);

    // Remove particle after animation
    setTimeout(function () {
      if (particle.parentNode) {
        particle.parentNode.removeChild(particle);
      }
    }, (duration + delay) * 1000);
  }

  // Spawn particles periodically
  function spawnParticles() {
    const count = Math.floor(Math.random() * 2) + 1;
    for (let i = 0; i < count; i++) {
      createParticle();
    }
  }

  // Initial batch
  for (let i = 0; i < 12; i++) {
    setTimeout(createParticle, i * 300);
  }

  // Continuous spawn
  setInterval(spawnParticles, 800);

  /* ----------------------------------------------------------
     3. SCROLL ANIMATIONS — Intersection Observer
  ---------------------------------------------------------- */
  const animatedElements = document.querySelectorAll(
    ".fade-in-up, .fade-in-left, .fade-in-right"
  );

  const observerOptions = {
    threshold: 0.12,
    rootMargin: "0px 0px -40px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const el = entry.target;
        const delay = el.getAttribute("data-delay") || 0;

        setTimeout(function () {
          el.classList.add("visible");
        }, parseInt(delay));

        observer.unobserve(el);
      }
    });
  }, observerOptions);

  animatedElements.forEach(function (el) {
    observer.observe(el);
  });

  /* ----------------------------------------------------------
     4. CONTACT FORM — validation + success message
  ---------------------------------------------------------- */
  const contactForm = document.getElementById("contactForm");
  const formSuccess = document.getElementById("formSuccess");

  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const name = contactForm.querySelector("#name").value.trim();
    const business = contactForm.querySelector("#business").value.trim();
    const email = contactForm.querySelector("#email").value.trim();
    const message = contactForm.querySelector("#message").value.trim();

    // Basic validation
    if (!name || !business || !email || !message) {
      shakeForm();
      return;
    }

    if (!isValidEmail(email)) {
      const emailInput = contactForm.querySelector("#email");
      flashError(emailInput);
      return;
    }

    // Success state
    const submitBtn = contactForm.querySelector(".form-submit");
    submitBtn.disabled = true;
    submitBtn.style.opacity = "0.6";
    submitBtn.textContent = "Sending...";

    // Simulate async submission delay
    setTimeout(function () {
      contactForm.reset();
      submitBtn.disabled = false;
      submitBtn.style.opacity = "";
      submitBtn.innerHTML =
        '<span class="btn-glow"></span>Request Security Consultation <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>';
      formSuccess.classList.add("visible");

      // Hide success message after 8 seconds
      setTimeout(function () {
        formSuccess.classList.remove("visible");
      }, 8000);
    }, 1000);
  });

  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function flashError(input) {
    input.style.borderColor = "#f87171";
    input.style.boxShadow = "0 0 0 3px rgba(248, 113, 113, 0.15)";
    input.focus();
    setTimeout(function () {
      input.style.borderColor = "";
      input.style.boxShadow = "";
    }, 2000);
  }

  function shakeForm() {
    const wrapper = document.querySelector(".contact-form-wrapper");
    wrapper.style.animation = "none";
    wrapper.offsetHeight; // Force reflow
    wrapper.style.animation = "formShake 0.5s ease";
    setTimeout(function () {
      wrapper.style.animation = "";
    }, 500);
  }

  // Add shake keyframe dynamically
  const shakeStyle = document.createElement("style");
  shakeStyle.textContent =
    "@keyframes formShake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-6px)} 40%{transform:translateX(6px)} 60%{transform:translateX(-4px)} 80%{transform:translateX(4px)} }";
  document.head.appendChild(shakeStyle);

  /* ----------------------------------------------------------
     5. SMOOTH ANCHOR SCROLL — offset for sticky nav
  ---------------------------------------------------------- */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener("click", function (e) {
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = navbar.offsetHeight;
      const targetTop =
        target.getBoundingClientRect().top + window.scrollY - navHeight - 16;

      window.scrollTo({
        top: targetTop,
        behavior: "smooth",
      });
    });
  });

  /* ----------------------------------------------------------
     6. DATA STREAM ANIMATION — Blossom section
  ---------------------------------------------------------- */
  const dataLines = document.querySelectorAll(".data-line");
  const messages = [
    "SCANNING NETWORK TOPOLOGY...",
    "ANALYZING THREAT VECTORS...",
    "UPDATING DEFENSE MATRIX...",
    "ALL SYSTEMS NOMINAL...",
    "MONITORING ENDPOINTS...",
    "PATCH DATABASE SYNCED...",
    "FIREWALL RULES OPTIMIZED...",
    "ZERO THREATS DETECTED...",
  ];

  let msgIndex = 0;

  function rotateDataMessages() {
    dataLines.forEach(function (line, i) {
      setTimeout(function () {
        line.setAttribute("data-text", messages[(msgIndex + i) % messages.length]);
      }, i * 600);
    });
    msgIndex = (msgIndex + dataLines.length) % messages.length;
  }

  // Initial set
  dataLines.forEach(function (line, i) {
    line.setAttribute("data-text", messages[i % messages.length]);
  });

  setInterval(rotateDataMessages, 8000);

  /* ----------------------------------------------------------
     7. PRICING CARD — glow on hover (JS-enhanced)
  ---------------------------------------------------------- */
  const pricingCards = document.querySelectorAll(".pricing-card");

  pricingCards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.background =
        "radial-gradient(ellipse at " +
        x +
        "% " +
        y +
        "%, rgba(56,189,248,0.06) 0%, #071428 60%)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.background = "";
    });
  });

  /* ----------------------------------------------------------
     8. SERVICE CARDS — same tilt/glow effect
  ---------------------------------------------------------- */
  const serviceCards = document.querySelectorAll(".service-card");

  serviceCards.forEach(function (card) {
    card.addEventListener("mousemove", function (e) {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width) * 100;
      const y = ((e.clientY - rect.top) / rect.height) * 100;
      card.style.background =
        "radial-gradient(ellipse at " +
        x +
        "% " +
        y +
        "%, rgba(56,189,248,0.07) 0%, #071428 65%)";
    });

    card.addEventListener("mouseleave", function () {
      card.style.background = "";
    });
  });

  /* ----------------------------------------------------------
     9. PAGE LOAD — initial reveal sequence
  ---------------------------------------------------------- */
  window.addEventListener("load", function () {
    document.body.classList.add("loaded");

    // Stagger hero elements
    const heroContent = document.querySelector(".hero-content");
    const heroVisual = document.querySelector(".hero-visual");

    if (heroContent) {
      heroContent.style.transitionDelay = "0.1s";
      heroContent.classList.add("visible");
    }
    if (heroVisual) {
      heroVisual.style.transitionDelay = "0.35s";
      heroVisual.classList.add("visible");
    }
  });

  /* ----------------------------------------------------------
     10. FLOATING CARDS — parallax on mouse move in hero
  ---------------------------------------------------------- */
  const heroSection = document.querySelector(".hero");
  const floatCards = document.querySelectorAll(".hero-float-card");

  if (heroSection && floatCards.length) {
    heroSection.addEventListener("mousemove", function (e) {
      const rect = heroSection.getBoundingClientRect();
      const cx = (e.clientX - rect.left - rect.width / 2) / rect.width;
      const cy = (e.clientY - rect.top - rect.height / 2) / rect.height;

      floatCards.forEach(function (card, i) {
        const factor = (i + 1) * 6;
        card.style.transform =
          "translate(" +
          cx * factor +
          "px, " +
          cy * factor +
          "px)";
      });
    });

    heroSection.addEventListener("mouseleave", function () {
      floatCards.forEach(function (card) {
        card.style.transform = "";
      });
    });
  }

})();
