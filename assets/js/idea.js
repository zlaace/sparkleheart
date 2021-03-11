"use strict";

// local reviews data
var reviews = [{
  id: 0,
  name: 'Ken Ludden',
  job: 'Director, Margot Fonteyn Academy of Ballet',
  review: 'For it is Juris work that is the light the human race needs so badly these days. His vision is inspired and talent is beyond measure.'
}, {
  id: 1,
  name: 'Voldemārs Brēdiķis',
  job: 'Managing partner at commercialization Reactor Fund, enterpreneur, angel investor',
  review: 'Juris has an inspiring drive and healthy ambition on top of human oriented person with amazing combination of creativity and abitlity to focus.'
}, {
  id: 2,
  name: 'Regīna Kaupuža',
  job: 'LNOB baleta pedagoģe, JVLMA horeogrāfijas katedras docente',
  review: 'Juris Gogulis ir ļoti radoša un uzņēmīga personība ar nezūdošo optimismu un gaišu prātu. Jaunu un galvenais drosmīgu ideju realizētājs!'
}, {
  id: 3,
  name: 'Raimonds Dzintars',
  job: 'LU deju ansambļa Pērle mākslinieciskais vadītājs',
  review: 'Juris ir personība ar pozitīvu skatu uz dzīvi, kurš ne tikai māk nospraust mērķus, bet arī tos sasniegt. Turklāt, viņam piemīt spēja iedrošināt un motivēt arī citus.'
}]; // select items

var author = document.querySelector('.js-author');
var job = document.querySelector('.js-job');
var review = document.querySelector('.js-review');
var prevBtn = document.querySelector('.js-prev-btn');
var nextBtn = document.querySelector('.js-next-btn');
var currentItem = 0; // load initial item

window.addEventListener('DOMContentLoaded', function () {
  showReview();
}); // show person

function showReview() {
  var item = reviews[currentItem];
  author.textContent = item.name;
  job.textContent = item.job;
  review.textContent = item.review;
}

; // show next person

nextBtn.addEventListener('click', function () {
  currentItem++;

  if (currentItem > reviews.length - 1) {
    currentItem = 0;
  }

  showReview();
}); // show prev person

prevBtn.addEventListener('click', function () {
  currentItem--;

  if (currentItem < 0) {
    currentItem = reviews.length - 1;
  }

  showReview();
});