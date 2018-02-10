// =========================================================
// Tabs
// =========================================================

export default function tabs() {
  // все элементы a сохраняем в переменной links
  let links = document.querySelectorAll('.tabs__controls a');
  // превращаем из коллекции в массив, чтобы были доступны его методы
  links = Array.prototype.slice.call(links);

  // проходим по массиву и выполняем функцию
  links.forEach(el => {
    // каждому элементу добавить обработчик клика
    el.addEventListener('click', e => {
      // сначала убираем действие по умолчанию
      e.preventDefault();
      // в tab сохраняем значение аттрибута href ссылки
      let tab = document.querySelector(el.getAttribute('href'));
      // удаляем класс active с ссылок
      document.querySelector('.tabs__controls .active').classList.remove('active');
      // удаляем класс active с контента
      document.querySelector('.tabs__list .active').classList.remove('active');
      // добавляем класс active ссылке
      el.classList.add('active');
      // добавляем класс active контенту
      tab.classList.add('active');
    });
  });
};

// запуск функции переключения табов
// tabs();