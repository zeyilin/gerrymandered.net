function update(json) {

    if (!json[0]) {
        alert("Please enter a more specific or valid location");
        window.location.replace("index.html");
    }

    var count = json[0].result_count;

    if (count === 1) {
        document.getElementById('embed_map').setAttribute('src', 'https://www.govtrack.us/congress/members/embed/mapframe?state=' + json[0].state);
    } else {
        for (var i = 0; i < count; i++) {
            if (json[i].chamber === 'house') {
                document.getElementById('embed_map').setAttribute('src', json[i].map_URL);
                break;
            }
        }
    }


    //document.getElementById('embed_map').contentWindow.location.reload();

    var x = 0;
    var y = 1;
    var z = 2;

    if (!(json[0].chamber === 'house')) {
        if (!(json[1].chamber === 'house')) {
            x = 2;
            z = 0;
        } else {
            x = 1;
            y = 0;
        }
    }

    if (!json[x]) {
        document.getElementById("rep-table").style.display = 'none';

    }
    if (!json[y]) {
        document.getElementById("sen1-table").style.display = 'none';

    }
    if (!json[z]) {
        document.getElementById("sen2-table").style.display = 'none';
    }


    $('#entered-state').text( ((count===1)?" ":('District '+ json[x].district + ' of ')  )+ json[x].state_name);

    //Rep
    //Name
    $('#rep-first').html(json[x].first_name);
    $('#rep-middle').html(json[x].middle_name);
    $('#rep-last').html(json[x].last_name);

    //static info
    $('#rep-state').append(json[x].state_name);
    $('#rep-gender').append(json[x].gender);
    $('#rep-party').append(json[x].party);
    $('#rep-chamber').append(json[x].chamber);
    $('#rep-office').append(json[x].office);

    //links
    $("#rep-contact").attr("href", json[x].contact_form);
    $("#rep-profpic").attr("src", json[x].photo_URL);
    $("#rep-website").attr("href", json[x].website);
    $("#rep-fb").attr("href", "http://www.fb.com/" + json[x].facebook_id);
    $("#rep-twitter").attr("href", "http://www.twitter.com/" + json[x].twitter_id);
    $('#rep-twitter').html("<img class=\"tweet\" src=\"img/twitter.png\">" + "@" + json[x].twitter_id);

    //Sen1
    //Name
    $('#sen1-first').html(json[y].first_name);
    $('#sen1-middle').html(json[y].middle_name);
    $('#sen1-last').html(json[y].last_name);

    //static info
    $('#sen1-state').append(json[y].state_name);
    $('#sen1-gender').append(json[y].gender);
    $('#sen1-party').append(json[y].party);
    $('#sen1-chamber').append(json[y].chamber);
    $('#sen1-office').append(json[y].office);

    //links
    $("#sen1-contact").attr("href", json[y].contact_form);
    $("#sen1-profpic").attr("src", json[y].photo_URL);
    $("#sen1-website").attr("href", json[y].website);
    $("#sen1-fb").attr("href", "http://www.fb.com/" + json[y].facebook_id);
    $("#sen1-twitter").attr("href", "http://www.twitter.com/" + json[y].twitter_id);
    $('#sen1-twitter').html("<img class=\"tweet\" src=\"img/twitter.png\">" + "@" + json[y].twitter_id);

    //Sen2
    //Name
    $('#sen2-first').html(json[z].first_name);
    $('#sen2-middle').html(json[z].middle_name);
    $('#sen2-last').html(json[z].last_name);

    //static info
    $('#sen2-state').append(json[z].state_name);
    $('#sen2-gender').append(json[z].gender);
    $('#sen2-party').append(json[z].party);
    $('#sen2-chamber').append(json[z].chamber);
    $('#sen2-office').append(json[z].office);

    //links
    $("#sen2-profpic").attr("src", json[z].photo_URL);
    $("#sen2-contact").attr("href", json[z].contact_form);
    $("#sen2-website").attr("href", json[z].website);
    $("#sen2-fb").attr("href", "http://www.fb.com/" + json[z].facebook_id);
    $("#sen2-twitter").attr("href", "http://www.twitter.com/" + json[z].twitter_id);
    $('#sen2-twitter').html("<img class=\"tweet\" src=\"img/twitter.png\">" + "@" + json[z].twitter_id);

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

    //alert(address);
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