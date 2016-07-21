/**
 * Created by Martin on 17.07.2016.
 */

$(document).ready(function () {
    $("#formular").bind("submit", sendAjaxAsync);
});

function sendAjaxAsync(event) {
    // Submit unterbrechen
    event.preventDefault();

    // URL und parameter zum Senden aus dem Formular nehmen
    var form = this;
    var url = form.getAttribute("action");
    var query = "?keyword=" + form.elements["keyword"].value;
    //URL um Query erweitern
    url = url + query;
    url = url.replace(/#/, "%23");

    var request = new XMLHttpRequest();
    request.open("GET", url, true); // asynchroner GET
    request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
    request.send();

    request.onreadystatechange = function () {
        if (request.readyState === 4) {
            if (request.status == "200") {
                if (request.responseText != '') {

                    var list = document.getElementById('list');
                    //clear list

                    list.innerHTML = "";
                    var json = JSON.parse(request.responseText);
                    for (var i = 0; i < json.length; i++) {
                        var tr = document.createElement("tr");
                        var td = document.createElement("td");
                        td.innerHTML = json[i].name;
                        tr.appendChild(td);

                        var td = document.createElement("td");
                        td.innerHTML = json[i].hashtag;
                        tr.appendChild(td);

                        var td = document.createElement("td");
                        td.innerHTML = json[i].lat;
                        tr.appendChild(td);

                        var td = document.createElement("td");
                        td.innerHTML = json[i].long;
                        tr.appendChild(td);
                        list.appendChild(tr);
                    }
                }
            } else {
                alert("Ein Fehler ist aufgetreten: " + request.statusText);
            }
        }
    }
};
