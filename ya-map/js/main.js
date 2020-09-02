let myMap;

function init() {
  const objectManager = new ymaps.ObjectManager(),
    myMap = new ymaps.Map(
      "ya-map",
      {
        center: [55.753215, 37.622504],
        zoom: 3,
        controls: ["geolocationControl", "typeSelector"],
      },
      {
        restrictMapArea: [
          [40, 19],
          [78, -168],
        ],
        minZoom: 1,
        maxZoom: 19,
      }
    );

  /* Добавляем Россию на карту */
  ymaps.borders.load("RU", { lang: "ru", quality: 0 }).then((geojson) => {
    let regions = ymaps.geoQuery(geojson);
    regions.setOptions("fillColor", "#0000dd22");
    regions.addToMap(myMap);
  });

  /* Добавляем Казахстан на карту */
  ymaps.borders.load("KZ", { lang: "ru", quality: 1 }).then((geojson) => {
    let regions = ymaps.geoQuery(geojson);
    regions.setOptions("fillColor", "#00ff1a22");
    regions.addToMap(myMap);
  });

  /* Добавляем товары на карту */
  addPointsOnMap(myMap, products);

  // myMap.geoObjects.events.add("click", function (e) {
  //   let object = e.get("target");
  // });
  // myMap.geoObjects.events.add("mouseenter", function (e) {
  //   let object = e.get("coords");
  // });
  // myMap.geoObjects.events.add("mouseleave", function (e) {
  //   let object = e.get("target");
  // });
}

ymaps.ready(init);
