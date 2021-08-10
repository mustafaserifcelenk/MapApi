let _Map, _Draw, _Source, _Layer;
let draw;

InitializeMap = () => {
    let jsonData;
    $.ajax({
        type: 'GET',
        url: '\ShowRecords',
        contentType: "application/json",
        async: false,
        success: function (response) {
            jsonData = JSON.parse(response);
        }
    });

    _Source = new ol.source.Vector({ wrapX: false });

    _Layer = new ol.layer.Vector({
        source: _Source,
    });


    let iconFeatures = [];

    for (let i = 0; i < jsonData.length; i++) {
        iconFeatures.push(new ol.Feature({
            geometry: new ol.geom.Point([jsonData[i].CoordinateX, jsonData[i].CoordinateY]),
            name: jsonData[i].Name,
        })
        );
    }

    _Map = new ol.Map({
        target: 'map',
        layers: [
            new ol.layer.Tile({
                source: new ol.source.OSM(),
            }),

            new ol.layer.Vector({
                source: new ol.source.Vector({
                    features: iconFeatures
                }),
                style: new ol.style.Style({
                    image: new ol.style.Icon({
                        anchor: [0.5, 46],
                        anchorXUnits: 'fraction',
                        anchorYUnits: 'pixels',
                        src: 'https://openlayers.org/en/latest/examples/data/icon.png'
                    })
                })
            })

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
            let coordinates = _event.feature.getGeometry().getCoordinates();

            let form =
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
                content: form,
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
            let jsonData = JSON.parse(response);

            let _table_ = document.createElement('table'),
                _tr_ = document.createElement('tr'),
                _th_ = document.createElement('th'),
                _td_ = document.createElement('td');


            function buildHtmlTable(arr) {
                let table = _table_.cloneNode(false),
                    columns = addAllColumnHeaders(arr, table);
                for (let i = 0, maxi = arr.length; i < maxi; ++i) {
                    let tr = _tr_.cloneNode(false);
                    for (let j = 0, maxj = columns.length; j < maxj; ++j) {
                        let td = _td_.cloneNode(false);
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
                let columnSet = [],
                    tr = _tr_.cloneNode(false);
                for (let i = 0, l = arr.length; i < l; i++) {
                    for (let key in arr[i]) {
                        if (arr[i].hasOwnProperty(key) && columnSet.indexOf(key) === -1) {
                            columnSet.push(key);
                            let th = _th_.cloneNode(false);
                            th.appendChild(document.createTextNode(key));
                            tr.appendChild(th);
                        }
                    }
                }
                table.appendChild(tr);
                return columnSet;
            }

            let showTable = buildHtmlTable(jsonData);

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

