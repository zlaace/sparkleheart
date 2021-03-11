"use strict";

// Common JS
// toggle navbar
var navToggle = document.querySelector('.js-nav-toggle');
var navLinks = document.querySelectorAll('.nav-link');
navToggle.addEventListener('click', function () {
  document.body.classList.toggle('nav-open');
});
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    document.body.classList.remove('nav-open');
  });
}); // highlight current page

var footerNavLinks = document.querySelectorAll(".footer-nav-link");
var currentPageLocation = location.href;
var navLength = navLinks.length;

for (var i = 0; i < navLength; i++) {
  if (navLinks[i].href === currentPageLocation) {
    navLinks[i].classList.add("active-page");
  }

  if (footerNavLinks[i].href === currentPageLocation) {
    footerNavLinks[i].classList.add("active-page");
  }
} // select language


var langDropdown = document.querySelector('.js-lang-dropdown');
var langOptions = document.querySelector('.js-lang-options');
var langCurrent = document.querySelector('.js-lang-current');
var langLinks = document.querySelectorAll('.lang-link');
var langLength = langLinks.length;
var langValue;
var activeItem = null;
langDropdown.addEventListener('click', function () {
  langOptions.classList.toggle('show');
  langLinks.forEach(function (link) {
    link.textContent === langCurrent.textContent ? link.classList.add("active-page") : link.classList.remove("active-page");
  });
});
langOptions.addEventListener('click', function (e) {
  var langItem = e.target;
  langValue = langItem.dataset.lang;
  langCurrent.textContent = langValue;
}); // scroll to top button

var scrollBtn = document.querySelector('.js-scroll-btn');
var footer = document.querySelector('.site-footer');
var footerHeight = footer.getBoundingClientRect().height;

window.onscroll = function () {
  document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? scrollBtn.style.display = 'block' : scrollBtn.style.display = 'none';
  stopBeforeFooter();
};

scrollBtn.addEventListener('click', function () {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
});

function stopBeforeFooter() {
  function getTopDistance(el) {
    var btn = el.getBoundingClientRect();
    return btn.top;
  }

  if (getTopDistance(scrollBtn) + document.body.scrollTop + scrollBtn.offsetHeight >= getTopDistance(footer) + document.body.scrollTop - 10) {
    scrollBtn.style.position = 'absolute';
    scrollBtn.style.bottom = footerHeight + "px";
  }

  if (document.body.scrollTop + window.innerHeight < getTopDistance(footer) + document.body.scrollTop + 30) {
    scrollBtn.style.position = 'fixed';
    scrollBtn.style.bottom = "30px";
  }
} // company info mobile button


var companyInfoBtn = document.querySelector('.js-company-info-btn');
var companyListMobile = document.querySelector('.company-list-mobile');
companyInfoBtn.addEventListener('click', function () {
  companyListMobile.classList.toggle('visible');
}); // set date

var date = document.getElementById('js-date');
date.innerHTML = new Date().getFullYear();