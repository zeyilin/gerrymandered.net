function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(submitLocation);
    } else {
        document.getElementById("loc").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById("loc").innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;

    //var params = {
    //    lat: position.coords.latitude,
    //    lng: position.coords.longitude,
    //    username: 'gangoffour'
    //};
    //
    //$.get('http://api.geonames.org/findNearbyPostalCodesJSON', params, function (result) {
    //    $('#zip').html(result['postalCodes'][0]['postalCode']);
    //});
}

function submitLocation(position) {

    $('#address-input').val(position.coords.latitude +"_" + position.coords.longitude);
    $('#address-form').submit();
}
