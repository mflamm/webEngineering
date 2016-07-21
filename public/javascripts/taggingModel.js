/**
 * Created by Martin on 17.07.2016.
 */

$(document).ready(function () {
    navigator.geolocation.getCurrentPosition(showPosition, error);
    $("#formular").bind("submit", tagLocation);
});

function showPosition(position) {
    var lat = position.coords.latitude.toString();
    var long = position.coords.longitude.toString();
    document.getElementById('lat').value = lat;
    document.getElementById('long').value = long;
}

function error(err) {
    console.warn('ERROR(' + err.code + '): ' + err.message);
};

function tagLocation(event) {
    // Submit unterbrechen
    event.preventDefault();
    var form = this;
    var responseStatus = document.getElementById("responseStatus");

    if (isInputNameValid()) {
        // URL und parameter zum Senden aus dem Formular nehmen
        var url = form.getAttribute("action");
        var params = "name=" + form.elements["name"].value + "&"
            + "hashtag=" + form.elements["hashtag"].value + "&"
            + "lat=" + form.elements["lat"].value + "&"
            + "long=" + form.elements["long"].value;

        // asynchroner Request
        var request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.send(params);

        request.onreadystatechange = function () {
            if (request.readyState === 4) {
                if (request.status == "200") {
                    if (request.responseText === "Already exists.") {
                        responseStatus.innerHTML = request.responseText;
                        responseStatus.style.color = "#ff2626";
                    } else {
                        responseStatus.innerHTML = "Saved.";
                        responseStatus.style.color = "#66ff4e";
                    }
                    document.getElementById('name').value = "";
                    document.getElementById('hashtag').value = "";

                } else {
                    alert("Ein Fehler ist aufgetreten: " + request.statusText);
                }
            }
        }

    } else {
        responseStatus.innerHTML = "Name not valid.";
        responseStatus.style.color = "#ff2626";
        console.warn("Name not valid");
    }

    function isInputNameValid() {
        //check if name is valid
        var regex = /^[a-zA-Z0-9]+$/;
        var match = regex.test(form.elements["name"].value);
        console.warn('ERROR("Name nicht zugelassen"');
        if (match) return true
        else false
    };
}