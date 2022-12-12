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
let lat;
let long;

function getLocation(position) {
  const { latitude, longitude } = position.coords;
  lat = latitude;
  long = longitude;
  console.log(`${lat}, ${long}`)
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFib3NzMDIiLCJhIjoiY2xiZ3JuZGo1MGhmajNubXUzcmYyM3RvMSJ9.3XF64pMqvw0Mso4OQv3EDA';
  const map = new mapboxgl.Map({
      container: mapbox, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: [long, lat], // starting position [lng, lat]
      zoom: 9 // starting zoom
  });

  const marker = new mapboxgl.Marker()
    .setLngLat([long, lat])
    .addTo(map);
  
  map.addControl(new mapboxgl.FullscreenControl());
}

function errorHandler(error) {
  console.log(error.message);
}

if (navigator.geolocation) {
  const nav = navigator.geolocation;
  nav.getCurrentPosition(getLocation, errorHandler, { enableHighAccuracy: true });
} else {
  console.log('Geolocation is not supported by your browser');
}

function createMap() {
  onEvent('click', mapbox, () => {

  })
}