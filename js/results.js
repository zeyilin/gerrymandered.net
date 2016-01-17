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

    var noList = ['MT', "VT", "ND", "WY", "DE", "SD", "AK"];
    var noDistrict = $.inArray(json[x].state, noList) > -1;

    $('#entered-state').text(((count === 1) ? " " : ((noDistrict ? 'the At-Large District' : 'District ' + json[x].district) + ' of ')  ) + json[x].state_name);

    var source = $("#legislator-template").html();
    var template = Handlebars.compile(source);

    if (json[x]) $("tbody").append(template(json[x]));
    if (json[y]) $("tbody").append(template(json[y]));
    if (json[z]) $("tbody").append(template(json[z]));
}


function loadJsonData() {
    var address = getUrlVars()["address-input"];
    var lat = address.split("____")[0];
    var long = address.split("____")[1];
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

function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}
