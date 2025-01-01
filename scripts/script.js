let initialButton = document.querySelector(".eye-button");
const buttonTemplate = document.querySelector("#glaz").content;
const stage2 = document.querySelector('#stage2').content;
const page = document.querySelector(".page");
let cheredovaniye = true;

function addButtonFunctionality(button) {
  button.addEventListener("click", () => {
    const newButton = buttonTemplate.querySelector(".eye-button").cloneNode(true);
    addButtonFunctionality(newButton);
    let top = Math.random() * (window.innerHeight - 150);
    let left = Math.random() * (window.innerWidth - 300);
    newButton.style.top = `${top}px`;
    newButton.style.left = `${left}px`;

    page.append(newButton);
    page.classList.toggle("invert");


    if (cheredovaniye) {
      newButton.classList.add("white-eye");

      let blackEyes = document.querySelectorAll(".black-eye");
      let whiteEyes = document.querySelectorAll(".white-eye");

      for (let i = 0; i < whiteEyes.length; i++) {
        whiteEyes[i].classList.add("opened-eye");
        whiteEyes[i].classList.remove("closed-eye");
      }
      for (let i = 0; i < blackEyes.length; i++) {
        blackEyes[i].classList.remove("opened-eye");
        blackEyes[i].classList.add("closed-eye");
      }

      cheredovaniye = false;
    } else {
      newButton.classList.add("black-eye");

      let blackEyes = document.querySelectorAll(".black-eye");
      let whiteEyes = document.querySelectorAll(".white-eye");

      for (let i = 0; i < whiteEyes.length; i++) {
        whiteEyes[i].classList.remove("opened-eye");
        whiteEyes[i].classList.add("closed-eye");
      }
      for (let i = 0; i < blackEyes.length; i++) {
        blackEyes[i].classList.add("opened-eye");
        blackEyes[i].classList.remove("closed-eye");
      }

      cheredovaniye = true;
    }

    let allEyes = page.querySelectorAll(".eye-button");
    if (allEyes.length > 15 && !document.querySelector('.page.invert')) {
      for(let i = 0; i < allEyes.length; i++){
        allEyes[i].remove();
      }
      page.querySelector('.eye-container').remove();
      setTimeout(() => {
        let newGlaz = stage2.querySelector('.stage2-stuff').cloneNode(true);
        page.append(newGlaz);
        page.classList.add('stage2');
        page.addEventListener('click', function () {
          page.classList.toggle('invert');
        })
      }, 2000)

    }

  });
}

addButtonFunctionality(initialButton);

setTimeout(() => {
  page.classList.add("invert");
  initialButton.classList.add('opened-eye');
}, 5000);

function scaleElement() {
  const element = document.querySelector('.eye-container');
  const scale = window.innerWidth / 1920;
  element.style.transform = `scale(${scale})`;
}

window.addEventListener('resize', scaleElement);
window.addEventListener('load', scaleElement);

