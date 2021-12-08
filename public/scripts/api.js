const url = 'http://localhost:3000/api/';
const buscarTragoPorNombre = 'tragos?s=';
const obtenerTragoPorId = 'tragos/';
const tragoAleatorio = 'random.php';
const obetenerIngredientePorNombre = 'ingredientes/';

/**
 * Realiza una consulta a la API.
 * @param consulta 
 * @param funcion funcion a ejecutar al obtener un resultado.
 * @param funcionError funcion a ejecutar al obtener un error.
 */
function consultarAPI(consulta, funcion, funcionError) {
    console.log(consulta)
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
    consultarAPI(obetenerIngredientePorNombre + nombre, (datos) => {
        funcion(datos.ingredients[0]);
    }, funcionError);
}