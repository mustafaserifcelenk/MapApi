var _Map, _Draw, _Source, _Layer;

InitializeMap = () => {

    _Source = new ol.source.Vector({ wrapX: false });

    _Layer = new ol.layer.Vector({
        source: _Source,
    });

    _Map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM()
            }),
            _Layer
        ],
        view: new ol.View({
            center: [3875337.272593909, 4673762.797695817],
            zoom: 7
        })
    });
}

AddInteraction = () => {

    _Draw = new ol.interaction.Draw({
        source: _Source,
        type: "Point"
    });

    _Map.addInteraction(_Draw);

    _Draw.setActive(false);

    _Draw.on(
        "drawend",
        (_event) => {
            var coordinates = _event.feature.getGeometry().getCoordinates();

            var html =
                '<form enctype="multipart/form-data" method="post" action="/Save">' +
                '<label for="Name">Name:</label>' +
                '<input type="text" id="fname" name="Name"><br><br>' +
                '<label for="Number">Number:</label>' +
                '<input type="number" id="lname" name="Number"><br><br>' +
                `<input type='hidden' value='${coordinates[0]}' id='CoordinateX' name='CoordinateX'><br><br>` +
                `<input type='hidden' id='CoordinateY' name='CoordinateY' value='${coordinates[1]}'><br><br>` +
                '<input id="submit" type="submit" value="Submit">' +
                '</form>';

            jsPanel.create({
                position: 'center',
                content: html,
                contentSize: '700 350',
                headerTitle: 'my first panel',
                theme: 'primary',
                callback: function (panel) {
                    // do something if needed ...
                }
            });

            console.log(_event.feature.getGeometry().getCoordinates());

            _Draw.setActive(false);
        });
}

AddPoint = () => {

    _Draw.setActive(true);
}

ListData = () => {


    jsPanel.create({
        position: 'center',
        content: html,
        contentSize: '700 350',
        headerTitle: 'my first panel',
        theme: 'primary',
        callback: function (panel) {
            // do something if needed ...
        }
    });
}

// map.getView().getCenter();
// map.getView().getCenter();


