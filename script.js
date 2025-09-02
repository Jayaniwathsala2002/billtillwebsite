document.addEventListener("DOMContentLoaded", () => {
  const mobileToggle = document.getElementById("mobileToggle");
  const mobileNav = document.getElementById("mobileNav");
  const overlay = document.getElementById("overlay");
  const navbar = document.getElementById("navbar");

  // Toggle mobile navigation
  function toggleMobileNav() {
    mobileToggle.classList.toggle("active");
    mobileNav.classList.toggle("open");
    overlay.classList.toggle("active");
    document.body.style.overflow = mobileNav.classList.contains("open")
      ? "hidden"
      : "";
  }

  mobileToggle.addEventListener("click", toggleMobileNav);
  overlay.addEventListener("click", toggleMobileNav);

  // Close mobile nav when clicking on links
  const navLinks = document.querySelectorAll(
    ".mobile-nav .nav-link, .mobile-nav .nav-btn"
  );
  navLinks.forEach((link) => {
    link.addEventListener("click", toggleMobileNav);
  });

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Hero carousel functionality
  const slides = document.querySelectorAll(".hero-slide");
  const dots = document.querySelectorAll(".carousel-indicators .dot");
  const rotatingWord = document.getElementById("rotatingWord");

  const words = ["RETAIL", "RESTAURANT", "RENT-A-CAR"];
  let wordIndex = 0;
  let slideIndex = 0;

  const showSlide = (index) => {
    slides.forEach((slide, i) => {
      slide.classList.toggle("active", i === index);
    });
    dots.forEach((dot, i) => {
      dot.classList.toggle("active", i === index);
      dot.setAttribute("aria-selected", i === index);
    });
  };

  const nextSlide = () => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
  };

  const nextWord = () => {
    wordIndex = (wordIndex + 1) % words.length;
    rotatingWord.style.transition =
      "transform 0.8s ease-in-out, opacity 0.8s ease-in-out";
    rotatingWord.style.transform = "translateY(-100%)";
    rotatingWord.style.opacity = "0";

    setTimeout(() => {
      rotatingWord.textContent = words[wordIndex];
      rotatingWord.style.transition = "none";
      rotatingWord.style.transform = "translateY(100%)";
      rotatingWord.style.opacity = "0";

      void rotatingWord.offsetWidth;

      rotatingWord.style.transition =
        "transform 0.8s ease-in-out, opacity 0.8s ease-in-out";
      rotatingWord.style.transform = "translateY(0)";
      rotatingWord.style.opacity = "1";
    }, 800);
  };

  setInterval(nextSlide, 4000);
  setInterval(nextWord, 4000);

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      slideIndex = parseInt(dot.dataset.index);
      showSlide(slideIndex);
    });

    dot.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        slideIndex = parseInt(dot.dataset.index);
        showSlide(slideIndex);
      }
    });
  });
});

// =========================
// Pricing Section
// =========================
function selectPlan(card) {
  document.querySelectorAll(".pricing-card").forEach((c) => {
    c.classList.remove("selected");
    c.querySelector(".pricing-btn").classList.remove("selected-btn");
  });
  card.classList.add("selected");
  card.querySelector(".pricing-btn").classList.add("selected-btn");
}

const toggle = document.getElementById("billingToggle");
const dynamicPrice = document.getElementById("dynamicPrice");
const proPrice = document.getElementById("proPrice");
const monthlyText = document.getElementById("monthlyText");
const annualText = document.getElementById("annualText");

function updateToggleState() {
  if (toggle.checked) {
    dynamicPrice.innerHTML = "$47<span>/month</span>";
    proPrice.innerHTML = "$236<span>/month</span>";
    monthlyText.classList.remove("active");
    annualText.classList.add("active");
  } else {
    dynamicPrice.innerHTML = "$59<span>/month</span>";
    proPrice.innerHTML = "$299<span>/month</span>";
    annualText.classList.remove("active");
    monthlyText.classList.add("active");
  }
}

