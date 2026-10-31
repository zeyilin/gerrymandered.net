function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(submitLocation, handleLocationError);
    } else {
        alert("Geolocation is not supported by this browser.");
    }
}

function handleLocationError(error) {
    if (error.code === error.PERMISSION_DENIED) {
        alert("Location access was denied. Please type your address instead.");
    } else {
        alert("Could not determine your location. Please type your address instead.");
    }
}

function submitLocation(position) {
    const input = document.getElementById("address-input");
    const form = document.getElementById("address-form");
    input.value = position.coords.latitude + "____" + position.coords.longitude;
    form.submit();
}
