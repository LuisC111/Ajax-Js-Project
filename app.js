
function mostrarSugerencia(selectPais) {

    let paisElegido = "";
    let xmlhttp;

    if (selectPais == "espania") {
        paisElegido = "España";
        informacionLink = "";
    } else if (selectPais == "mexico") {
        paisElegido = "México";
    } else if (selectPais == "argentina") {
        paisElegido = "Argentina";
    } else if (selectPais == "colombia") {
        paisElegido = "Colombia";
    } else {
        paisElegido = "nada"
    }



    if (selectPais.length == 0 || paisElegido == "nada") {
        document.getElementById("txtInformacion").innerHTML = "No hay selección";
        document.getElementById("txtInformacionPais").innerHTML = "Elija uno de los 4 paises";
        mostrarCiudades();
        return;
    }

    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var jsonResponse = xmlhttp.responseText;
            var objetoJSON = JSON.parse(jsonResponse);
            paisesRecibidos = objetoJSON.listadoPaises.pais;

            for (var i = 0; i < paisesRecibidos.length; i++) {
                var nombrePais = objetoJSON.listadoPaises.pais[i].nombre;
                var informacionPais = objetoJSON.listadoPaises.pais[i].textoCapital;
                if (nombrePais == paisElegido) {
                    document.getElementById("txtInformacion").innerHTML = "El pais Recibido es " + nombrePais + " y tiene indice " + i;
                    document.getElementById("txtInformacionPais").innerHTML = informacionPais;
                    var ciudadesPais = objetoJSON.listadoPaises.pais[i].ciudadImportante;
                    mostrarCiudades(ciudadesPais);
                }
            }
        }
    }

    xmlhttp.open("GET", "listadoPaises.json?nocache='+(newDate()).getTime()")
    xmlhttp.send();


}



function mostrarCiudades(arrayCiudades) {
    var nodoMostrarResultados = document.getElementById("listaCiudades");
    if (!arrayCiudades) {
        nodoMostrarResultados.innerHTML = "";
        return;
    }

    var contenidoAMostrar = "";
    for (var i = 0; i < arrayCiudades.length; i++) {
        contenidoAMostrar = contenidoAMostrar + '<div style="display: inline-block; margin-right: 6px; margin-top: 4px; text-align: center; font-size: 20px; text-decoration: none;" id="ciudad' + i + '">';
        contenidoAMostrar += `<button value="${arrayCiudades[i]}" onclick="mostrarPlato(this.value)" class="glow-on-hover button" data-bs-toggle="modal" data-bs-target="#platos">${arrayCiudades[i]}  </button></a></div>`;
        //contenidoAMostrar += `< style="text-decoration: none; color: white;" href="https://es.wikipedia.org/wiki/${arrayCiudades[i]}" target="_blank"> <button value="${arrayCiudades[i]}" onclick="mostrarPlato(this.value)" class="glow-on-hover button" data-bs-toggle="modal" data-bs-target="#platos">${arrayCiudades[i]}  </button></div>`;
    }
    if (contenidoAMostrar) {
        nodoMostrarResultados.innerHTML = contenidoAMostrar;

    }
}


function mostrarPlato(ciudad) {
    let name = document.getElementById("platoCiudad");
    name.innerHTML = `Plato típico de ${ciudad}`;
    let baseURL = "https://es.wikipedia.org/wiki/";
    document.getElementById('enlace').setAttribute('href', baseURL + ciudad);
    //document.getElementById('img1').src = "./img/madrid.jpg";

    let xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            var jsonResponse = xmlhttp.responseText;
            var objetoJSON = JSON.parse(jsonResponse);
            var platosRecibidos = objetoJSON.listadoPlatos.ciudad;
            var contenidoAMostrar = "";
            for (var i = 0; i < platosRecibidos.length; i++) {
                var nombreCiudad = objetoJSON.listadoPlatos.ciudad[i].nombre;
                let nombrePlato = objetoJSON.listadoPlatos.ciudad[i].plato; 
                var imgPlato = objetoJSON.listadoPlatos.ciudad[i].img;
                if (nombreCiudad == ciudad) {
                document.getElementById("nombrePlato").innerHTML = nombrePlato;
                document.getElementById('img1').src = imgPlato;
            }
            }
           
            
        }
    }
    xmlhttp.open("GET", "listadoPlatos.json?nocache='+(newDate()).getTime()")
    xmlhttp.send();
}



