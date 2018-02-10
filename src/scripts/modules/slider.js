// =========================================================
// Slider
// =========================================================

export default function slider() {
  // в переменной сохраняем все слайды
  const slides = document.querySelectorAll('#slides .slide');
  // в переменной сохраняем обращение к кнопке "вперед"
  const next = document.getElementById('next');
  // в переменной сохраняем обращение к кнопке "назад"
  const previous = document.getElementById('previous');
  // в переменной сохраняем обе кнопки
  const controls = document.querySelectorAll('.controls');

  // начальный слайд
  let currentSlide = 0;

  // функция осуществляет переход к слайду под номером n
  const goToSlide = (n, anim) => { // в параметрах передаем номер и класс анимации
    // при переходе слайду оставляем только класс slide
    slides[currentSlide].className = 'slide';
    // остаток от деления
    currentSlide = (n + slides.length) % slides.length;
    // текущему слайду добавляем класс showing и класс анимации
    slides[currentSlide].className = `slide showing ${anim}`;
  };

  // функция навешивает обработчики кликов
  const setupListeners = () => {
    // для кнопки "вперед"
    next.addEventListener('click', () => {
    // текущий слайд увеличиваем на единицу и добавляем класс для анимации "слева направо"
    goToSlide(currentSlide+1, 'anim-left');
    });
    // для кнопки "назад"
    prev.addEventListener('click', () => {
    // текущий слайд уменьшаем на единицу и добавляем класс для анимации "справа налево"
      goToSlide(currentSlide-1, 'anim-right');
    });
  };

  // функция инициализации слайдера
  const sliderInit = () => {
    // если на странице есть нужный html код
    if (slides.length) {
      // то запускаем функцию обработки кликов
      setupListeners();
    }
  };

  //  инициализация слайдера
  sliderInit();
  }

// запуск слайдера
// slider();