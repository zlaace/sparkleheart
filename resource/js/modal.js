const modalBtns = document.querySelectorAll(".js-modal-btn");
const closeBtns = document.querySelectorAll(".close-btn");

document.addEventListener('click', (e) => {
	let datasetId = e.target.dataset.id;

	// open modal window
  if (e.target.classList.contains('js-modal-btn')) {
		let modalId = 'modal-' + datasetId;
		let modalElement = document.getElementById(modalId);
		modalElement.classList.add("open-modal");
		let modalVideo = modalElement.querySelector('.modal-video');
		modalVideo.setAttribute("autoplay","true");
		modalVideo.load();
	}

	// close modal window
	if (e.target.classList.contains('close-btn')) {
		let modalId = 'modal-' + datasetId;
		let modalElement = document.getElementById(modalId);
		modalElement.classList.remove("open-modal");
    modalElement.querySelector('.modal-video').pause();
	}
});
