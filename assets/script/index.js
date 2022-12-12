'use strict';

function onEvent(event, selector, callback) {
  return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
  return parent.querySelector(selector);
}

function selectAll(selector, parent = document) {
  return parent.querySelectorAll(selector);
}

const mapbox = select('.mapbox');
const longHolder = select('.longitude');
const latHolder = select('.latitude');
let lat;
let long;

function getLocation(position) {
  const { latitude, longitude } = position.coords;
  lat = latitude;
  long = longitude;
  longHolder.innerText = long.toFixed(2);
  latHolder.innerText = lat.toFixed(2);  
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFib3NzMDIiLCJhIjoiY2xiZ3JuZGo1MGhmajNubXUzcmYyM3RvMSJ9.3XF64pMqvw0Mso4OQv3EDA';
  const map = new mapboxgl.Map({
      container: mapbox, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [long, lat], // starting position [lng, lat]
      zoom: 9 // starting zoom
  });
  const popup = new mapboxgl.Popup({ offset: 25 }).setText(
    `(${long}, ${lat})`
    );
  const el = document.createElement('div');
  el.id = 'marker'
  const marker = new mapboxgl.Marker({
    color: "#ff6eab",
    'id': 'marker'
    })
    .setLngLat([long, lat])
    .addTo(map)
    .setPopup(popup);

    map.addControl(new mapboxgl.FullscreenControl({container: select('.mapbox')}));
}

function errorHandler(error) {
  longHolder.innerText = 'Blocked';
  latHolder.innerText = 'Blocked';
  mapbox.style.backgroundColor = 'var(--app-blue)'
}

if (navigator.geolocation) {
  const nav = navigator.geolocation;
  nav.getCurrentPosition(getLocation, errorHandler, { enableHighAccuracy: true });
} else {
  console.log('Geolocation is not supported by your browser');
}
