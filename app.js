'use strict';

/*
|--------------------------------------------------------------------------
| PELADILLOS ELADIO - RESERVA DE SERVICIOS
|--------------------------------------------------------------------------
|
| Este archivo JavaScript contiene la lógica de una pequeña aplicación
| para gestionar servicios de una peluquería/barbería.
|
| En este código vamos a trabajar varios conceptos fundamentales de
| JavaScript:
|
|   1. Modo estricto: 'use strict'
|   2. Constantes y objetos
|   3. Arrays de objetos
|   4. Acceso a propiedades de objetos
|   5. Selección de elementos del DOM
|   6. Funciones
|   7. Intl.NumberFormat para formatear dinero
|   8. Escape de caracteres HTML
|   9. Métodos de arrays como find()
|  10. Funciones flecha
|  11. Bucles for...of
|  12. Template literals (plantillas de texto con ` `)
|  13. Generación dinámica de HTML
|
|
| IDEA GENERAL DE LA APLICACIÓN
| --------------------------------
|
| Tenemos unos DATOS en JavaScript:
|
|     TIENDA
|     SERVICIOS
|     EXTRAS
|     DESCUENTOS
|
|              |
|              v
|
| JavaScript utiliza esos datos
|
|              |
|              v
|
| Las funciones procesan la información
|
|     formatMoney()
|     escapeHtml()
|     buscarServicio()
|     renderizarServicios()
|
|              |
|              v
|
| JavaScript puede generar/modificar HTML
|
|              |
|              v
|
| El usuario ve el resultado en el navegador.
|
|--------------------------------------------------------------------------
*/


/*
|--------------------------------------------------------------------------
| 1. MODO ESTRICTO
|--------------------------------------------------------------------------
|
| 'use strict' activa el modo estricto de JavaScript.
|
| Hace que JavaScript sea menos permisivo con determinados errores.
|
| Por ejemplo, sin modo estricto podríamos cometer accidentalmente
| ciertos errores que JavaScript intentaría tolerar.
|
| Es recomendable utilizarlo para detectar errores más fácilmente
| y escribir código más controlado.
|
*/

'use strict';


/*
|--------------------------------------------------------------------------
| 2. DATOS GENERALES DE LA TIENDA
|--------------------------------------------------------------------------
|
| Creamos una constante llamada TIENDA.
|
| Su valor es un OBJETO.
|
| Un objeto permite agrupar varios datos relacionados utilizando
| propiedades:
|
|     propiedad: valor
|
| En este caso:
|
|     nombre
|     divisa
|     idioma
|     edadMinima
|
| Podemos acceder a sus propiedades utilizando el punto:
|
|     TIENDA.nombre
|     TIENDA.divisa
|     TIENDA.idioma
|
| Ejemplo:
|
|     console.log(TIENDA.nombre);
|
| mostraría:
|
|     Peladillos Eladio
|
| IMPORTANTE:
|
| const significa que no podemos reasignar TIENDA:
|
|     TIENDA = otroObjeto;   // ERROR
|
| Pero las propiedades internas del objeto sí podrían modificarse.
|
*/

const TIENDA = {
    nombre: 'Peladillos Eladio',
    divisa: 'EUR',
    idioma: 'es-ES',
    edadMinima: 16
};


/*
|--------------------------------------------------------------------------
| 3. ARRAY DE SERVICIOS
|--------------------------------------------------------------------------
|
| SERVICIOS es un ARRAY.
|
| Los corchetes [] indican que estamos creando un array:
|
|     const SERVICIOS = [ ... ];
|
| Cada elemento del array es, a su vez, un OBJETO.
|
| Por tanto tenemos:
|
|     ARRAY
|       |
|       +-- OBJETO servicio 1
|       +-- OBJETO servicio 2
|       +-- OBJETO servicio 3
|
| Cada servicio tiene:
|
|     id        -> identificador del servicio
|     name      -> nombre que verá el usuario
|     precio    -> precio del servicio
|     duracion  -> duración en minutos
|
*/

const SERVICIOS = [

    {
        id: 'clasico',
        name: 'Corte clásico',
        precio: 12,
        duracion: 25,
    },

    {
        id: 'Tupper fade',
        name: 'Corte fade',
        precio: 15,
        duracion: 35,
    },

    {
        id: 'Brocoli',
        name: 'Corte brocoli',
        precio: 20,
        duracion: 15,
    },

];


/*
|--------------------------------------------------------------------------
| ACCEDER A UN ELEMENTO DEL ARRAY
|--------------------------------------------------------------------------
|
| Los arrays comienzan en la posición 0.
|
| Por tanto:
|
|     SERVICIOS[0]
|
| obtiene el primer objeto.
|
| Y:
|
|     SERVICIOS[0].name
|
| obtiene la propiedad "name" del primer servicio.
|
| Ejemplo:
|
|     SERVICIOS[0].name
|
| resultado:
|
|     "Corte clásico"
|
*/

