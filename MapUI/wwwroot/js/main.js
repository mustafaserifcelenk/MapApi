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
                `<form enctype="multipart/form-data" method = "post" action = "/Save">` +
                    `<div class="form-group m-2">` +
                        `<label for="Name">Name</label>` +
                        `<input type="text" class="form-control" id="fname" name="Name" placeholder="Type Your Name">` +
                    `</div>` +
                    `<div class="form-group m-2">` +
                        `<label for="Number">Number</label>` +
                        `<input type="number" name="number" class="form-control" id="number" placeholder="Type Number">` +
                    `</div>` +
                    `<button id="submit" type="submit" class="btn btn-primary m-2" value="submit">Submit</button>` +
                    `<input type='hidden' id='CoordinateY' name='CoordinateY' value='${coordinates[1]}'><br><br>` +
                    `<input type='hidden' value='${coordinates[0]}' id='CoordinateX' name='CoordinateX'><br><br>` +
                `</form>`;

            jsPanel.create({
                position: 'center',
                content: html,
                contentSize: '700 350',
                headerTitle: 'my first panel',
                theme: 'primary',
                callback: function (panel) {
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

    $.ajax({
        type: 'GET',
        url: '\ShowRecords',
        contentType: "application/json",
        success: function (response) {
            var jsonData = JSON.parse(response);

            var _table_ = document.createElement('table'),
                _tr_ = document.createElement('tr'),
                _th_ = document.createElement('th'),
                _td_ = document.createElement('td');


            function buildHtmlTable(arr) {
                var table = _table_.cloneNode(false),
                    columns = addAllColumnHeaders(arr, table);
                for (var i = 0, maxi = arr.length; i < maxi; ++i) {
                    var tr = _tr_.cloneNode(false);
                    for (var j = 0, maxj = columns.length; j < maxj; ++j) {
                        var td = _td_.cloneNode(false);
                        cellValue = arr[i][columns[j]];
                        td.appendChild(document.createTextNode(arr[i][columns[j]] || ''));
                        tr.appendChild(td);
                    }
                    table.appendChild(tr);
                }
                table.setAttribute('class', 'table table-bordered m-5');
                return table;
            }

            function addAllColumnHeaders(arr, table) {
                var columnSet = [],
                    tr = _tr_.cloneNode(false);
                for (var i = 0, l = arr.length; i < l; i++) {
                    for (var key in arr[i]) {
                        if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
                            columnSet.push(key);
                            var th = _th_.cloneNode(false);
                            th.appendChild(document.createTextNode(key));
                            tr.appendChild(th);
                        }
                    }
                }
                table.appendChild(tr);
                return columnSet;
            }

            var showTable = buildHtmlTable(jsonData);

            jsPanel.create({
                position: 'center',
                content: showTable,
                contentSize: '700 350',
                headerTitle: 'my first panel',
                theme: 'primary',
                callback: function (panel) {
                }
            });

        }
    });



}


//const lines = lines.split(/\r\n|n/);
// map.getView().getCenter();
// map.getView().getCenter();


