const busqueda = document.getElementById("buscador");
const divListaTragos = document.getElementById("resultado");

const btnAnterior = document.getElementById("btnAnterior");
const btnSiguiente = document.getElementById("btnSiguiente");

let limite = 10;
let desde = 0;
let cantidadDeTragosActual = 0;

buscarTragos();

busqueda.addEventListener('keyup', function(e) {
    if (e.key == "Enter") {
        buscarTragos();
    }
});

btnAnterior.addEventListener("click", () => {
    desde -= 10;
    if (desde < 0) {
        desde = 0;
    } else {
        limpiarResultados();
        buscarTrago("", desde, limite, mostrarListadoTragos)
    }
});

btnSiguiente.addEventListener("click", () => {
    if (cantidadDeTragosActual == limite) {
        desde += 10;
        limpiarResultados();
        buscarTrago("", desde, limite, mostrarListadoTragos)
    }
});

function limpiarResultados() {
    divListaTragos.innerHTML = "";
}

/**
 * Busca tragos a partir del valor en el input "busqueda" y los muestra en el div "resultado"
 */
function buscarTragos() {
    desde = 0;
    buscarTrago(busqueda.value, desde, limite, mostrarListadoTragos);
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
    console.log(listaTragos)
    if (listaTragos != null) {
        cantidadDeTragosActual = listaTragos.length;
        listaTragos.forEach(trago => {
            contenido += crearItemTrago(trago);
        });
    } else {
        cantidadDeTragosActual = 0;
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