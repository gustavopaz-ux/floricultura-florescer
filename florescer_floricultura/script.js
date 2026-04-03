
const cursor = document.getElementById("cursor");
const ring = document.getElementById("cursorRing");
let mouseX = 0,
  mouseY = 0;
let ringX = 0,
  ringY = 0;
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
});

function animateRing() {
  ringX += (mouseX - ringX) * 0.12;
  ringY += (mouseY - ringY) * 0.12;
  ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;
  requestAnimationFrame(animateRing);
}
animateRing();
document
  .querySelectorAll("a, button, .cat-card, .product-card")
  .forEach((el) => {
    el.addEventListener("mouseenter", () => {
      ring.style.width = "56px";
      ring.style.height = "56px";
    });
    el.addEventListener("mouseleave", () => {
      ring.style.width = "36px";
      ring.style.height = "36px";
    });
  });


const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  navbar.classList.toggle("scrolled", window.scrollY > 60);
});


const reveals = document.querySelectorAll(".reveal");
const revealOb = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
      }
    });
  },
  { threshold: 0.1 },
);

reveals.forEach((el) => revealOb.observe(el));

function animateCount(el) {
  const target = parseInt(el.dataset.count);
  const duration = 2000;
  const step = target / (duration / 16);
  let current = 0;
  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    el.textContent = Math.floor(current).toLocaleString("pt-BR");
  }, 16);
}

const statOb = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        statOb.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 },
);

document.querySelectorAll("[data-count]").forEach((el) => statOb.observe(el));


const cartNotif = document.getElementById("cartNotif");

function addToCart() {
  cartNotif.classList.add("show");

  setTimeout(() => cartNotif.classList.remove("show"), 2500);
}

function handleNewsletter(e) {
  e.preventDefault();

  const btn = e.target.querySelector("button");

  btn.textContent = "🌸 Inscrito!";
  btn.style.background = "var(--forest)";

  setTimeout(() => {
    btn.textContent = "Quero desconto";
    btn.style.background = "";
    e.target.reset();
  }, 3000);
}
