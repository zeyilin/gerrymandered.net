function dataTest() {
    $('#rep-first').html("first");
    $('#rep-middle').html("middle");
    $('#rep-last').html("last");

    $('#rep-state').append("texas");
    $('#rep-gender').append("F");
    $('#rep-party').append("everything!");
    $('#rep-chamber').append("#593!");
    $('#rep-office').append("101 place street!");

    $("#rep-website").attr("href", "http://www.google.com/");
    $("#rep-fb").attr("href", "http://www.google.com/");
    $("#rep-twitter").attr("href", "http://www.google.com/");
    $('#rep-twitter').html("<img class=\"tweet\" src=\"img/twitter.png\">" + "@"+"COOL");


}


