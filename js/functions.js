function addPoints(map, arr) {
  /* Для каждого элемента массива */
  arr.forEach((i) => {
    ymaps
      .geocode(i.adress, {
        results: 1,
      })
      .then(function (res) {
        const firstGeoObject = res.geoObjects.get(0),
          coords = firstGeoObject.geometry.getCoordinates();
        const myGeoObject = new ymaps.GeoObject(
          {
            // Описание геометрии.
            geometry: {
              type: "Point",
              coordinates: coords,
            },
            // Свойства.
            properties: {
              iconContent: i.object,
              hintContent: i.equipment.name,
            },
          },
          {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: "islands#blackStretchyIcon",
            // Метку можно перемещать
            draggable: false,
          }
        );
        map.geoObjects.add(myGeoObject);
      });
  });
}
