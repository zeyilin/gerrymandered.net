function loadJsonData() {
    var bio_id = getUrlVars()["bio_id"];

    //alert(bio_id)
    //var url = bio_id;

    //$('#data').html(bio_id);

    //$.get(url)
    //    .success(function (data) {
            update();
    //    })
    //    .error(function () {
    //        alert("Oops!");
    //        window.location.replace("index.html");
    //    });
}


function getUrlVars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function (m, key, value) {
        vars[key] = value;
    });
    return vars;
}

function update(json) {

    //if (!json[0]) {
    //    alert("Oops!");
    //    window.location.replace("index.html");
    //}

    var json2 = [{
        "title": "test-title1",
        "first_name" : "first1",
        "last_name" : "last1"
    },
        {
            "title": "test-title2",
            "first_name" : "first2",
            "last_name" : "last2"
        },
        {
            "title": "test-title3",
            "first_name" : "first3",
            "last_name" : "last3"
        }];

    var source = $("#voting-template").html();
    var template = Handlebars.compile(source);

    $.each(json2, function(i, item) {
        $("tbody").append(template(json2[i]));
    });

}