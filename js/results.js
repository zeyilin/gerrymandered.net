function update(json) {
    //var data = [{'thing': 'one'}, {'thing': 'two'}, {'thing': 'three'}]

    //var json = {
    //    "employees": [
    //        {"firstName": "John", "lastName": "Doe"},
    //        {"firstName": "Anna", "lastName": "Smith"},
    //        {"firstName": "Peter", "lastName": "Jones"}
    //    ]
    //}
    //$('body').html(json.results[1].first_name);


    //Name
    $('#rep-first').html(json.results[0].first_name);
    $('#rep-middle').html(json.results[0].middle_name);
    $('#rep-last').html(json.results[0].last_name);

    //static info
    $('#rep-state').append(json.results[0].state_name);
    $('#rep-gender').append(json.results[0].gender);
    $('#rep-party').append(json.results[0].party);
    $('#rep-chamber').append(json.results[0].chamber);
    $('#rep-office').append(json.results[0].office);

    //links
    $("#rep-contact").attr("href", json.results[0].contact_form);

    $("#rep-website").attr("href", json.results[0].website);
    $("#rep-fb").attr("href", "http://www.fb.com/" + json.results[0].facebook_id);
    $("#rep-twitter").attr("href", "http://www.twitter.com/" + json.results[0].twitter_id);
    $('#rep-twitter').html("<img class=\"tweet\" src=\"img/twitter.png\">" + "@" + json.results[0].twitter_id);


    //issues list
    $.each(data, function (key, value) {
        $('#rep-issues').append("<li>" + value.thing + "</li>");
    });


    //voting list
    $.each(data, function (key, value) {
        $('#rep-record').append("<li>" + value.thing + "</li>");
    });

}


function loadJsonData() {
    var address = getUrlVars()["address-input"];
    lat = address.split("_")[0];
    long = address.split("_")[1];
    //var lat = $('#lat').text();
    //var long = $('#long').text();
    var url = "https://congress.api.sunlightfoundation.com/legislators/locate?latitude=" + lat + "&longitude=" + long + "&apikey=1c3fb5c498f84116bb2a14bbc04af487"

    //var long = $('#jsondata').html(url);

    $.get(url, function (data) {
        //alert(JSON.stringify(data));
        update(data);

    });


}

function loadAddress() {
    var address = getUrlVars()["address-input"];
    document.getElementById('lat').innerHTML = address.split("_")[0];
    document.getElementById('long').innerHTML = address.split("_")[1];
}

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}