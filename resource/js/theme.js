// Common JS
// toggle navbar
const navToggle = document.querySelector('.js-nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');

navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    document.body.classList.remove('nav-open');
  });
})

// highlight current page
const footerNavLinks = document.querySelectorAll(".footer-nav-link");
const currentPageLocation = location.href;
const navLength = navLinks.length;

for (let i = 0; i < navLength; i++) {
  if (navLinks[i].href === currentPageLocation) {
    navLinks[i].classList.add("active-page");
  }

  if (footerNavLinks[i].href === currentPageLocation) {
    footerNavLinks[i].classList.add("active-page");
  }
}

// select language
const langDropdown = document.querySelector('.js-lang-dropdown');
const langOptions = document.querySelector('.js-lang-options');
const langCurrent = document.querySelector('.js-lang-current');
const langLinks = document.querySelectorAll('.lang-link');
const langLength = langLinks.length;
let langValue;
let activeItem = null;

langDropdown.addEventListener('click', () => {
  langOptions.classList.toggle('show')

  langLinks.forEach(link => {
    link.textContent === langCurrent.textContent ? link.classList.add("active-page") : link.classList.remove("active-page");
  });
});

langOptions.addEventListener('click', e => {
  const langItem = e.target;
  langValue = langItem.dataset.lang;
  langCurrent.textContent = langValue;
});

// scroll to top button
const scrollBtn = document.querySelector('.js-scroll-btn');
const footer = document.querySelector('.site-footer');
const footerHeight = footer.getBoundingClientRect().height;
// const footerHeight = footer.offsetHeight + "px";

window.onscroll = () => {
  document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? scrollBtn.style.display = 'block' : scrollBtn.style.display = 'none';
  stopBeforeFooter();
};

scrollBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    // let footera = footer.offsetHeight;
    // console.log(footera);
});

function stopBeforeFooter() {
  function getTopDistance(el){
    var btn = el.getBoundingClientRect();
    return btn.top;
  }
  
  if((getTopDistance(scrollBtn) + document.body.scrollTop) + scrollBtn.offsetHeight >= (getTopDistance(footer) + document.body.scrollTop) - 10) {
    scrollBtn.style.position = 'absolute';
    scrollBtn.style.bottom = footerHeight + "px";
  }

  if(document.body.scrollTop + window.innerHeight < (getTopDistance(footer) + document.body.scrollTop) + 30) {
    scrollBtn.style.position = 'fixed';
    scrollBtn.style.bottom = "30px";
  }
}

// company info mobile button
const companyInfoBtn = document.querySelector('.js-company-info-btn');
const companyListMobile = document.querySelector('.company-list-mobile');

companyInfoBtn.addEventListener('click', () => {
    companyListMobile.classList.toggle('visible');
});

// set date
const date = document.getElementById('js-date');
date.innerHTML = new Date().getFullYear();