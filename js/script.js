
let arrayMeteoritos =[];
let map;
//iniciamos el mapa al momento de cargar la página
window.onload = function() {
	map = L.map('map').setView([41.387917, 2.169917], 13); //coordenadas de Barcelona
	L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	}).addTo(map);
  };

fetch("js/data/earthMeteorites.json")
.then((response) => response.json())
.then((data) => {
	dades = data;		
	dades.forEach( element => {
		meteorit = {
			id:element.id,
			name:element.name,
			mass:(element.mass != null)?element.mass :"0",
			recclass:element.recclass,
            geolocalizacion : (element.geolocation && element.geolocation.coordinates)? element.geolocation.coordinates:null
		}
		arrayMeteoritos.push(meteorit);
	});
    printList(arrayMeteoritos)

});

//Funcion que printa la tabla por pantalla
function printList(array){
	//let tableName = document.getElementById("tablas").value;
	let headers = Object.keys(array[0]); //recuperamos las keys de los objetos para poner en los encabezados

	let tabla = `<table id="myTablaMetereo" border=1>`;
    // Encabezados de la tabla
    tabla += "<tr>";
    for (let i = 0; i < headers.length ; i++) {
			tabla += `<td>${headers[i]}</td>`;
    }

	//contenido de la tabla
   for (var i = 0; i < array.length; i++) {
		tabla += `<tr >`;
        for(let j = 0; j < headers.length; j++){
			tabla += `<td >`;
			if(headers[j] == "id"){
				tabla += `<p id="${array[i][headers[j]]}">${array[i][headers[j]]}</p>`;
			}else if( headers[j] == "geolocalizacion"){
				tabla += `<button onClick="myGeolocalizacion('${array[i][headers[j]]}')">view map</button>`;
			} else{
				tabla += `<p>${array[i][headers[j]]}</p>`;
            	tabla += "</td>";
			}
        }
        tabla +=`</tr>`
   }
   tabla += "</table>"
    document.getElementById('tablasmix').innerHTML = tabla;
}

//funcion que recibe las coordinadass y actualiza el pointer en el mapa inicializado el mapa previamente
function myGeolocalizacion(element){
	let array = element.split(',')
	let longitud= array[0];
	let latitud= array[1];
	map.setView([latitud, longitud], 13); 
	var marker = L.marker([latitud, longitud]).addTo(map); 
}

