"use strict";

var modalBtns = document.querySelectorAll(".js-modal-btn");
var closeBtns = document.querySelectorAll(".close-btn");
document.addEventListener('click', function (e) {
  var datasetId = e.target.dataset.id; // open modal window

  if (e.target.classList.contains('js-modal-btn')) {
    var modalId = 'modal-' + datasetId;
    var modalElement = document.getElementById(modalId);
    modalElement.classList.add("open-modal");
    var modalVideo = modalElement.querySelector('.modal-video');
    modalVideo.setAttribute("autoplay", "true");
    modalVideo.load();
  } // close modal window


  if (e.target.classList.contains('close-btn')) {
    var _modalId = 'modal-' + datasetId;

    var _modalElement = document.getElementById(_modalId);

    _modalElement.classList.remove("open-modal");

    _modalElement.querySelector('.modal-video').pause();
  }
});