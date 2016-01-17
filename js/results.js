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

    $('#entered-state').text(((count === 1) ? " " : ('District ' + json[x].district + ' of ')  ) + json[x].state_name);


    //for(var j=0;j<json.length;j++){
    //    var obj = json[j];
    //    if (json[i].chamber === 'house'){
    //
    //    }
    //}

    var source = $("#legislator-template").html();
    var template = Handlebars.compile(source);

    if (json[x]) $("tbody").append(template(json[x]));
    if (json[y]) $("tbody").append(template(json[y]));
    if (json[z]) $("tbody").append(template(json[z]));
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