toggle.addEventListener("change", updateToggleState);

monthlyText.addEventListener("click", () => {
  toggle.checked = false;
  updateToggleState();
});

annualText.addEventListener("click", () => {
  toggle.checked = true;
  updateToggleState();
});

window.addEventListener("DOMContentLoaded", () => {
  const dynamicCard = document.getElementById("dynamicCard");
  if (dynamicCard) {
    selectPlan(dynamicCard);
  }
});

// =========================
// Contact Section
// =========================
// Show WhatsApp button only when Contact section is in view
    const whatsappButton = document.querySelector('.whatsapp-float');
    const contactSection = document.getElementById('contact');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            whatsappButton.classList.add('visible');
          } else {
            whatsappButton.classList.remove('visible');
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(contactSection);

    // Handle form submission (hardcoded message)
    document.getElementById("contactForm").addEventListener("submit", function (e) {
      e.preventDefault();

      // Always send the same predefined message
      const text = `Hi Bill Till,%0A%0AI am interested in your POS system. Please provide me with more details.%0A%0AThank you!`;
      const url = `https://wa.me/94770600508?text=${text}`;

      window.open(url, '_blank');
      this.reset();
    });


    // =========================
//  Language Modal
// =========================

let selectedLang = null;
let langLinks = {}; // 🔹 store links globally so confirmOk can access

// Step 1: User clicks a language
function chooseLanguage(lang) {
  selectedLang = lang;

  // Messages in different languages
  const messages = {
    Sinhala: "ඔබ සිංහල තෝරාගෙන ඇත. ඔබට ඉදිරියට යාමට අවශ්‍යද?",
    Tamil: "நீங்கள் தமிழ் தேர்ந்தெடுத்தீர்கள். தொடர விரும்புகிறீர்களா?",
    English: "You selected English. Do you want to continue?",
  };

  // Buttons in different languages
  const buttons = {
    Sinhala: { ok: "හරි", cancel: "ඉවතට" },
    Tamil: { ok: "சரி", cancel: "ரத்து" },
    English: { ok: "OK", cancel: "Cancel" },
  };

  // Target links for each language (🔹 Moved to global storage)
  langLinks = {
    Sinhala: "sinhala.html", // 🔹 Replace with Sinhala page link
    Tamil: "tamil.html", // 🔹 Replace with Tamil page link
    English: "english.html", // 🔹 Replace with English page link
  };

  // Set message and buttons
  document.getElementById("confirmMessage").innerText = messages[lang];
  document.getElementById("okButton").innerText = buttons[lang].ok;
  document.getElementById("cancelButton").innerText = buttons[lang].cancel;

  // Show confirmation modal
  document.getElementById("confirmModal").style.display = "flex";
}

// Step 2: OK pressed → go to correct page
function confirmOk() {
  if (selectedLang && langLinks[selectedLang]) {
    // 🔹 Save selected language (optional)
    localStorage.setItem("selectedLanguage", selectedLang);

    // 🔹 Redirect to the chosen page
    window.location.href = langLinks[selectedLang];
  }
}

// Step 3: Cancel pressed → back to language selection
function confirmCancel() {
  selectedLang = null;
  document.getElementById("confirmModal").style.display = "none";
  document.getElementById("languageModal").style.display = "flex";
}

// Step 4: Force language selection on page load
window.onload = function () {
  localStorage.removeItem("selectedLanguage");
  document.getElementById("languageModal").style.display = "flex";
  document.getElementById("mainContent").style.display = "none";
};

// Create custom cursor
const cursor = document.createElement("div");
cursor.classList.add("cursor");
document.body.appendChild(cursor);

// Move with mouse
document.addEventListener("mousemove", (e) => {
  cursor.style.top = e.clientY + "px";
  cursor.style.left = e.clientX + "px";
});