// SERVICIOS[0].name


/*
|--------------------------------------------------------------------------
| 4. OBJETO DE EXTRAS
|--------------------------------------------------------------------------
|
| EXTRAS también es un objeto.
|
| Pero aquí tenemos objetos dentro de otro objeto:
|
|     EXTRAS
|       |
|       +-- lavado
|       |     |
|       |     +-- nombre
|       |     +-- precio
|       |
|       +-- cejas
|             |
|             +-- nombre
|             +-- precio
|
| Para obtener el nombre del lavado podemos utilizar:
|
|     EXTRAS.lavado.nombre
|
| JavaScript también permite acceder a propiedades utilizando []:
|
|     EXTRAS['lavado'].nombre
|
| Incluso podemos combinar ambas formas:
|
|     EXTRAS.lavado["nombre"]
|
| Las tres expresiones acceden al mismo dato.
|
*/

const EXTRAS = {

    lavado: {
        nombre: 'Lavado gostoso',
        precio: 100
    },

    cejas: {
        nombre: 'Pulido de cejas',
        precio: 3
    },

};


// Diferentes formas de acceder a las propiedades:

// EXTRAS.lavado.nombre
// EXTRAS['lavado'].nombre
// EXTRAS.lavado["nombre"]


/*
|--------------------------------------------------------------------------
| 5. CONSTANTES DE DESCUENTOS
|--------------------------------------------------------------------------
|
| Guardamos valores que utilizaremos posteriormente para realizar
| cálculos.
|
| 0.05 representa un 5 %:
|
|     5 / 100 = 0.05
|
| 0.10 representa un 10 %:
|
|     10 / 100 = 0.10
|
| Al utilizar constantes evitamos escribir directamente números
| "mágicos" en diferentes lugares del programa.
|
| Es mucho más comprensible escribir:
|
|     DESCUENTO_MIEMBROS
|
| que encontrar simplemente:
|
|     0.05
|
| sin saber qué representa.
|
*/

const DESCUENTO_MIEMBROS = 0.05;

const CODIGO_CUPON = 'ELADIO10';

const CUPON_DESCUENTO = 0.10;


/*
|--------------------------------------------------------------------------
| 6. OBTENEMOS ELEMENTOS DEL HTML (DOM)
|--------------------------------------------------------------------------
|
| document representa el documento HTML cargado en el navegador.
|
| querySelector() permite buscar un elemento dentro de ese documento.
|
| Cuando escribimos:
|
|     document.querySelector('#servicesGrid')
|
| estamos buscando el elemento cuyo atributo id sea:
|
|     id="servicesGrid"
|
| El símbolo # significa que estamos buscando por ID.
|
| Una vez encontrado, guardamos el elemento en una constante para
| poder utilizarlo posteriormente desde JavaScript.
|
| Es decir:
|
|     HTML
|      |
|      v
| document.querySelector(...)
|      |
|      v
| constante JavaScript
|
*/

const servicesGrid = document.querySelector('#servicesGrid');

const serviceSelect = document.querySelector('#serviceSelect');

const bookingForm = document.querySelector('#bookingForm');

const ticketContent = document.querySelector('#ticketContent');

const formMessage = document.querySelector('#formMessage');


/*
|--------------------------------------------------------------------------
| 7. FUNCIÓN formatMoney()
|--------------------------------------------------------------------------
|
| Esta función recibe un número y devuelve ese número formateado
| como una cantidad monetaria.
|
| Ejemplo:
|
|     formatMoney(10)
|
| podría devolver:
|
|     "10,00 €"
|
| dependiendo del idioma y la divisa configurados.
|
| La función recibe:
|
|     importe
|
| y devuelve un STRING.
|
*/

function formatMoney(importe) {

    /*
     * Intl.NumberFormat es una herramienta incluida en JavaScript
     * para dar formato a números.
     *
     * Creamos un objeto "formatter".
     *
     * TIENDA.idioma contiene:
     *
     *     'es-ES'
     *
     * Esto indica que queremos utilizar el formato habitual de España.
     *
     * Después indicamos:
     *
     *     style: 'currency'
     *
     * para decir que queremos mostrar una moneda.
     *
     * Y:
     *
     *     currency: TIENDA.divisa
     *
     * utiliza:
     *
     *     'EUR'
     */

    const formatter = new Intl.NumberFormat(
        TIENDA.idioma,
        {
            style: 'currency',
            currency: TIENDA.divisa
        }
    );

    /*
     * format() transforma el número al formato correspondiente.
     *
     * Por ejemplo:
     *
     *     formatter.format(10)
     *
     * puede producir:
     *
     *     "10,00 €"
     *
     * return devuelve ese resultado al lugar desde el que se llamó
     * a la función.
     */

    return formatter.format(importe);
}


