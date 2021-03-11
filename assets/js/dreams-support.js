"use strict";

var evt = new Event('customChange'); // select location

var locationDropdown = document.getElementById('js-location-dropdown');
var locationOptions = document.getElementById('js-location-options');
var currentLocation = document.getElementById('js-current-location');
var locationItems = document.querySelectorAll('.location-item');
locationDropdown.addEventListener('click', function () {
  locationOptions.classList.toggle('show');
});
locationOptions.addEventListener('click', function (e) {
  if (e.target.hasAttribute('data-loc')) {
    var locItem = e.target.dataset.loc;
    currentLocation.textContent = locItem;
    currentLocation.setAttribute('data-current', locItem);
    currentLocation.dispatchEvent(evt);
    currentLocation.style.fontWeight = '700';
  }

  locationItems.forEach(function (locItem) {
    locItem.textContent === currentLocation.textContent ? locItem.style.display = 'none' : locItem.style.display = 'block';
  });
}); // select type

var typeDropdown = document.getElementById('js-type-dropdown');
var typeOptions = document.getElementById('js-type-options');
var currentType = document.getElementById('js-current-type');
var typeItems = document.querySelectorAll('.type-item');
typeDropdown.addEventListener('click', function () {
  typeOptions.classList.toggle('show');
});
typeOptions.addEventListener('click', function (e) {
  if (e.target.hasAttribute('data-type')) {
    var typeItem = e.target.dataset.type;
    currentType.textContent = typeItem;
    currentType.setAttribute('data-current', typeItem);
    currentType.dispatchEvent(evt);
    currentType.style.fontWeight = '700';
  }

  typeItems.forEach(function (item) {
    item.textContent === currentType.textContent ? item.style.display = 'none' : item.style.display = 'block';
  });
}); // Google map

var activeMarkerIcon = './assets/img/marker-img-active.png';
var inactiveMarkerIcon = './assets/img/marker-img.png';
var googleMarkers = [];
var infowindow = new google.maps.InfoWindow({
  content: ''
});
var activeWindow;
var activeMarker;
var activeContent;
var map;
var marker; // add companies data

var markers = [['AUCH beauty home', '56.96535', '24.14054', 'Cēsu iela 20', 'Rīga', 'Skaistumkopšana', './assets/img/auch-logo.png', '+37128361686, +37123202079', 'auchbeauty@gmail.com'], ['Kurts Coffee', '56.95130', '24.12071', 'Tērbatas iela 2i', 'Rīga', 'Ēdināšana', './assets/img/kurts-logo.png', '+37123202079', ''], ['PURCH Restaurant', '56.95822', '24.19111', 'Dzelzavas iela 51A', 'Rīga', 'Ēdināšana', './assets/img/purch-logo.png', '+37125425254', 'factoryriga@gmail.com']]; // initiate the map

function initMap() {
  var center = new google.maps.LatLng(56.9496, 24.1052);
  var mapOptions = {
    zoom: 12,
    center: center,
    mapId: 'db5e2702d73aa451'
  };
  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  for (var _i = 0; _i < markers.length; _i++) {
    addMarker(markers[_i]);
  }
} //add markers to the map


function addMarker(marker) {
  var title = marker[0];
  var streetName = marker[3];
  var locationName = marker[4];
  var companyType = marker[5];
  var logo = marker[6];
  var phoneNumber = marker[7];
  var email = marker[8] ? "<p class=\"paragraph-small marker-email\">".concat(marker[8], "</p>") : '';
  var pos = new google.maps.LatLng(marker[1], marker[2]);
  var content = "<div class='marker-container'>\n      <div class=\"marker-logo-container\">\n        <img class='marker-logo' src='".concat(logo, "' alt='").concat(title, "'>\n      </div>\n      <div class=\"marker-content\">\n        <h3 class='marker-name'>").concat(title, "</h3>\n        <div class='marker-contact-info'>\n          <p class=\"paragraph-small\">").concat(phoneNumber, "</p>\n          ").concat(email, "\n          <p class=\"paragraph-small\">").concat(streetName, ", ").concat(locationName, "</p>\n        </div>\n      </div>\n    </div>");
  var updatedMarker = new google.maps.Marker({
    content: content,
    title: title,
    position: pos,
    streetName: streetName,
    locationName: locationName,
    logo: logo,
    phoneNumber: phoneNumber,
    email: email,
    companyType: companyType,
    map: map,
    icon: inactiveMarkerIcon
  });
  googleMarkers.push(updatedMarker);
  google.maps.event.addListener(updatedMarker, 'click', function (updatedMarker, content) {
    return function () {
      closeWindow();
      infowindow.setContent(content);
      infowindow.open(map, updatedMarker);
      map.panTo(this.getPosition());
      map.setZoom(12);
      updatedMarker.setIcon(activeMarkerIcon);
      activeWindow = infowindow;
      activeMarker = updatedMarker;
    };
  }(updatedMarker, content));
  google.maps.event.addListener(infowindow, 'closeclick', function () {
    return function () {
      closeWindow();
    };
  }(infowindow));
}

function closeWindow() {
  if (activeWindow) {
    activeWindow.close();
    activeMarker.setIcon(inactiveMarkerIcon);
  }
}

function renderActiveCompanyData(activeCompanyData) {
  var selectedCompanies = document.querySelector('.selected-companies');
  var result = '';
  activeCompanyData.forEach(function (item) {
    result += "".concat(item.content);
  });
  selectedCompanies.innerHTML = result;
}

var filterMarkers = function filterMarkers() {
  var locationName = currentLocation.dataset.current;
  var companyType = currentType.dataset.current;
  var activeCompanyData = [];

  for (i = 0; i < markers.length; i++) {
    marker = googleMarkers[i];

    if ((marker.locationName == locationName || locationName.length === 0) && (marker.companyType == companyType || companyType.length === 0)) {
      marker.setVisible(true);
      activeCompanyData.push(marker);
    } else {
      marker.setVisible(false);
    }
  }

  renderActiveCompanyData(activeCompanyData);
}; // init map


initMap();
currentLocation.addEventListener('customChange', function () {
  return filterMarkers();
});
currentType.addEventListener('customChange', function () {
  return filterMarkers();
});