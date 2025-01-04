const page = document.querySelector('.page');
const glaz = document.querySelector('.eye-container-2');
let counter  = 0;
let scaleGlaz = 1;

page.addEventListener('click', function() {
  page.classList.toggle('invert');
  counter++;
  scaleGlaz -= 0.1;
  console.log(scaleGlaz);
  glaz.style.scale = scaleGlaz;

})
