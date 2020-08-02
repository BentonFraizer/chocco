let myMap;

const init = () => {
  myMap = new ymaps.Map("map", {
    center: [59.938951, 30.315635],
    zoom: 11,
    controls: [
      'zoomControl'
    ],
  });

  const coords = [
    [59.981485, 30.210661],
    [60.070661, 30.317244],
    [59.904877, 30.494608],
    [59.825885, 30.343516]
  ];

  const myCollection = new ymaps.GeoObjectCollection({}, {
    draggable: false,
    iconLayout: 'default#image',
    iconImageHref: "/icons/marker.svg",
    iconImageSize: [46, 57],
    iconImageOffset: [-35, -52]
  })

  coords.forEach(coord => {
    myCollection.add(new ymaps.Placemark(coord));
  })

  myMap.geoObjects.add(myCollection);

  myMap.behaviors.disable('scrollZoom');
}

ymaps.ready(init);