const query = decodeURIComponent(window.location.search.substring(1));
const vars = query.split('&');


let moreTitle = document.querySelector('.car-name'),
   moreName = document.querySelector('.car-info__title'),
   moreImg = document.querySelector('.more-img'),
   morePrice1 = document.querySelector('.price__summ1'),
   morePriceTtl = document.querySelector('.price-ttl');


moreTitle.textContent = `${vars[1]}`;
moreName.textContent = `${vars[1]}`;
moreImg.src = `${vars[0]}`;
morePriceTtl.textContent = `${vars[1]}`
morePrice1.textContent = `${vars[2]}`;
