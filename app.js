const header = document.querySelector("[data-header]");
const reveals = document.querySelectorAll(".reveal");
const packageButtons = document.querySelectorAll("[data-package]");
const packageCopy = document.querySelector("[data-package-copy]");
const guests = document.querySelector("[data-guests]");
const guestOutput = document.querySelector("[data-guest-output]");
const estimate = document.querySelector("[data-estimate]");
const cursorGlow = document.querySelector(".cursor-glow");

const packageContent = {
  social: {
    kicker: "Social package",
    title: "Birthday, shower, and backyard spreads",
    body: "Easy service, bright food, sturdy timing, and a menu that keeps guests circulating.",
  },
  corporate: {
    kicker: "Corporate package",
    title: "Lunches, mixers, and team celebrations",
    body: "Clean setup, reliable portions, labeled options, and food that works around the workday.",
  },
  wedding: {
    kicker: "Wedding package",
    title: "Ceremony-to-reception catering flow",
    body: "Cocktail bites, dinner service, dessert touches, and late-night snacks with a calm event rhythm.",
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
  const base = count * 40;
  guestOutput.textContent = count;
  estimate.textContent = `${money.format(base)}+`;
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
window.addEventListener("scroll", updateHeader, { passive: true });
window.addEventListener("pointermove", (event) => {
  cursorGlow.style.opacity = "1";
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

updateHeader();
updateEstimate();
