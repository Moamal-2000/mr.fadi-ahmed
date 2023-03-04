'use strict'

// Selectors
const sections = document.querySelectorAll("section");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const navButtons = document.querySelectorAll("header nav ul li");
const slide1Bottom = document.querySelector('.effect-slide1.bottom')
const slide2Bottom = document.querySelector('.effect-slide2.bottom')
const slide1Top = document.querySelector('.effect-slide1.top')
const slide2Top = document.querySelector('.effect-slide2.top')






// Variables
let index = 0;
let isAnimating = false;
let isNavAnimating = false;
const animationDuration = 1600;


toggleText(0, "show");








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

function handleNextBtn() {
    if (isAnimating || index > 2) return;
    isAnimating = true;

    toggleText(index, "hide");

    index++;
    sections.forEach((section, i) => {
        if (i === index) {
            navButtons.forEach(button => {
                button.classList.remove('active')
            })
            navButtons[i].classList.add('active')

            toggleText(i, "show");

            slide1Top.classList.add('active')
            slide2Top.classList.add('active')
            setTimeout(() => {
                slide1Top.classList.remove('active')
                slide2Top.classList.remove('active')
                isAnimating = false;
            }, 2000);

            setTimeout(() => {
                section.scrollIntoView({ behavior: "auto" });
            }, 800);
        }
    });
}

function handlePrevBtn() {
    if (isAnimating || index < 1) return;
    isAnimating = true;

    toggleText(index, "hide");

    index--;
    sections.forEach((section, i) => {
        if (i === index) {
            toggleText(i, "show");

            slide1Bottom.classList.add('active')
            slide2Bottom.classList.add('active')
            setTimeout(() => {
                slide1Bottom.classList.remove('active')
                slide2Bottom.classList.remove('active')
                isAnimating = false;
            }, 2000);

            setTimeout(() => {
                section.scrollIntoView({ behavior: "auto" });
            }, 800);
        }
    });
}


function handleWheel(e) {
    const currentTime = new Date().getTime();

    if (isAnimating || currentTime - lastTime < animationDuration) {
        e.preventDefault();
        return;
    }

    isAnimating = true;

    setTimeout(() => e.deltaY > 0 ? nextBtn.click() : prevBtn.click(), 1000);

    sections.forEach((section, i) => {
        if (i === index) {
            toggleText(i, "show");

            section.scrollIntoView({ behavior: "auto" });
        }
    })

    setTimeout(() => {
        isAnimating = false;
    }, 2000); // Wait for slide animation duration since it's longer than wheel duration

    lastTime = currentTime;
}








// Events
nextBtn.addEventListener("click", () => handleNextBtn());
prevBtn.addEventListener("click", () => handlePrevBtn());
window.addEventListener("wheel", (e) => handleWheel(e), { passive: false });




function handleSlideAnimation(direction, newIndex) {
  const slide1 = direction === 'top' ? slide1Top : slide1Bottom;
  const slide2 = direction === 'top' ? slide2Top : slide2Bottom;

  toggleText(index, "hide");

  index = newIndex;

  sections.forEach((section, i) => {
    if (i === index) {
      navButtons.forEach(button => {
        button.classList.remove('active')
      })
      navButtons[i].classList.add('active')

      toggleText(i, "show");

      slide1.classList.add('active')
      slide2.classList.add('active')
      setTimeout(() => {
        slide1.classList.remove('active')
        slide2.classList.remove('active')
        isAnimating = false;
      }, 2000);

      setTimeout(() => {
        section.scrollIntoView({ behavior: "auto" });
      }, 800);
    }
  });
}

function handleNavButtonClick(indexBtn) {
  // If an animation is currently in progress, don't allow another checkbox change
  if (isAnimating || isNavAnimating) return;

  isNavAnimating = true;

  // Find the index of the currently active section
  const activeIndex = Array.from(navButtons).findIndex((navButton) =>
    navButton.classList.contains("active")
  );

  // If the clicked nav button is already active, don't do anything else
  if (indexBtn === activeIndex) {
    isNavAnimating = false;
    return;
  }

  handleSlideAnimation(indexBtn > activeIndex ? 'top' : 'bottom', indexBtn);

  // This will tell the `handleWheel()` function that the animation is
  // taking place outside of the scroll wheel event and should not be interrupted.
  isAnimating = true;
  setTimeout(() => {
    isNavAnimating = false;
    isAnimating = false
  }, 2000);
}




navButtons.forEach((button, indexBtn) => {

  button.addEventListener("click", () => {
      handleNavButtonClick(indexBtn)
  });

});
