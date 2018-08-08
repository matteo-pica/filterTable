// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
var tableMsg = document.querySelector("#messages tbody");

datiKey = ["a", "b", "c"];

const dati = [{
    "a": "acca",
    "b": "bcc",
    "c": 1
},
{
    "a": "as",
    "b": "dfff",
    "c": 1
},
{
    "a": "g",
    "b": "bzz",
    "c": 12
},
{
    "a": "f",
    "b": "baa",
    "c": 1
},
{
    "a": "n",
    "b": "ss",
    "c": 13
}
]

dati.forEach(function (dato, i) {

    var tr = document.createElement("tr");
    tr.setAttribute("data-index", i);
    tr.innerHTML = "<td>" + dato.a + "</td>";
    tr.innerHTML += "<td>" + dato.b + "</td>";
    tr.innerHTML += "<td>" + dato.c + "</td>";
    // tr.data_obj = dato;
    dato.data_index = i;

    // tr.onclick = function(e){
    //     e.preventDefault();
    //     console.log("test");
    //     return false;
    // }
    tableMsg.appendChild(tr);
    // tableMsg.innerHTML += "<tr><td>"+ dato.a +"</td><td>"+ dato.b +"</td><td>"+ dato.c +"</td></tr>"
});

var filterDOM = document.getElementById("filter-text");


function processForm(e) {
    if (e.preventDefault) e.preventDefault();
    var filter = filterDOM.value.trim();
    if (filter == "") {
        document.querySelectorAll("tbody tr").forEach((e) => (e.classList.remove("d-none")));
        document.getElementById("error-log").innerHTML = "";
        return false;
    }
   
    // Controllo se ci sono = singoli
    if(filter.replace("===","").replace("==","").indexOf("=")>=0){
        document.getElementById("error-log").innerHTML = "trovato un uguale solo";
        return false;
    }


    setTimeout(`
    var cloneDati = JSON.parse(JSON.stringify(dati));;
    try {
    filter_rows(cloneDati.filter(w => `+ filter + `))
    }catch(err){
        document.getElementById("error-log").innerHTML = err.message;
    }
    `,1);
    /* do what you want with the form */

    // You must return false to prevent the default form behavior
    return false;
}

function filter_rows(filtered) {
    document.querySelectorAll("tbody tr").forEach((e) => (e.classList.add("d-none")));
    filtered.forEach((e) => (
        document.querySelector("tbody tr[data-index='" + e.data_index + "']").classList.remove("d-none")
    ));
}

var form = document.getElementById('filter-form');
if (form.attachEvent) {
    form.attachEvent("submit", processForm);
} else {
    form.addEventListener("submit", processForm);
}

function testFunc() {
    var res = dati.filter(w =>
        w.b.length >= 2
    );
    console.log(res);
}