"use strict";

// form's successful submit message
var form = document.getElementById('js-form');
var submitBtn = document.getElementById('js-submit');
var submitSuccess = document.getElementById('success-submit');
var submitContainer = document.querySelector('.submit-container');
form.addEventListener('submit', function (e) {
  e.preventDefault();
  submitSuccess.classList.remove('hide-block');
  submitContainer.classList.add('hide-block');
});