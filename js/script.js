'use strict';

window.onload = function () {
   let preloader = document.getElementById('preloader');
   preloader.style.display = 'none';
}

const burger = document.querySelector('.menu__burger');
const menuBody = document.querySelector('.menu__list');
const connection = document.querySelector('.connection');
const request = document.querySelector('.request');
const buttonBook = document.querySelectorAll('.card__first-button');
const buttonMore = document.querySelectorAll('.card__second-button');
const requestInner = document.querySelector('.request__inner');
const wrap = document.querySelector('.wrap');
const wrapText = document.querySelector('.wrap__text');
const contacts = document.querySelector('.link-contact');
const formMain = document.getElementById('formSection');

//=====================================================================MENU
burger.addEventListener('click', () => {
   burger.classList.toggle('active');
   menuBody.classList.toggle('active');
   connection.classList.toggle('active');
   document.body.classList.toggle('lock');
})

//=====================================================================SCROLL
// function handleButtonClick() {
//    formMain.scrollIntoView({block: "center", behavior: "smooth"});
//    burger.classList.remove('active');
//    menuBody.classList.remove('active');
//    document.body.classList.remove('lock');
// }
// contacts.addEventListener('click', handleButtonClick);

//=====================================================================GRATTITUDE
wrap.addEventListener('click', (e) => {
   const click = e.composedPath().includes(wrapText);
   if ( e.target === wrap ){
      wrap.classList.remove('active');
   }
})

//======================================================================BUTTON-FORM
buttonBook.forEach((item) => {
   return (item.addEventListener('click', () => {
   request.classList.add('request__active');
   }))
})
window.addEventListener('keyup', (event) => {
   if(event.code == 'Escape'){
      request.classList.remove('request__active');
   }
})
request.addEventListener('click', (e) => {
   const click = e.composedPath().includes(requestInner);
   if ( e.target === request ){
      request.classList.remove('request__active');
   }
})

//=======================================================================ACCARDEON
const accardeonBtn = document.querySelectorAll('.accardeon__btn').forEach(item => {
item.addEventListener('click', () => {
   item.nextElementSibling.classList.toggle('active');
   item.lastElementChild.classList.toggle('active');
})
})


//=================================Swiper====================================================

const firstSlider = new Swiper('.first-slider', {

   navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
   },

});

const secondSlider = new Swiper('.second-slider', {

   pagination: {
      el: '.swiper-pagination',
      clickable: true,
   },

})

const thirdSlider = new Swiper('.catalog-pages', {
   navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev',
      },
   pagination: {
      el: '.swiper-pagination-catalog',
      clickable: true,
      renderBullet: function (index, className) {
         return '<span class="' + className +  '" > ' + (index + 1) + ' </span>'
      }
   },
   simulateTouch: false,
   allowTouchMove: false,
})

const fourthSlider = new Swiper('.car-info__image', {

   navigation: {
      nextEl: '.swiper-button-next-car',
      prevEl: '.swiper-button-prev-car',
   },

pagination: {
   el: '.swiper-pagination-more',
   clickable: true,
},

})

//=================================language==================================================
const allLangs = ['ru', 'en',];
let currentLang = localStorage.getItem('language') || checkBrowserLang() || 'ru';

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

checkActiveLangButton();

function checkBrowserLang() {
   const navLang = navigator.language.slice(0,2).toLowerCase
   ()
   const result = allLangs.some(el => {
      return el === navLang;
   })
   if (result) {
      return navLang;
   }
};