function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("loc").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById("loc").innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;

    var params = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
        username: 'gangoffour'
    };

    $.get('http://api.geonames.org/findNearbyPostalCodesJSON', params, function(result) {
        $('#zip').html(result['postalCodes'][0]['postalCode']);
    });
}

function loadAddress(){
    var address = getUrlVars()["address-input"].replace(/\+/g," ");
    document.getElementById('address').innerHTML = address;
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}