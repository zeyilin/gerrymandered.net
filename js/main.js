function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(submitLocation);
    } else {
        document.getElementById("loc").innerHTML = "Geolocation is not supported by this browser.";
    }
}

function submitLocation(position) {
    $('#address-input').val(position.coords.latitude +"____" + position.coords.longitude);
    $('#address-form').submit();
}
