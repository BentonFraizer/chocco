//__________Реализация горизонтального аккордеона секции 'menu'_____________________________________
$(document).ready(() => {

  const mesureWidth = (item) => {
    let reqItemWidth = 0;

    const screenWidth = $(window).width();
    const container = item.closest('.products-menu');
    const titlesBlocks = container.find('.products-menu__title');
    const titlesWidth = titlesBlocks.width() * titlesBlocks.length;

    const textContainer = item.find('.products-menu__container'); 
    const paddingLeft = parseInt(textContainer.css('padding-left'));
    const paddingRight = parseInt(textContainer.css('padding-right'));
    
    const isTablet = window.matchMedia('(min-width: 481px) and (max-width: 768px)').matches;
    const isMobile = window.matchMedia('(max-width: 481px)').matches;

    if (isTablet) { 
      reqItemWidth = screenWidth - titlesWidth;
    } else if (isMobile) {
      reqItemWidth = screenWidth - (titlesWidth - ((titlesBlocks.length - 1)*80));
    } else {
      reqItemWidth = 630;
    }

    return {
      container: reqItemWidth,
      textContainer: reqItemWidth - paddingRight - paddingLeft
    }
  }

  const closeEveryItemInContainer = container => { // container имеется ввиду список ul
    const items = container.find('.products-menu__item'); // определяем элементы списка, чтобы удалить с них класс 'active'
    const content = container.find('.products-menu__content');

    items.removeClass('active').fadeIn(700, "linear");

    content.width(0);
  }

  const openItem = item => { // функция "открытия" элемента item, переданного по клику
    const hiddenContent = item.find('.products-menu__content'); // ищем скрытый блок
    const reqWidth = mesureWidth(item); // сохраняем значение вычисленной в функции mesureWindth() ширины в переменную
    const textBlock = item.find('.products-menu__container');

    item.addClass('active');
    hiddenContent.width(reqWidth.container); // выставляем значение ширины непосредственно скрытому элементу
    textBlock.width(reqWidth.textContainer);
  }

  $('.products-menu__title').on('click', function (e) {
    e.preventDefault();

    const $this = $(e.currentTarget); // сохранили элемент на котором будем выполнять клик ЛКМ
    const item = $this.closest('.products-menu__item'); // ищем ближайший элемент списка, к которому относится элемент .products-menu__title (он же $this)
    const itemOpened = item.hasClass('active'); // проверяем "открыт" ли элемент по наличию класса active
    const container = $this.closest('.products-menu');

    if (itemOpened) {
      closeEveryItemInContainer(container); // закрываем все элементы списка
    } else {
      closeEveryItemInContainer(container);
      openItem(item); // передаём найденный элемент в функцию openItem
    }

    const isMobile = window.matchMedia('(max-width: 768px)').matches;

    if (isMobile && !itemOpened) {
      item.siblings().fadeOut(0, "linear"); 
    }
  });

  $('.products-menu__close').on('click', e => {
    e.preventDefault();

    closeEveryItemInContainer($('.products-menu').find('.products-menu__item').css('display', 'flex').removeClass('active'));
  })

});