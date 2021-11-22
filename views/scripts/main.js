const busqueda = document.getElementById("buscador");
const divListaTragos = document.getElementById("resultado");

buscarTrago("", mostrarListadoTragos)

busqueda.addEventListener('keyup', function(e) {
    if(e.key == "Enter") {
        buscarTragos();
    }
})

/**
 * Busca tragos a partir del valor en el input "busqueda" y los muestra en el div "resultado"
 */
function buscarTragos() {
    buscarTrago(busqueda.value, mostrarListadoTragos);
}

/**
 * Muestra en la vista el listado de tragos buscados.
 */
function mostrarListadoTragos(listaTragos) {
    divListaTragos.innerHTML = crearListadoTrago(listaTragos);
}

/**
 * Crea un listado de tragos para mostrar en la vista.
 * @returns una lista <ul> con los tragos.
 */
function crearListadoTrago(listaTragos) {
    let contenido = '';
    if (listaTragos != null) {
        listaTragos.forEach(trago => {
            contenido += crearItemTrago(trago);
        });
    } else {
        contenido = crearItemTragoVacio();
    }

    return contenido;
}

/**
 * Crea un item de un trago para mostrar en la vista.
 * @returns una terjeta para mostrar el trago.
 */
function crearItemTrago(trago) {
    let link = `trago.html?id=${trago.idDrink}`;
    let card =
        `<div class="trago card">
            <img src="${trago.strDrinkThumb}" class="card-img-top" id="drinkImage">
            <div class="card-body">
                <a href="${link}" target="_blank" >
                    <h3 class="card-title" id="drinkName">${trago.strDrink}</h3>
                </a>
                <p class="card-text "><strong>Categoria: </strong>
                    <span id="drinkCategoria">${trago.strCategory}</span>
                </p>
                <p class="card-text"><strong>Tipo: </strong>
                    <span id="drinkTipo">${trago.strAlcoholic}</span>
                </p>
            </div>
        </div>`;
    return card;
}

/**
 * Crea un item de un trago vacio para mostrar en la vista, representando que no hay tragos para mostrar.
 * @returns una terjeta para mostrar el trago.
 */
 function crearItemTragoVacio() {
    let img = "res/imgs/trago-vacio.jfif";
    let card =
        `<div class="trago card">
            <img src="${img}" class="card-img-top" id="drinkImage">
            <div class="card-body">
                <h3 class="card-title" id="drinkName">Sin resultados</h3>
                <p class="card-text ">No se encontró ningún trago que coincida con la búsqueda</p>
            </div>
        </div>`;
    return card;
}