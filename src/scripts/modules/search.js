// =========================================================
// Search
// =========================================================

export default function search() {

  // функция поиска по имени
  const searchByName = () => {
    // добавляем обработчик по вводу символов с клавиатуры
    document.getElementById('search').addEventListener('keyup', () => {
      // в переменной сохраняем значение в инпуте
      let filter = document.getElementById('search').value.toLowerCase();
  
      // в переменной сохраняем все элементы с классом game
      let game = document.querySelectorAll('.game');
      // затем коллекцию превращаем в массив, чтобы были доступны его методы
      game = Array.prototype.slice.call(game);
  
      // в переменной сохраняем все элементы с классом search__content-block
      let block = document.querySelectorAll('.search__content-block');
      // затем коллекцию превращаем в массив, чтобы были доступны его методы
      block = Array.prototype.slice.call(block);

      // в переменной храним элемент empty, служащий для показа не найденных игр
      let emptyDiv = document.getElementById('empty');
      
      // в переменной храним пустой массив для дальнейшего использования в проверке
      let emptyArr = [];
  
      // функция поиска игр в текстовом поле
      const searchGames = () => {
        // берем массив блоков игр и пробегаемся по нему
        game.forEach((el, i) => {
          // если ни одим символ не соответствует введенным
          if (el.innerHTML.toLowerCase().indexOf(filter) === -1) {
            // то блок контента скрываем
            block[i].style.display = 'none';
            // и добавляем false в конец массива
            emptyArr.push(false);
            // а если какой-либо символ совпал, то
          } else {
            // блок оставляем как есть
            block[i].style.display = '';
            // и добавляем true в конец массива 
            emptyArr.push(true);
          }
        });
  
        // проверяем, если вообще игры не найдены
        // для этого смотрим, есть ли в массиве значение true
        let result = emptyArr.includes(true);     
        // если есть, значит игра найдена, если нет - значит игр не найдено и отображаем empty  
        result ? emptyDiv.style.display = '' : emptyDiv.style.display = 'flex';
        
      };     
      
      // запускаем функцию поиска игр
      searchGames();
  
    });
  };
  
  // запускаем функцию поиска игр по имени
  searchByName();
  
  
  // функция поиска по жанру  
  const searchByGenre = () => {
    // добавляем обработчик при кликах на элементах select
    // в стрелочных функциях нет this, используем обычную 
    select.addEventListener('change', function() {
      // в переменной сохраняем сам элемент select
      let select = document.getElementById('select');
  
      // в переменной сохраняем все элементы с классом search__content-block
      let block = document.querySelectorAll('.search__content-block');
      // затем коллекцию превращаем в массив, чтобы были доступны его методы
      block = Array.prototype.slice.call(block);
  
      // в переменной храним значение value тега option
      let val = this.value;
      // в переменной храним элемент empty, служащий для показа не найденных игр
      let emptyDiv = document.getElementById('empty');
  
      // в переменной храним пустой массив для дальнейшего использования в проверке
      let emptyArr = [];
  
      // функция поиска игр в выпадающем меню
      const searchGames = () => {
        // пробегаемся по массиву
        block.forEach(el => {
          // если класс элемента совпадает со значение value тега option
          if (el.classList.contains(val)) {
            // то оставляем как есть
            el.style.display = '';
            // добавляем true в конец массива
            emptyArr.push(true);
            // если жанр игры не соответствует
          } else {
            // то блок скрываем
            el.style.display = 'none';
            // добавляем false в конец массива
            emptyArr.push(false);
          }

          // проверяем, если вообще игры не найдены
          // для этого смотрим, есть ли в массиве значение true
          let result = emptyArr.includes(true);     
          // если есть, значит игра найдена, если нет - значит игр не найдено и отображаем empty  
          result ? emptyDiv.style.display = '' : emptyDiv.style.display = 'flex';

          // если кликаем по "выберите жанр"
          if (val === 'choose') {
            // блок оставляем как есть
            el.style.display = '';
            // скрываем элемент empty
            emptyDiv.style.display = 'none';
          }
        });
      };
  
      // запускаем функцию поиска игр
      searchGames();  
    });
  };
  
  // запускаем функцию поиска игр по жанру
  searchByGenre();

};

// запускаем функцию поиска
// search();