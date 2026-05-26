const header = document.querySelector("[data-header]");
const reveals = document.querySelectorAll(".reveal");
const packageButtons = document.querySelectorAll("[data-package]");
const packageCopy = document.querySelector("[data-package-copy]");
const guests = document.querySelector("[data-guests]");
const guestOutput = document.querySelector("[data-guest-output]");
const estimate = document.querySelector("[data-estimate]");
const cursorGlow = document.querySelector(".cursor-glow");
const bookingButton = document.querySelector("[data-text-booking]");
const quoteForm = document.querySelector(".quote-form");
const bookingPhone = "+13135985098";

const packageContent = {
  woodFired: {
    kicker: "Wood-fired package",
    title: "Pizza, pasta, salad, and apps",
    body: "A familiar party format with elevated flavors, easy portions, and food that keeps moving.",
  },
  dinner: {
    kicker: "Dinner package",
    title: "Small plates, mains, sides, and sweets",
    body: "A fuller service flow for private dinners, family parties, weddings, and plated-style moments.",
  },
  custom: {
    kicker: "Custom package",
    title: "Tell Tre what you want made",
    body: "Italian, comfort food, brunch, snacks, desserts, or a one-off menu built around the event.",
  },
};

const money = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

function updateHeader() {
  header.classList.toggle("is-scrolled", window.scrollY > 18);
}

function updateEstimate() {
  const count = Number(guests.value);
  const base = Math.max(125, count * 40);
  guestOutput.textContent = count;
  estimate.textContent = `${money.format(base)}+`;
}

function textBookingRequest() {
  const formData = new FormData(quoteForm);
  const name = formData.get("name")?.trim() || "Guest";
  const phone = formData.get("phone")?.trim() || "Not provided";
  const event = formData.get("event") || "Event";
  const menuFocus = formData.get("menuFocus") || "Custom menu";
  const notes = formData.get("notes")?.trim() || "No notes yet";
  const body = [
    "Booking request for Tre's Catering",
    `Name: ${name}`,
    `Phone: ${phone}`,
    `Event: ${event}`,
    `Menu focus: ${menuFocus}`,
    `Guests: ${guests.value}`,
    `Estimate shown: ${estimate.textContent}`,
    `Notes: ${notes}`,
  ].join("\n");

  window.location.href = `sms:${bookingPhone}?&body=${encodeURIComponent(body)}`;
}

function setPackage(kind) {
  const content = packageContent[kind];
  packageButtons.forEach((button) => {
    button.classList.toggle("active", button.dataset.package === kind);
  });
  packageCopy.animate(
    [
      { opacity: 0, transform: "translateY(8px)" },
      { opacity: 1, transform: "translateY(0)" },
    ],
    { duration: 260, easing: "ease-out" },
  );
  packageCopy.innerHTML = `
    <p class="kicker">${content.kicker}</p>
    <h3>${content.title}</h3>
    <p>${content.body}</p>
  `;
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  },
  { threshold: 0.16 },
);

reveals.forEach((item) => observer.observe(item));
packageButtons.forEach((button) => {
  button.addEventListener("click", () => setPackage(button.dataset.package));
});

guests.addEventListener("input", updateEstimate);
bookingButton.addEventListener("click", textBookingRequest);
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("pointermove", (event) => {
  cursorGlow.style.opacity = "1";
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

updateHeader();
updateEstimate();
