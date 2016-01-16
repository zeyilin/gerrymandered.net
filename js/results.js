function update(json) {
    //var data = [{'thing': 'one'}, {'thing': 'two'}, {'thing': 'three'}]

    //var json = {
    //    "employees": [
    //        {"firstName": "John", "lastName": "Doe"},
    //        {"firstName": "Anna", "lastName": "Smith"},
    //        {"firstName": "Peter", "lastName": "Jones"}
    //    ]
    //}
    //$('body').html(json[1].first_name);

    //Rep
    //Name
    $('#rep-first').html(json[0].first_name);
    $('#rep-middle').html(json[0].middle_name);
    $('#rep-last').html(json[0].last_name);

    //static info
    $('#rep-state').append(json[0].state_name);
    $('#rep-gender').append(json[0].gender);
    $('#rep-party').append(json[0].party);
    $('#rep-chamber').append(json[0].chamber);
    $('#rep-office').append(json[0].office);

    //links
    $("#rep-contact").attr("href", json[0].contact_form);

    $("#rep-profpic").attr("src", "https://avatars.io/facebook/" + json[0].facebook_id);
    $("#rep-website").attr("href", json[0].website);
    $("#rep-fb").attr("href", "http://www.fb.com/" + json[0].facebook_id);
    $("#rep-twitter").attr("href", "http://www.twitter.com/" + json[0].twitter_id);
    $('#rep-twitter').html("<img class=\"tweet\" src=\"img/twitter.png\">" + "@" + json[0].twitter_id);

    //Sen1
    //Name
    $('#sen1-first').html(json[1].first_name);
    $('#sen1-middle').html(json[1].middle_name);
    $('#sen1-last').html(json[1].last_name);

    //static info
    $('#sen1-state').append(json[1].state_name);
    $('#sen1-gender').append(json[1].gender);
    $('#sen1-party').append(json[1].party);
    $('#sen1-chamber').append(json[1].chamber);
    $('#sen1-office').append(json[1].office);

    //links
    $("#sen1-contact").attr("href", json[1].contact_form);
    $("#sen1-profpic").attr("src", "https://avatars.io/facebook/" + json[1].facebook_id);
    $("#sen1-website").attr("href", json[1].website);
    $("#sen1-fb").attr("href", "http://www.fb.com/" + json[1].facebook_id);
    $("#sen1-twitter").attr("href", "http://www.twitter.com/" + json[1].twitter_id);
    $('#sen1-twitter').html("<img class=\"tweet\" src=\"img/twitter.png\">" + "@" + json[1].twitter_id);

    //Sen2
    //Name
    $('#sen2-first').html(json[2].first_name);
    $('#sen2-middle').html(json[2].middle_name);
    $('#sen2-last').html(json[2].last_name);

    //static info
    $('#sen2-state').append(json[2].state_name);
    $('#sen2-gender').append(json[2].gender);
    $('#sen2-party').append(json[2].party);
    $('#sen2-chamber').append(json[2].chamber);
    $('#sen2-office').append(json[2].office);

    //links
    $("#sen2-profpic").attr("src", "https://avatars.io/facebook/" + json[2].facebook_id);
    $("#sen2-contact").attr("href", json[2].contact_form);
    $("#sen2-website").attr("href", json[2].website);
    $("#sen2-fb").attr("href", "http://www.fb.com/" + json[2].facebook_id);
    $("#sen2-twitter").attr("href", "http://www.twitter.com/" + json[2].twitter_id);
    $('#sen2-twitter').html("<img class=\"tweet\" src=\"img/twitter.png\">" + "@" + json[2].twitter_id);

    ////issues list
    //$.each(data, function (key, value) {
    //    $('#rep-issues').append("<li>" + value.thing + "</li>");
    //});
    //
    //
    ////voting list
    //$.each(data, function (key, value) {
    //    $('#rep-record').append("<li>" + value.thing + "</li>");
    //});

}


function loadJsonData() {
    var address = getUrlVars()["address-input"];


    var lat = address.split("____")[0];
    var long = address.split("____")[1];
    //alert(long);
    var url;
    if (long != undefined) {
        url = ("http://gerrymandered.herokuapp.com/?address=" + lat + "," + long);
    } else {
        url = ("http://gerrymandered.herokuapp.com/?address=" + address);
    }

    $.get(url)
        .success(function (data) {
            //alert(url);
            update(data);
        })
        .error(function () {
            alert("Please enter a more specific or valid location");
            window.location.replace("index.html");

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