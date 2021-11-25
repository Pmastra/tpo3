const idTrago = obtenerIdTrago();

const tituloTrago = document.getElementById("tituloTrago");
const nombreTrago = document.getElementById("drinkName");
const imagenTrago = document.getElementById("drinkImage");
const instruccionesTrago = document.getElementById("drinkInstructions");
const categoriaTrago = document.getElementById("drinkCategoria");
const tipoTrago = document.getElementById("drinkTipo");
const divListaIngredientes = document.getElementById("listaIngredientes");

obtenerTrago(idTrago, mostrarTrago, mostarErrorTrago);

/**
 * Obtiene el id del trago que se envia por parametro en la url.
 * @returns el id del trago.
 */
function obtenerIdTrago() {
    let params = {};
    var paramstr = window.location.search.substr(1);
    var paramarr = paramstr.split("&");

    for (var i = 0; i < paramarr.length; i++) {
        var tmparr = paramarr[i].split("=");
        params[tmparr[0]] = tmparr[1];
    }

    return params['id'];
}

/**
 * Muesta en la vista la informacion del trago.
 */
function mostrarTrago(trago) {
    tituloTrago.innerHTML += trago.strDrink;
    imagenTrago.src = trago.strDrinkThumb;
    nombreTrago.innerHTML = trago.strDrink;
    categoriaTrago.innerHTML = trago.strCategory;
    tipoTrago.innerHTML = trago.strAlcoholic;
    instruccionesTrago.innerHTML = trago.strInstructions;

    mostarIngredientes(trago);
}

/**
 * Muesta en la vista los ingredientes de un trago.
 */
function mostarIngredientes(trago) {

    // consulta a la api cada ingrediente del trago
    trago.ingredientes.forEach(ingrediente => {
        obtenerIngredientePorNombre(ingrediente,
            mostrarIngrediente,
            mostrarErrorIngrediente);
    });

}

/**
 * Muesta en la vista un ingrediente.
 */
function mostrarIngrediente(ingrediente) {
    divListaIngredientes.innerHTML += crearItemIngrediente(ingrediente);
}

/**
 * Crea un ingrediente para mostrar en la vista.
 * @returns una tarjeta del ingrediente.
 */
function crearItemIngrediente(ingrediente) {
    let content =
        `<div class="card ingrediente" style="width: 8rem;">
        <image src="${ingrediente.image}" class="card-imagenTrago-top">
        <div class="card-body">
            <p class="card-text">${ingrediente.strIngredient}</p>   
        </div>    
    </div>`;
    return content;
}

/**
 * Muestra al usuario un error al obtener un trago.
 */
function mostarErrorTrago(error) {
    imagenTrago.src = "https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Ftechdirectarchive.com%2Fwp-content%2Fuploads%2F2020%2F06%2F1_pUEZd8z__1p-7ICIO1NZFA.png%3Ffit%3D978%252C542%26ssl%3D1&f=1&nofb=1";
    nombreTrago.innerHTML = "Error al cargar bebida";
}

/**
 * Muestra al usuario un error al obtener un ingrediente.
 */
function mostrarErrorIngrediente(error) {
    divListaIngredientes.innerHTML +=
        `<li>
        <div class="card ingrediente" style="width: 8rem;">
            <imagenTrago src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fi1.wp.com%2Ftechdirectarchive.com%2Fwp-content%2Fuploads%2F2020%2F06%2F1_pUEZd8z__1p-7ICIO1NZFA.png%3Ffit%3D978%252C542%26ssl%3D1&f=1&nofb=1" class="card-imagenTrago-top">
            <div class="card-body">
            <p class="card-text">Error al cargar ingrediente</p>
            </div>
        </div>
    </li>`;
}