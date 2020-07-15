$(document).ready(() => {
//______________________________Модальное окно меню во весь экран______________________________________________________________
const openMenu = document.querySelector('#hamburger');
const hamburger = document.querySelector('.hamburger');
const overlay = document.querySelector('#overlay');
const menu = document.querySelector('#menu');
const logo = document.querySelector('.logo');
const body = document.body;

const planks = document.querySelectorAll('.hamburger__plank');



openMenu.addEventListener('click', function (event) {
  event.preventDefault();
  overlay.classList.toggle('overlay');
  hamburger.classList.toggle('hamburger--menu-active');
  menu.classList.toggle('menu--active');
  logo.classList.toggle('logo--disabled');
  body.classList.toggle('body--scroll--off');

  for (let i = 0; i < planks.length; i ++) 
  planks[i].classList.toggle('hamburger__plank--menu-active');
})

//__________________Рабочий вариант. Не циклическая прокутка слайдов. Но зато работает transition______________________________

// const arrowRight = document.querySelector('.sliders__arrow-right');
// const arrowLeft = document.querySelector('.sliders__arrow-left');
// const itemsList = document.querySelector('.slider__list');
// const computed = window.getComputedStyle(itemsList);

// arrowRight.addEventListener("click", function(e) {
//   e.preventDefault();
//   let currentRight = parseInt(computed.right);

//   if (currentRight < 890) {
//     itemsList.style.right = currentRight + 891 + "px";
//   }
// });

// arrowLeft.addEventListener("click", function(e) {
//   e.preventDefault();
//   let currentRight = parseInt(computed.right);

//   if (currentRight > 0) {
//     itemsList.style.right = currentRight - 891 + "px";
//   }
// });
//___________Реализация работы слайдера секции sliders_________________________________________________________________________________________________

const arrowRight = document.querySelector('.sliders__arrow-right');
const arrowLeft = document.querySelector('.sliders__arrow-left');
const itemsList = document.querySelector('.slider__list')

arrowRight.addEventListener('click', function(event){
  event.preventDefault();
  itemsList.appendChild(itemsList.firstElementChild);
})

arrowLeft.addEventListener('click', function(event){
  event.preventDefault();
  itemsList.insertBefore(itemsList.lastElementChild, itemsList.firstElementChild);
})

//_____________________________________________________________________________________________
// аналогичный предыдущему вариант работы слайдера

// const arrowRight = document.querySelector('.sliders__arrow-right');
// const arrowLeft = document.querySelector('.sliders__arrow-left');
// const itemsList = document.querySelector('.slider__list')

// const loop = (direction, e) => {
//   e.preventDefault();

//   if (direction === "right") {
//     itemsList.appendChild(itemsList.firstElementChild);
//   } else {
//     itemsList.insertBefore(itemsList.lastElementChild, itemsList.firstElementChild);
//   }
// };

// arrowRight.addEventListener("click", (e) => {
//   loop("right", e);
// });

// arrowLeft.addEventListener("click", (e) => {
//   loop("left", e);
// });
//_____________________________________________________________________________________________


//__________Реализация вертикального аккордеона (меню-гармошки) секции team______________

  const openItem = item => {
  const container = item.closest(".team__item");
  const contentBlock = container.find(".team__content");
  const textBlock = contentBlock.find(".team__content-block");
  const reqHeight = textBlock.height();

  container.addClass("active");
  contentBlock.height(reqHeight);
}

  const closeEveryItem = container => {
  const items = container.find('.team__content');
  const itemContainer = container.find(".team__item");

  itemContainer.removeClass("active");
  items.height(0);
}

$('.team__title').click(e => {
  const $this = $(e.currentTarget);
  const container = $this.closest('.team');
  const elemContainer = $this.closest(".team__item");

  if (elemContainer.hasClass("active")) {
    closeEveryItem(container);
  } else {
    closeEveryItem(container);
    openItem($this);
  }
});
//_____________________________________________________________________________________________


//__________Реализация слайдшоу секции reviws__________________________________________________

$('.interactive-avatar').on('click', function(e) {
  e.preventDefault();
  const thisAvatar = $(e.currentTarget)
  const activeAvatar = thisAvatar.addClass('active').siblings().removeClass('active');
  const ava1 = $('.interactive-avatar:nth-child(1)');
  const ava2 = $('.interactive-avatar:nth-child(2)');
  const ava3 = $('.interactive-avatar:nth-child(3)');

  const ava1HasActive = ava1.hasClass('active');
  const ava2HasActive = ava2.hasClass('active');
  const ava3HasActive = ava3.hasClass('active');
  
  if (ava1HasActive == true) {
    const slide1 = $('.reviews__content-item:nth-child(1)');
    const showSlide1 = slide1.addClass('active').siblings().removeClass('active');
  } else if (ava2HasActive == true) {
    const slide2 = $('.reviews__content-item:nth-child(2)');
    const showSlide2 = slide2.addClass('active').siblings().removeClass('active');
  } else if (ava3HasActive == true) {
    const slide3 = $('.reviews__content-item:nth-child(3)');
    const showSlide3 = slide3.addClass('active').siblings().removeClass('active');
  }
});




















































}); // закрываем функцию $(document).ready()