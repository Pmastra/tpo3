const url = 'https://www.thecocktaildb.com/api/json/v1/1/';
const buscarTragoPorNombre = 'search.php?s=';
const obtenerTragoPorId = 'lookup.php?i=';
const tragoAleatorio = 'random.php';
const obetenerIngredientePorId = 'search.php?i=';

/**
 * Realiza una consulta a la API.
 * @param consulta 
 * @param funcion funcion a ejecutar al obtener un resultado.
 * @param funcionError funcion a ejecutar al obtener un error.
 */
function consultarAPI(consulta, funcion, funcionError) {
    fetch(url + consulta)
        .then(resultado => resultado.json())
        .then(datos => {
            funcion(datos);
        })
        .catch(error => {
            funcionError();
        });
}

/**
 * Obtiene de la API un objeto JSON con todos los tragos que coinciden 
 * con el nombre buscado.
 */
function buscarTrago(nombre, funcion, funcionError) {
    consultarAPI(buscarTragoPorNombre + nombre, (datos) => {
        funcion(datos.drinks);
    }, funcionError);
}

/**
 * Obtiene de la API un objeto JSON con el trago buscado por su ID.
 */
function obtenerTrago(idTrago, funcion, funcionError) {
    consultarAPI(obtenerTragoPorId + idTrago, (datos) => {
        funcion(datos.drinks[0]);
    }, funcionError);
}

/**
 * Obtiene de la API un objeto JSON con el ingrediente buscado por su nombre.
 */
function obtenerIngredientePorNombre(nombre, funcion, funcionError) {
    consultarAPI(obetenerIngredientePorId + nombre, (datos) => {
        datos.ingredients[0].image = `https://www.thecocktaildb.com/images/ingredients/${datos.ingredients[0].strIngredient}.png`
        funcion(datos.ingredients[0]);
    }, funcionError);
}
