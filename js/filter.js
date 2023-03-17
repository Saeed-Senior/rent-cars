//const choiceEl = document.querySelectorAll('.filter__select')

const choices1 = new Choices('.js-choice1', {
   searchEnabled: false,
   itemSelectText: '',
});
const choices2 = new Choices('.js-choice2', {
   searchEnabled: false,
   itemSelectText: '',
});
const choices3 = new Choices('.js-choice3', {
   searchEnabled: false,
   itemSelectText: '',
});
const choices4 = new Choices('.js-choice4', {
   searchEnabled: false,
   itemSelectText: '',
});

//========================================================================FILTER

const domElements = {
   result: document.querySelector('.catalog__cards'),
   filters: {
      color: document.getElementById('filter-color'),
      priceFilter: document.getElementById('filter-price'),
      stamps: document.getElementById('filter-stamps'),
      type: document.getElementById('filter-type'),
   }
}
const all = document.getElementById('filter-all');
all.addEventListener('click', (e) => {
   location.reload()
})
// Генерация карточек
function generait(data) {
   const cards = [];
   for (var i = 0; i < data.length; i++) { 
      cards.push(`
      <div class="catalog__card card">
                        <div class="card__image second-slider swiper-container">
                           <div class="swiper-wrapper">
                              <div class="swiper-slide">
                                 <img src="${data[i].image1}" alt="error">
                              </div>
                           </div>
                           <div class="card-pagination swiper-pagination"></div>
                        </div>
                        <div class="card__information">
                           <h3 class="card__name" translate='no'>${data[i].name} <span class="card__new">${data[i].new}</span></h3>
                           <div class="card__buttons">
                           <button class="card__first-button" data-lang='booking'>Бронировать</button>
                           <a href="_more.html?${data[i].image1}&${data[i].name}&${data[i].price.day}" class="card__second-button" data-lang='more'>Подробнее</a>
                           </div>
                        </div>
                     </div>
      `)
   }

   return cards;
}
const cardsArr = generait(cars);
domElements.result.innerHTML = cardsArr.join('');

const newCars = document.getElementById('filter-new');
newCars.addEventListener('click', (e) => {
   function generait(data) {
      const cards = [];
      for (var i = 0; i < data.length; i++) { 
         if (data[i].new === '') continue;
         cards.push(`
         <div class="catalog__card card">
                           <div class="card__image second-slider swiper-container">
                              <div class="swiper-wrapper">
                                 <div class="swiper-slide">
                                    <img src="${data[i].image1}" alt="">
                                 </div>
                              </div>
                              <div class="card-pagination swiper-pagination"></div>
                           </div>
                           <div class="card__information">
                              <h3 class="card__name" translate='no'>${data[i].name} <span class="card__new">${data[i].new}</span></h3>
                              <div class="card__buttons">
                              <button class="card__first-button" data-lang='booking'>Бронировать</button>
                              <a href="_more.html?${data[i].image1}&${data[i].name}&${data[i].price.day}" class="card__second-button" data-lang='more'>Подробнее</a>
                              </div>
                           </div>
                        </div>
         `)
      }
   
      return cards;
   }
   const cardsArr = generait(cars);
   domElements.result.innerHTML = cardsArr.join('');
})

//---Filter
{
   const filtersType = [
      'color',
      'priceFilter',
      'stamps',
      'type',
   ]

   // Функция фильтрации товаров по списку параметров 
function filterSelect(filterType) {
   domElements.filters[filterType].onchange = (e) => {
      const value = e.target.value;
   
      const filtered = cars.filter(car => {
         const reg = new RegExp(value);
         if (reg.test(car[filterType])) {
            return true;
         } else {
            return false;
         }
      })
      const fullFiltered = checkOtherFilters(filtersType, filtered)
      const filteredCards = generait(fullFiltered);
      domElements.result.innerHTML = filteredCards.join('');
      const secondSlider = new Swiper('.second-slider', {

         pagination: {
            el: '.swiper-pagination',
            clickable: true,
         },
      
      })
      const request = document.querySelector('.request');
      const buttonBook = document.querySelectorAll('.card__first-button');
      buttonBook.forEach((item) => {
         return (item.addEventListener('click', () => {
         request.classList.add('request__active');
         }))
      })

      const allLangs = ['ru', 'en',];
let currentLang = localStorage.getItem('language') || navigator.language || 'ru';
const lang = document.querySelectorAll("[data-btn]");
const currentPathName = window.location.pathname;
let currentTextObject = {};
function check() {
   switch (currentPathName) {
      case '/index.html':
         currentTextObject = multi;
      break;
      case '/_catalog.html':
         currentTextObject = multi;
      break;
      case '/_more.html':
         currentTextObject = multi;
      break;
         default:
            currentTextObject = multi;
            break;
   }
}
check();
function changeLang() {
   for (const key in currentTextObject) {
      let elem = document.querySelectorAll(`[data-lang=${key}]`);
      elem.forEach((el) => {
         if(el){
            el.textContent = currentTextObject[key][currentLang]
         }
      })
   }
}
changeLang()
lang.forEach(btn => {
   btn.addEventListener('click', (e) => {
      currentLang = e.target.dataset.btn;
      localStorage.setItem('language', e.target.dataset.btn)
      resetActiveClass(lang, 'active')
      btn.classList.add('active')
      changeLang()
   })
});
function resetActiveClass(arr, active) {
   arr.forEach(elem => {
      elem.classList.remove(active)
   })
}
function checkActiveLangButton() {
   switch (currentLang) {
      case 'ru':
         document.querySelector("[data-btn='ru']")
         .classList.add('active');
         break;
         case 'en':
         document.querySelector("[data-btn='en']")
         .classList.add('active');
         break;
         default:
            document.querySelector("[data-btn='ru']")
         .classList.add('active');
            break;
   }
}
checkActiveLangButton()
   }
}
// Отслеживание изменений фильтров и фильтрации
filtersType.forEach(type => {
   filterSelect(type)
})

//Проверка по значениям соседних фильтров
function checkOtherFilters(filtersType, filtered) {
var updateFiltered = filtered;
filtersType.forEach(type => {
   const value = domElements.filters[type].value;
   const reg = new RegExp(value);
   const newFiltered = updateFiltered.filter(card => {
      if(reg.test(card[type])) {
         return true;
      } else {
         return false;
      }
   })
   updateFiltered = newFiltered
})
return updateFiltered;
}
}

//==================================================================================HITS

let hitsCards = document.querySelector('.hits__cards');

