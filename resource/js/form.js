// form's successful submit message
const form = document.getElementById('js-form');
const submitBtn = document.getElementById('js-submit');
const submitSuccess = document.getElementById('success-submit');
const submitContainer = document.querySelector('.submit-container');

form.addEventListener('submit', (e) => {
	e.preventDefault();
	submitSuccess.classList.remove('hide-block');
	submitContainer.classList.add('hide-block');
});
