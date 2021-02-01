const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelectorAll('.nav-link');
const scrollBtn = document.getElementById('scrollBtn');
const companyInfoBtn = document.querySelector('.company-info-mobile');
const companyListMobile = document.querySelector('.company-list-mobile');
const date = document.getElementById('date'); 
const dropdown = document.getElementById("js-dropdown");
const options = document.getElementById("js-options");
const input = document.getElementById("js-input");


// toggle navbar
navToggle.addEventListener('click', () => {
    document.body.classList.toggle('nav-open');
});

navLinks.forEach( link => {
    link.addEventListener('click', () => {
        document.body.classList.remove('nav-open');
    });
});

// scroll to top button
window.onscroll = () => {
    document.body.scrollTop > 20 || document.documentElement.scrollTop > 20 ? scrollBtn.style.display = 'block' : scrollBtn.style.display = 'none';
};

scrollBtn.addEventListener('click', () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
});

// company info mobile button
companyInfoBtn.addEventListener('click', () => {
    companyListMobile.classList.toggle('visible');
});

// set date
date.innerHTML = new Date().getFullYear();

// language switcher dropdown
dropdown.addEventListener('click', () => 
  options.classList.toggle('show')
);

options.addEventListener('click', event => {
  const listItem = event.target;
  const value = listItem.attributes.langOption.value;
  console.log(value);
  input.value = value;
});