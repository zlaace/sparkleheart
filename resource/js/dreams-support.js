const evt = new Event('customChange');

// select location
const locationDropdown = document.getElementById('js-location-dropdown');
const locationOptions = document.getElementById('js-location-options');
const currentLocation = document.getElementById('js-current-location');
const locationItems = document.querySelectorAll('.location-item');

locationDropdown.addEventListener('click', () => {
  locationOptions.classList.toggle('show');
});

locationOptions.addEventListener('click', e => {
  if (e.target.hasAttribute('data-loc')) {
    const locItem = e.target.dataset.loc;
    currentLocation.textContent = locItem;
    currentLocation.setAttribute('data-current', locItem);
    currentLocation.dispatchEvent(evt);
    currentLocation.style.fontWeight = '700';
  }

	locationItems.forEach( locItem => {
		locItem.textContent === currentLocation.textContent ?
			locItem.style.display = 'none' : locItem.style.display = 'block'
	});
});

// select type
const typeDropdown = document.getElementById('js-type-dropdown');
const typeOptions = document.getElementById('js-type-options');
const currentType = document.getElementById('js-current-type');
const typeItems = document.querySelectorAll('.type-item');

typeDropdown.addEventListener('click', () => {
  typeOptions.classList.toggle('show');
});

typeOptions.addEventListener('click', e => {
  if (e.target.hasAttribute('data-type')) {
    const typeItem = e.target.dataset.type;
    currentType.textContent = typeItem;
    currentType.setAttribute('data-current', typeItem);
    currentType.dispatchEvent(evt);
    currentType.style.fontWeight = '700';
  }

  typeItems.forEach( item => {
		item.textContent === currentType.textContent ?
			item.style.display = 'none' : item.style.display = 'block'
	});
})

// Google map
const activeMarkerIcon = './assets/img/marker-img-active.png';
const inactiveMarkerIcon = './assets/img/marker-img.png';
let googleMarkers = [];
let infowindow = new google.maps.InfoWindow({ content: '' });
let activeWindow;
let activeMarker;
let activeContent;
let map;
let marker;

// add companies data
const markers = [
  ['AUCH beauty home','56.96535','24.14054', 'Cēsu iela 20', 'Rīga', 'Skaistumkopšana', './assets/img/auch-logo.png', '+37128361686, +37123202079', 'auchbeauty@gmail.com'],
  ['Kurts Coffee','56.95130','24.12071','Tērbatas iela 2i', 'Rīga', 'Ēdināšana', './assets/img/kurts-logo.png', '+37123202079', ''],
  ['PURCH Restaurant','56.95822','24.19111','Dzelzavas iela 51A', 'Rīga', 'Ēdināšana', './assets/img/purch-logo.png', '+37125425254', 'factoryriga@gmail.com']
];

// initiate the map
function initMap() {
  let center = new google.maps.LatLng(56.9496, 24.1052);

  let mapOptions = {
    zoom: 12,
    center: center,
    mapId: 'db5e2702d73aa451'
  };

  map = new google.maps.Map(document.getElementById('map'), mapOptions);

  for (let i = 0; i < markers.length; i++) {
      addMarker(markers[i]);
  }
}

//add markers to the map
function addMarker(marker) {
  let title = marker[0];
  let streetName = marker[3];
  let locationName = marker[4];
  let companyType = marker[5];
  let logo = marker[6];
  let phoneNumber = marker[7];
  let email = marker[8] ? `<p class="paragraph-small marker-email">${marker[8]}</p>` : '';
  let pos = new google.maps.LatLng(marker[1], marker[2]);
  let content =
    `<div class='marker-container'>
      <div class="marker-logo-container">
        <img class='marker-logo' src='${logo}' alt='${title}'>
      </div>
      <div class="marker-content">
        <h3 class='marker-name'>${title}</h3>
        <div class='marker-contact-info'>
          <p class="paragraph-small">${phoneNumber}</p>
          ${email}
          <p class="paragraph-small">${streetName}, ${locationName}</p>
        </div>
      </div>
    </div>`;

  let updatedMarker = new google.maps.Marker({
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

  google.maps.event.addListener(updatedMarker, 'click', ((updatedMarker, content) => {
    return function() {
      closeWindow();
      infowindow.setContent(content);
      infowindow.open(map, updatedMarker);
      map.panTo(this.getPosition());
      map.setZoom(12);
      updatedMarker.setIcon(activeMarkerIcon);
      activeWindow = infowindow;
      activeMarker = updatedMarker;
    }
  })(updatedMarker, content));

  google.maps.event.addListener(infowindow, 'closeclick', (() => {
    return function () { closeWindow(); }
  })(infowindow));
}

function closeWindow() {
  if (activeWindow) {
    activeWindow.close();
    activeMarker.setIcon(inactiveMarkerIcon);
  }
}

function renderActiveCompanyData(activeCompanyData) {
  let selectedCompanies = document.querySelector('.selected-companies');
  let result = '';

  activeCompanyData.forEach(item => {
    result += `${item.content}`;
  });

  selectedCompanies.innerHTML = result;
}

let filterMarkers = function () {
  let locationName = currentLocation.dataset.current;
  let companyType = currentType.dataset.current;
  let activeCompanyData = [];

  for (i = 0; i < markers.length; i++) {
      marker = googleMarkers[i];

      if ((
          marker.locationName == locationName ||
          locationName.length === 0
      ) && (
          marker.companyType == companyType ||
          companyType.length === 0
      )) {
          marker.setVisible(true);
          activeCompanyData.push(marker);
      } else {
          marker.setVisible(false);
      }
  }

  renderActiveCompanyData(activeCompanyData);
};

// init map
initMap();

currentLocation.addEventListener('customChange', () => filterMarkers());
currentType.addEventListener('customChange', () => filterMarkers());