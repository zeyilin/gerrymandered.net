function loadJsonData() {
    var bio_id = getUrlVars()["bio_id"];
    var url = ("http://gerrymandered.herokuapp.com/votes?memberID=" + bio_id);

    $.get(url)
        .success(function (data) {
            update(data);
        })
        .error(function () {
            alert("Oops!");
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

function update(json) {
    if (!json[0]) {
        alert("Oops!");
        window.location.replace("index.html");
    }

    var source = $("#voting-template").html();
    var template = Handlebars.compile(source);

    $.each(json, function (i, item) {
        if (!json[i].bill_title) {
            return true;
        }
        $("tbody").append(template(json[i]));
    });

    $('#first_name').html(json[1].title + '. ' + json[1].first_name + " " + json[1].last_name + " (" + json[1].party + "-" + json[1].state + ")");
    $('#voteimg').attr('src', json[2].photo_URL);
}