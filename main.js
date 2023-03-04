// Selectors
const sections = document.querySelectorAll("section");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const navButtons = document.querySelectorAll("header nav ul li");
const slide1Bottom = document.querySelector('.effect-slide1.bottom ')
const slide2Bottom = document.querySelector('.effect-slide2.bottom ')







// Variables
let index = 0;
let lastTime = 0;
const animationDuration = 1600;






// Functions
function toggleText(index, state) {
  if (state === "show") {
    sections.forEach((section, i) => {
      if (i === index) {
        section.querySelector(".text").classList.add("show");
      }
    });
  } else {
    sections.forEach((section, i) => {
      if (i === index) {
        section.querySelector(".text").classList.remove("show");
      }
    });
  }
}
toggleText(0, "show");



function handleNextBtn() {
  if (index > 2) return;
  toggleText(index, "hide");

  index++;
  sections.forEach((section, i) => {
    if (i === index) {
      toggleText(i, "show");

      slide1Bottom.classList.remove('active')
      slide2Bottom.classList.remove('active')

      section.scrollIntoView({ behavior: "smooth" });
    }
  });
}



function handlePrevBtn() {
  if (index < 1) return;
  toggleText(index, "hide");

  index--;
  sections.forEach((section, i) => {
    if (i === index) {
      toggleText(i, "show");

      slide1Bottom.classList.add('active')
      slide2Bottom.classList.add('active')

      setTimeout(() => {
        section.scrollIntoView({ behavior: "smooth" });
      }, 1000);
    }
  });
}



function handleWheel(e) {
  const currentTime = new Date().getTime();

  if (currentTime - lastTime < animationDuration) {
    e.preventDefault();
    return;
  }

  setTimeout(() => e.deltaY > 0 ? nextBtn.click() : prevBtn.click(), 1000);

  sections.forEach((section, i) => {
    if (i === index) {
      toggleText(i, "show");
      section.scrollIntoView({ behavior: "smooth" });
    }
  })

  lastTime = currentTime;
}







// Events
nextBtn.addEventListener("click", () => handleNextBtn());
prevBtn.addEventListener("click", () => handlePrevBtn());



window.addEventListener("wheel", (e) => handleWheel(e), { passive: false });

navButtons.forEach((button, indexBtn) => {
  button.addEventListener("click", () => {
    toggleText(index, "hide");

    index++;
    sections.forEach((section, i) => {
      if (indexBtn === i) {
        toggleText(indexBtn, "show");
        section.scrollIntoView({ behavior: "smooth" });
      }
    });

    index = indexBtn;
  });
});










// Slide effect logic

