const sections = $('section');
const display = $('.maincontent');
const sideMenu = $('.fixed-menu__item');
const sideAllMenu = $('.fixed-menu');
const menuItems = sideAllMenu.find('.fixed-menu__item');

const mobileDetect = new MobileDetect(window.navigator.userAgent);
const isMobile = mobileDetect.mobile();

let inScroll = false;

sections.first().addClass('active'); // добавляем класс active для первой секции при загрузке страницы (далее этот класс добавляем к активной секции, т.е. к той, которая отображается в данный момент) 

// функция расчета позиции для секции
const countSectionPosition = (sectionEq) => {
  const position = sectionEq * -100;

  if (isNaN(position)){
    console.error('передано не верное значение в countSectionPosition');
    return 0;
  }

  return position;
};

// функционал по смене темы бокового меню
const changeMenuThemeForSection = (sectionEq) => {
  const currentSection = sections.eq(sectionEq);
  const menuTheme = currentSection.attr('data-sidemenu-theme');
  const activeClass = 'fixed-menu--color-black';

  if (menuTheme === 'black') {
    sideMenu.addClass(activeClass);
  } else {
    sideMenu.removeClass(activeClass);
  }
};

// функция для смены активного класса
const resetActiveClassForItem = (items, itemEq, activeClass) => {
  items.eq(itemEq).addClass(activeClass).siblings().removeClass(activeClass);
};

// функция отвечает за совершение анимации перехода между секциями // как работает эта функция???
const performTransition = (sectionEq) => { 
  if (inScroll) return;

  const transitionOver = 1000;
  const mouseInertiaOver = 300;

  inScroll = true;

  const position = countSectionPosition(sectionEq);

  changeMenuThemeForSection(sectionEq);

  display.css({
    transform: `translateY(${position}%)`,
  });
  
  resetActiveClassForItem(sections, sectionEq, 'active');    

  setTimeout(() => {
    inScroll = false;
    resetActiveClassForItem(menuItems, sectionEq, 'fixed-menu__item--active');
    
  }, transitionOver + mouseInertiaOver);
};

// функция вычисления направления скролла
const viewportScroller = () => { 
  const activeSection = sections.filter('.active'); // поиск активной секции, т.е. той, которая сейчас видна
  const nextSection = activeSection.next(); // определение следующей секции по DOM-дереву
  const prevSection = activeSection.prev(); // определение предыдущей секции по DOM-дереву

  return {
    next() {
      if (nextSection.length) {
        performTransition(nextSection.index());
      }
    },
    prev() {
      if (prevSection.length) {
        performTransition(prevSection.index());
      }
    }
  }

};

$(window).on('wheel', e => {          // обработчик события кручения колёсика мыши
  const deltaY = e.originalEvent.deltaY; // сохраним в переменную отслеживание направления скролла
  const scroller = viewportScroller();

  if (deltaY > 0) {     // если скролл положительный, то переходим к следующей секции (скролл вниз)
    scroller.next();
  }

  if (deltaY < 0) {     // если скролл отрицательный, то переходим к предыдущей секции (скролл ввверх)
    scroller.prev();
  }

});

$(window).on('keydown', e => {        // обработчик события нажатия клавиш pageUp и pageDown
  const tagName = e.target.tagName.toLowerCase();
  const userTypingInInputs = tagName == 'input' || tagName == 'textarea';
  const scroller = viewportScroller();

  if (userTypingInInputs) return;

  switch(e.keyCode) {
    case 38: //pageUp
      scroller.prev();
      break;

    case 40: //pageDown
      scroller.next();
      break;
  }

});

$('.wrapper').on('touchmove', e => e.preventDefault());

$('[data-scroll-to]').on('click', e => {
  e.preventDefault();

  const $this = $(e.currentTarget);
  const target = $this.attr('data-scroll-to');
  const reqSection = $(`[data-section-id=${target}]`);

  performTransition(reqSection.index());
})

// реализация функционирования на мобильных устройствах

  // https://github.com/mattbryson/TouchSwipe-Jquery-Plugin
if (isMobile) {

  $("body").swipe( {
    swipe:function (event, direction) {
      const scroller = viewportScroller();
      let scrollDirection = "";

      if (direction === "up") scrollDirection = "next";
      if (direction === "down") scrollDirection = "prev";
      // if (direction === "left") scrollDirection = "prev";
      // if (direction === "right") scrollDirection = "next";

      scroller[scrollDirection]();
    },
  });
}


///////////////// ____________________backUp до рефакторинга_______________________________________________________________

// const sections = $('section');
// const display = $('.maincontent');

// let inScroll = false;

// sections.first().addClass('active'); // добавляем класс active для первой секции при загрузке страницы (далее этот класс добавляем к активной секции, т.е. к той, которая отображается в данный момент) 

// const performTransition = (sectionEq) => { // функция отвечает за совершение анимации перехода между секциями // как работает эта функция???
//   if (inScroll  === false) {
//     inScroll = true;
//     const position = sectionEq * -100;

//     const currentSection = sections.eq(sectionEq);
//     const menuTheme = currentSection.attr('data-sidemenu-theme');
//     const sideMenu = $('.fixed-menu__item');
//     const sideAllMenu = $('.fixed-menu');

//     if (menuTheme === 'black') {
//       sideMenu.addClass('fixed-menu--color-black');
//     } else {
//       sideMenu.removeClass('fixed-menu--color-black');
//     }

//     display.css({
//       transform: `translateY(${position}%)`,
//     });
  
//     sections.eq(sectionEq).addClass('active').siblings().removeClass('active');

    

//     setTimeout(() => {
//       inScroll = false;

//       sideAllMenu
//         .find('.fixed-menu__item')
//         .eq(sectionEq)
//         .addClass('fixed-menu__item--active')
//         .siblings()
//         .removeClass('fixed-menu__item--active');
//     }, 1300);
//   };
// };

// const scrollViewport = (direction) => { // вычисление направления скролла
//   const activeSection = sections.filter('.active'); // поиск активной секции, т.е. той, которая сейчас видна
//   const nextSection = activeSection.next(); // определение следующей секции по DOM-дереву
//   const prevSection = activeSection.prev(); // определение предыдущей секции по DOM-дереву
  
//   if (direction === 'next' && nextSection.length) {
//     performTransition(nextSection.index());
//   }

//   if (direction === 'prev' && prevSection.length) {
//     performTransition(prevSection.index());
//   }


// };

// $(window).on('wheel', e => {          // обработчик события кручения колёсика мыши
//   const deltaY = e.originalEvent.deltaY; // сохраним в переменную отслеживание направления скролла

//   if (deltaY > 0) {     // если скролл положительный, то переходим к следующей секции (скролл вниз)
//     // performTransition(3); // передаём в функцию performTransition() номер необходимой секции 
//     //next
//     scrollViewport('next');
//   }

//   if (deltaY < 0) {     // если скролл отрицательный, то переходим к предыдущей секции (скролл ввверх)
//     //prev
//     scrollViewport('prev');
//   }

// });

// $(window).on('keydown', e => {
//   const tagName = e.target.tagName.toLowerCase();

//   if (tagName != 'input' && tagName != 'textarea') {
//     switch(e.keyCode) {
//       case 38: //prev
//         scrollViewport('prev');
//         break;
  
//       case 40: //next
//         scrollViewport('next');
//         break;
//     }
//   }

// });

// $('[data-scroll-to]').on('click', e => {
//   e.preventDefault();

//   const $this = $(e.currentTarget);
//   const target = $this.attr('data-scroll-to');
//   const reqSection = $(`[data-section-id=${target}]`);

//   performTransition(reqSection.index());
// })