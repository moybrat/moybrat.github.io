function addPointsOnMap(map, arr) {
  const clusterer = new ymaps.Clusterer({
      /* стили для меток нужно назначать каждой метке отдельно.
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/option.presetStorage.xml
       */
      preset: "islands#invertedVioletClusterIcons",

      /** Опции кластеров указываем в кластеризаторе с префиксом "cluster".
       * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/ClusterPlacemark.xml
       */
      clusterDisableClickZoom: true,
      clusterHideIconOnBalloonOpen: false,
      geoObjectHideIconOnBalloonOpen: false,
    }),
    /**
     * Функция возвращает объект, содержащий данные метки.
     * Поле данных clusterCaption будет отображено в списке геообъектов в балуне кластера.
     * Поле balloonContentBody - источник данных для контента балуна.
     * Оба поля поддерживают HTML-разметку.
     * Список полей данных, которые используют стандартные макеты содержимого иконки метки
     * и балуна геообъектов, можно посмотреть в документации.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
     */

    getPointData = function (info) {
      const {
        name,
        number_factory,
        number_inventory,
        year_of_issue,
        start_of_operation,
      } = info.equipment;
      return {
        balloonContentHeader: "<font size=2><b>" + info.object + "</b></font>",
        balloonContentBody:
          "<p><b>" +
          name +
          "</b></p>" +
          "<p><b>Заводской номер: </b>" +
          number_factory +
          "</p>" +
          "<p><b>Инвентарный номер: </b>" +
          number_inventory +
          "</p>",
        balloonContentFooter:
          "<font size=1><b>Дата выпуска: </b>" +
          year_of_issue +
          ";<b>Начало эксплуатации:" +
          start_of_operation +
          "</b>",
        clusterCaption: "<strong>" + info.adress + "</strong>",
      };
    },
    /** Все опции, которые поддерживают геообъекты, можно посмотреть в документации.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/GeoObject.xml
     */
    getPointOptions = function () {
      return {
        preset: "islands#violetIcon",
      };
    };

  new Promise((resolve, reject) => {
    ymaps
      .geocode("Питер", {
        results: 1,
      })
      .then(function (res) {
        const firstGeoObject = res.geoObjects.get(0),
          coords = firstGeoObject.geometry.getCoordinates();
      });
  });

  /**
   * Данные передаются вторым параметром в конструктор метки, опции - третьим.
   * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Placemark.xml#constructor-summary
   */
  let arr_promises = [];

  for (var i = 0, len = products.length; i < len; i++) {
    arr_promises.push(
      new Promise((resolve, reject) => {
        ymaps
          .geocode(products[i].adress, {
            results: 1,
          })
          .then(function (res) {
            resolve(res.geoObjects.get(0).geometry.getCoordinates());
          });
      })
    );
  }
  Promise.all(arr_promises).then((coordinates) => {
    console.log(coordinates);
    let geoObjects = [];
    for (var i = 0, len = products.length; i < len; i++) {
      geoObjects[i] = new ymaps.Placemark(
        coordinates[i],
        getPointData(products[i]),
        getPointOptions()
      );
    }
    /**
     * Можно менять опции кластеризатора после создания.
     */
    clusterer.options.set({
      gridSize: 80,
      clusterDisableClickZoom: true,
    });

    /**
     * В кластеризатор можно добавить javascript-массив меток (не геоколлекцию) или одну метку.
     * @see https://api.yandex.ru/maps/doc/jsapi/2.1/ref/reference/Clusterer.xml#add
     */
    clusterer.add(geoObjects);
    map.geoObjects.add(clusterer);
  });
}
