let initialButton = document.querySelector(".eye-button");
const buttonTemplate = document.querySelector("#glaz").content;
const stage2 = document.querySelector('#stage2').content;
const page = document.querySelector(".page");
const noviyGlaz = document.querySelector('.noviy-glaz');
let cheredovaniye = true;
let counter  = 0;
let scaleGlaz = 1;

//Функция наделения кнопок функциональностью
function addButtonFunctionality(button) {
  button.addEventListener("click", () => {
    const newButton = buttonTemplate.querySelector(".eye-button").cloneNode(true);

    //Добавление функциональности к новой кнопке
    addButtonFunctionality(newButton);

    //Рандомные координаты для новой кнопки
    let top = Math.random() * (window.innerHeight - 150);
    let left = Math.random() * (window.innerWidth - 300);
    newButton.style.top = `${top}px`;
    newButton.style.left = `${left}px`;

    //Добавление новой кнопки на страницу
    page.append(newButton);

    //Переключение цвета страницы
    page.classList.toggle("invert");

    //Переключение между черными и белыми глазами
    const eyeColor = cheredovaniye ? "white-eye" : "black-eye";
    const oppositeColor = cheredovaniye ? "black-eye" : "white-eye";

    newButton.classList.add(eyeColor);

    const activeEyes = document.querySelectorAll(`.${eyeColor}`);
    const inactiveEyes = document.querySelectorAll(`.${oppositeColor}`);

    //Открытие активных глаз
    activeEyes.forEach(eye => {
      eye.classList.add("opened-eye");
      eye.classList.remove("closed-eye");
    });

    //Закрытие неактивных глаз
    inactiveEyes.forEach(eye => {
      eye.classList.remove("opened-eye");
      eye.classList.add("closed-eye");
    });

    cheredovaniye = !cheredovaniye;

    //Проверка на количество глаз и переход на следующий этап
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
        const glaz = document.querySelector('.eye-container-2');
        glaz.addEventListener('click', glazClicking);
      }, 2000)
    }
  });
}

const glazClicking = () => {
  const glaz = document.querySelector('.eye-container-2');
  const spikes = document.querySelectorAll('.spike');
  //изменение цвета глаза
  page.classList.toggle('invert');
  counter++;
  glaz.style.setProperty('--shake-x', 1 + counter ** 2 / 2);
  glaz.style.setProperty('--shake-y', 1 + counter ** 2 / 2);

  //изменение размера глаза
  if (counter < 7) {
    scaleGlaz *= 0.9;
    glaz.style.scale = scaleGlaz;
  }

  //добавление анимации шипов
  spikes.forEach(function(item) {
    item.classList.add('animated');
  })

  //удаление анимации шипов
  setTimeout(() => {
    spikes.forEach(function(item) {
      item.classList.remove('animated');
    })
  }, 1000);

  if (counter >= 7) {
    //удаление анимации тряски глаза
    glaz.style.setProperty('--shake-x', 0);
    glaz.style.setProperty('--shake-y', 0);

    //смена стадии страницы на черную дыру
    page.classList.add('black-hole');
    glaz.querySelector('.zrachok').remove();
    glaz.querySelector('#inner-shadow').remove();

    const spikesRows = document.querySelectorAll('.spikes-row');
    spikesRows.forEach(item => {
      item.style.animationPlayState = 'paused';
    })

    //добавление тряски шипов
    const actualSpikes = document.querySelectorAll('.actual-spike');
    actualSpikes.forEach(item => {
      const stagger = Math.random() * 2 + 1;
      const duration = Math.random() * 0.2 + 0.1 + 's';
      item.style.setProperty('--spike-stagger-ugol', stagger);
      item.style.setProperty('--spike-stagger-duration', duration);
    })

    glaz.addEventListener('click', () => spikesGravitation(spikes, actualSpikes));
  }
};

const spikesGravitation = (spikesConatiners, spikes) => {
  const glaz = document.querySelector('.eye-container-2');
  spikes.forEach(item => {
    item.classList.remove('animated');

    const stagger = (Math.random() * 360 + 100) * (Math.random() > 0.5 ? 1 : -1);
    const duration = Math.random() * 20 + 10 + 's';
    item.style.setProperty('--spike-stagger-ugol', stagger);
    item.style.setProperty('--spike-stagger-duration', duration);

    item.classList.add('animated');
  })

  spikesConatiners.forEach(item => {
    item.classList.add('gravitated-spike');
  })

  glaz.removeEventListener('click', glazClicking);
  glaz.removeEventListener('click', spikesGravitation);
};

//Наделение функциональности первой кнопке
addButtonFunctionality(initialButton);

//Переключение цвета глаз через 5 секунд
setTimeout(() => {
  page.classList.add("invert");
  initialButton.classList.add('opened-eye');
}, 5000);
