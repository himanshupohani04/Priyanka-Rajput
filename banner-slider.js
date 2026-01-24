const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".banner-slide");
const nextBtn = document.querySelector(".banner-nav.next");
const prevBtn = document.querySelector(".banner-nav.prev");

let index = 1; // Start from 1 because we'll clone first & last
let slideWidth = slides[0].clientWidth;
let isSliding = false;

// ------------------- Clone slides for infinite loop -------------------
const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

firstClone.id = "first-clone";
lastClone.id = "last-clone";

track.appendChild(firstClone);
track.prepend(lastClone);

// Update slides NodeList after cloning
const allSlides = document.querySelectorAll(".banner-slide");

// Set initial position
track.style.transform = `translateX(-${slideWidth * index}px)`;

// ------------------- Function to move slide -------------------
function updateSlide() {
  if (isSliding) return;
  isSliding = true;
  track.style.transition = "transform 0.5s ease-in-out";
  track.style.transform = `translateX(-${slideWidth * index}px)`;
  
  track.addEventListener("transitionend", () => {
    // Infinite loop adjustment
    if (allSlides[index].id === "first-clone") {
      track.style.transition = "none";
      index = 1;
      track.style.transform = `translateX(-${slideWidth * index}px)`;
    }
    if (allSlides[index].id === "last-clone") {
      track.style.transition = "none";
      index = allSlides.length - 2;
      track.style.transform = `translateX(-${slideWidth * index}px)`;
    }
    isSliding = false;
  }, { once: true });
}

// ------------------- Button clicks -------------------
nextBtn.addEventListener("click", () => {
  if (isSliding) return;
  index++;
  updateSlide();
});

prevBtn.addEventListener("click", () => {
  if (isSliding) return;
  index--;
  updateSlide();
});

// ------------------- Auto-slide -------------------
setInterval(() => {
  index++;
  updateSlide();
}, 5000);

// ------------------- Touch/swipe -------------------
let startX = 0;

track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    index++;
    updateSlide();
  } else if (endX - startX > 50) {
    index--;
    updateSlide();
  }
});

// ------------------- Resize -------------------
window.addEventListener("resize", () => {
  slideWidth = slides[0].clientWidth;
  track.style.transition = "none";
  track.style.transform = `translateX(-${slideWidth * index}px)`;
});
