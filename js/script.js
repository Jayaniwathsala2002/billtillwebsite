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
});

// =========================
// Product Section
// =========================

document.addEventListener('DOMContentLoaded', function() {
      // Modal elements
      const triggers = {
        retail: document.querySelector('.retail-modal-trigger'),
        restaurant: document.querySelector('.restaurant-modal-trigger'),
        rental: document.querySelector('.rental-modal-trigger')
      };
      
      const modals = {
        retail: document.getElementById('retail-modal'),
        restaurant: document.getElementById('restaurant-modal'),
        rental: document.getElementById('rental-modal')
      };
      
      const closeModalButtons = document.querySelectorAll('.modal-close');
      
      // Open modals
      Object.keys(triggers).forEach(key => {
        triggers[key].addEventListener('click', function(e) {
          e.preventDefault();
          modals[key].classList.add('active');
          document.body.style.overflow = 'hidden';
        });
      });
      
      // Close modals via × button
      closeModalButtons.forEach(button => {
        button.addEventListener('click', function() {
          const modal = this.closest('.modal-overlay');
          closeModal(modal);
        });
      });

      // Close modals via CTA button
      document.querySelectorAll('.modal-cta').forEach(button => {
        button.addEventListener('click', function() {
          const modal = this.closest('.modal-overlay');
          closeModal(modal);
        });
      });
      
      // Close on Escape key
      document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
          Object.values(modals).forEach(modal => {
            if (modal.classList.contains('active')) {
              closeModal(modal);
            }
          });
        }
      });
      
      function closeModal(modal) {
        modal.classList.remove('active');
        document.body.style.overflow = 'auto';
      }
    });

// =========================
// Shop Section
// =========================

document.addEventListener("DOMContentLoaded", function () {
            const container = document.getElementById("servicesContainer");
            const scrollWrapper = document.getElementById("servicesScroll");

            // Store original cards
            const originalCards = scrollWrapper.innerHTML;

            // Duplicate cards for infinite loop
            scrollWrapper.innerHTML += originalCards;

            let autoScrollSpeed = 1;
            let isPaused = false;
            let isDown = false;
            let startX;
            let scrollLeft;
            let animationId;
            let singleSetWidth = 0;

            // Calculate the width of a single set of cards
            function calculateSingleSetWidth() {
                const cards = scrollWrapper.querySelectorAll('.service-card');
                const gap = 40; // Updated to match CSS gap value
                singleSetWidth = 0;

                // Only calculate based on first set of cards (original ones)
                for (let i = 0; i < cards.length / 2; i++) {
                    if (cards[i]) {
                        singleSetWidth += cards[i].offsetWidth + gap;
                    }
                }

                // Remove the extra gap at the end
                singleSetWidth -= gap;
            }

            // Initialize
            calculateSingleSetWidth();
            window.addEventListener('resize', calculateSingleSetWidth);

            // Improved auto-scroll function with smooth animation
            function autoScroll() {
                if (!isPaused && !isDown) {
                    container.scrollLeft += autoScrollSpeed;

                    // Check if we've scrolled past the original content
                    if (container.scrollLeft >= singleSetWidth) {
                        // Jump back to the beginning without animation
                        container.style.scrollBehavior = 'auto';
                        container.scrollLeft = container.scrollLeft - singleSetWidth;

                        // Small delay to allow the DOM to update
                        setTimeout(() => {
                            container.style.scrollBehavior = 'smooth';
                        }, 50);
                    }
                }
                animationId = requestAnimationFrame(autoScroll);
            }

            // Pause on hover over any card or the container
            const allCards = document.querySelectorAll(".service-card");
            allCards.forEach(card => {
                card.addEventListener("mouseenter", () => {
                    isPaused = true;
                });
                card.addEventListener("mouseleave", () => {
                    isPaused = false;
                });
            });

            // Also pause when hovering over the container itself
            container.addEventListener("mouseenter", () => {
                isPaused = true;
            });
            container.addEventListener("mouseleave", () => {
                isPaused = false;
            });

            // Manual drag support
            container.addEventListener("mousedown", (e) => {
                isDown = true;
                isPaused = true;
                container.style.cursor = "grabbing";
                startX = e.pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
            });

            container.addEventListener("mouseleave", () => {
                isDown = false;
                container.style.cursor = "grab";
            });

            container.addEventListener("mouseup", () => {
                isDown = false;
                container.style.cursor = "grab";
                // Resume after a delay
                setTimeout(() => { isPaused = false; }, 2000);
            });

            container.addEventListener("mousemove", (e) => {
                if (!isDown) return;
                e.preventDefault();
                const x = e.pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeft - walk;
            });

            // Touch support for mobile devices
            container.addEventListener("touchstart", (e) => {
                isDown = true;
                isPaused = true;
                startX = e.touches[0].pageX - container.offsetLeft;
                scrollLeft = container.scrollLeft;
            }, { passive: true });

            container.addEventListener("touchend", () => {
                isDown = false;
                // Resume after a delay
                setTimeout(() => { isPaused = false; }, 2000);
            }, { passive: true });

            container.addEventListener("touchmove", (e) => {
                if (!isDown) return;
                const x = e.touches[0].pageX - container.offsetLeft;
                const walk = (x - startX) * 2;
                container.scrollLeft = scrollLeft - walk;
            }, { passive: true });

            // Start the animation
            autoScroll();

            // Clean up animation on page exit
            window.addEventListener('beforeunload', () => {
                cancelAnimationFrame(animationId);
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




