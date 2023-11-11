async function init() {
    //getLocation();
    let start = $('#start')
        start.change(btnCheck);
    let end = $('#end');
    end.change(btnCheck);
    $('#latitude').change(btnCheck);
    $('#longitude').change(btnCheck);

    start.val(daysAgo(8).toISOString().split('T')[0]);
    end.val(daysAgo(1).toISOString().split('T')[0]);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            fillPosition(position);
            showData();
        });
    }
}

async function showData() {

    await fetchTemp();
    await fetchForecast();
    setMap();
}



function setMap() {
    let lat = $('#latitude').val();
    let lon = $('#longitude').val();
    updateMap(lon, lat);
}

function daysAgo(days){
    var today = new Date();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate() - days);
}



function btnCheck() {
    let start = $('#start').val();
    let end = $('#end').val();
    let lat = $('#latitude').val();
    let lon = $('#longitude').val();

    if (start && end && lat && lon) {
        $('#fetch').prop('disabled', false);
    } else {
        $('#fetch').prop('disabled', true);
    }
}

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(fillPosition);
    }
}

function fillPosition(position) {
    $('#latitude').val(position.coords.latitude);
    $('#longitude').val(position.coords.longitude);
    btnCheck();
}


async function fetchTemp() {
    const url = 'https://archive-api.open-meteo.com/v1/era5';

    let startDate = $('#start').val();
    let endDate = $('#end').val();
    let lat = $('#latitude').val();
    let lon = $('#longitude').val();

    const finalUrl = `${url}?latitude=${lat}&longitude=${lon}&start_date=${startDate}&end_date=${endDate}&hourly=temperature_2m`;

    let response = await fetch(finalUrl);

    let data = await response.json();

    let chartCont = $('#chart-temperature')[0];

    let tempTrace = {
        x: data.hourly.time,
        y: data.hourly.temperature_2m,
        mode: 'lines',
        line: {
            color: 'rgb(55, 128, 191)',
            width: 3
        }
    };

    var layout = {
        margin: {
            t: 15, //top margin
            l: 15, //left margin
            r: 15, //right margin
            b: 15 //bottom margin
        }
    };


    var config = {responsive: true}

    Plotly.newPlot(chartCont, [tempTrace], layout, config);
}


async function fetchForecast() {
    const url = 'https://api.open-meteo.com/v1/forecast';

    let lat = $('#latitude').val();
    let lon = $('#longitude').val();

    const finalUrl = `${url}?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,precipitation,surface_pressure,wind_speed_10m`;
    let response = await fetch(finalUrl);

    let weatherData = await response.json();

    fillForecast(weatherData);
}

function fillForecast(weatherData) {
    let current = weatherData.current;
    let temperature = current.temperature_2m;
    let humidity = current.relative_humidity_2m;
    let precipitation = current.precipitation;
    let pressure = current.surface_pressure;
    let windSpeed = current.wind_speed_10m;

    $('#temperature').text(temperature);
    $('#precipitation').text(precipitation);
    $('#wind-speed').text(windSpeed);
    // $('#humidity').text(humidity);
    $('#air-pressure').text(pressure);

    $('#town-lat').text(weatherData.latitude);
    $('#town-lon').text(weatherData.longitude);
    $('#town-elv').text(weatherData.elevation + 'm');
    $('#town-tz').text(weatherData.timezone);
}

async function fetchForCity() {

    let city = $('#city').val();
    let url = `https://geocode.maps.co/search?q=${city}`;

    let response = await fetch(url)
    let json = await response.json();
    let lat = json[0].lat;
    let lon = json[0].lon;
    $('#latitude').val(lat);
    $('#longitude').val(lon);
    await showData();
}

// Inicializace mapy
let map = new OpenLayers.Map("map");
map.addLayer(new OpenLayers.Layer.OSM());

// Inicializace vrstvy pro značky
let markers = new OpenLayers.Layer.Markers("Markers");
map.addLayer(markers);

function updateMap(longitude, latitude) {

    var lonLat = new OpenLayers.LonLat(Number(longitude), Number(latitude))
        .transform(
            new OpenLayers.Projection("EPSG:4326"), // z transformace z WGS 1984
            map.getProjectionObject() // na Spherical Mercator Projection
        );

    // Odstranění stávajícího markeru
    markers.clearMarkers();

    // Přidání nového markeru
    markers.addMarker(new OpenLayers.Marker(lonLat));

    // Nastavení nového centra mapy
    map.setCenter(lonLat, 10);
}

$(init)



