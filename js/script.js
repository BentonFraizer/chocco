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
//_______________________________________________________________________________________________________________________________

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




// console.log(planks);

// planks.forEach(function(element){
//   element.addEventListener('click, toggleMenu');
// })

// function toggleMenu (){
//   overlay.classList.toggle('overlay');
//   hamburger.classList.toggle('hamburger--menu-active');
//   menu.classList.toggle('menu--active');
// }

// openMenu.addEventListener('click', toggleMenu);


// planks.forEach(function(element){
//   element.addEventListener('click' , toggleMenu);
// })



// classList.toggle('hamburger__plank--menu-active');

//___________________________Обработать все елементы бургера_________________________________
// openMenu.addEventListener('click', function (event) {
//   event.preventDefault();
//   for (let i = 0; i < planks.length; i ++) 
//   planks[i].classList.toggle('hamburger__plank--menu-active');
// })

// let elements = document.querySelectorAll('.some-class'); 





}); // закрываем функцию $(document).ready()