/*
|--------------------------------------------------------------------------
| 8. FUNCIÓN escapeHtml()
|--------------------------------------------------------------------------
|
| Esta función recibe un valor y prepara determinados caracteres
| especiales para poder mostrarlos como texto dentro de HTML.
|
| Primero utilizamos:
|
|     String(value)
|
| para convertir el valor recibido a una cadena.
|
| Después utilizamos replaceAll() para sustituir caracteres especiales
| por entidades HTML.
|
| Por ejemplo:
|
|     <   ->   &lt;
|     >   ->   &gt;
|     &   ->   &amp;
|
| Esto es importante cuando vamos a insertar texto dentro de HTML.
|
| Por ejemplo, queremos que:
|
|     <h1>Hola</h1>
|
| pueda mostrarse como texto y no sea interpretado como etiquetas HTML.
|
| IMPORTANTE:
|
| Reemplazamos & PRIMERO.
|
| Las entidades HTML que generamos posteriormente también contienen &:
|
|     &lt;
|     &gt;
|     &quot;
|
| Si reemplazáramos & al final podríamos volver a modificar las
| entidades que acabamos de crear.
|
*/

function escapeHtml(value) {

    return String(value)

        // & se convierte en &amp;
        .replaceAll('&', '&amp;')

        // < se convierte en &lt;
        .replaceAll('<', '&lt;')

        // > se convierte en &gt;
        .replaceAll('>', '&gt;')

        // " se convierte en &quot;
        .replaceAll('"', '&quot;')

        // ' se convierte en &#039;
        .replaceAll("'", '&#039;');

}


/*
|--------------------------------------------------------------------------
| 9. FUNCIÓN buscarServicio()
|--------------------------------------------------------------------------
|
| Esta función recibe el ID de un servicio:
|
|     buscarServicio('clasico')
|
| y busca dentro del array SERVICIOS.
|
| Para realizar la búsqueda utilizamos:
|
|     find()
|
| find() recorre el array buscando un elemento que cumpla una condición.
|
| En cuanto encuentra uno que cumple la condición, lo devuelve.
|
*/

function buscarServicio(id) {

    return SERVICIOS.find(

        /*
         * "servicio" representa temporalmente cada objeto del array.
         *
         * Esta función flecha:
         *
         *     (servicio) => servicio.id === id
         *
         * pregunta:
         *
         *     ¿el ID de este servicio es igual al ID que estoy buscando?
         *
         * Por ejemplo:
         *
         *     servicio.id === 'clasico'
         *
         * Si devuelve true, find() ha encontrado el servicio.
         */

        (servicio) => servicio.id === id

    );

}


/*
|--------------------------------------------------------------------------
| 10. FUNCIÓN renderizarServicios()
|--------------------------------------------------------------------------
|
| Esta función se encargará de recorrer los servicios disponibles
| y construir HTML dinámicamente.
|
| Es decir:
|
|     SERVICIOS
|         |
|         v
|     for...of
|         |
|         v
|   cada servicio
|         |
|         v
| generamos HTML
|         |
|         v
|   tarjetas HTML
|
*/

function renderizarServicios() {

    /*
     * Creamos inicialmente dos cadenas vacías.
     *
     * En ellas iremos acumulando HTML.
     *
     * cardsHtml:
     *     almacenará las tarjetas de los servicios.
     *
     * optionHtml:
     *     podrá utilizarse posteriormente para generar opciones
     *     de un <select>.
     */

    let cardsHtml = '';
    let optionHtml = '';


    /*
     * for...of permite recorrer los elementos de un array.
     *
     * SERVICIOS contiene varios objetos.
     *
     * En cada vuelta del bucle:
     *
     *     servicio
     *
     * contiene UNO de esos objetos.
     *
     * Primera vuelta:
     *
     *     servicio = {
     *         id: 'clasico',
     *         name: 'Corte clásico',
     *         precio: 12,
     *         duracion: 25
     *     }
     *
     * Segunda vuelta:
     *
     *     servicio = {
     *         ...
     *     }
     *
     * Y así sucesivamente.
     */

    for (const servicio of SERVICIOS) {

        /*
         * += significa:
         *
         *     "añade esto a lo que ya había".
         *
         * Por tanto NO sustituimos cardsHtml.
         *
         * Vamos acumulando una tarjeta detrás de otra.
         *
         *
         * Utilizamos TEMPLATE LITERALS:
         *
         *     ` ... `
         *
         * Las comillas invertidas permiten escribir texto en varias
         * líneas e introducir expresiones JavaScript mediante:
         *
         *     ${ ... }
         *
         * Por ejemplo:
         *
         *     ${servicio.name}
         *
         * introduce el nombre del servicio dentro del HTML.
         */

        cardsHtml += `
          <article class="article">

              <h3>${servicio.name}</h3>

              <p>${servicio.duracion} min</p>

              <span class="price">
                  ${formatMoney(servicio.precio)}
              </span>

          </article>
        `;

    }

}