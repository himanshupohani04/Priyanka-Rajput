const track = document.querySelector(".slider-track");
const slides = document.querySelectorAll(".banner-slide");
const nextBtn = document.querySelector(".banner-nav.next");
const prevBtn = document.querySelector(".banner-nav.prev");

let index = 0;
let slideWidth = slides[0].clientWidth;

function updateSlide() {
  track.style.transform = `translateX(-${index * slideWidth}px)`;
}

nextBtn.addEventListener("click", () => {
  index = (index + 1) % slides.length;
  updateSlide();
});

prevBtn.addEventListener("click", () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlide();
});

/* Auto Slide */
setInterval(() => {
  index = (index + 1) % slides.length;
  updateSlide();
}, 5000);

/* Mobile Swipe */
let startX = 0;

track.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", e => {
  let endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) {
    index = (index + 1) % slides.length;
  } else if (endX - startX > 50) {
    index = (index - 1 + slides.length) % slides.length;
  }
  updateSlide();
});

/* Resize Fix */
window.addEventListener("resize", () => {
  slideWidth = slides[0].clientWidth;
  updateSlide();
});
