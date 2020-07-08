const openMenu = document.querySelector('#hamburger');
const hamburger = document.querySelector('.hamburger');
const overlay = document.querySelector('#overlay');
const menu = document.querySelector('#menu');
const logo = document.querySelector('.logo');

const planks = document.querySelectorAll('.hamburger__plank');



openMenu.addEventListener('click', function (event) {
  event.preventDefault();
  overlay.classList.toggle('overlay');
  hamburger.classList.toggle('hamburger--menu-active');
  menu.classList.toggle('menu--active');
  logo.classList.toggle('logo--disabled');

  for (let i = 0; i < planks.length; i ++) 
  planks[i].classList.toggle('hamburger__plank--menu-active');
})


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
