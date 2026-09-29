'use strict';

const TIENDA = {

    nombre: 'Peladillos Eladio',
    divisa: 'EUR',
    idioma: 'es-ES',
    edadMinima: 16
}

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

//SERVICES[0].name

const EXTRAS = {
    lavado : {
        nombre: 'Lavado gostoso',
        precio: 100
    },
    cejas : {
        nombre: 'Pulido de cejas',
        precio: 3
    },

};

//EXTRAS.lavado.nombre
//EXTRAS['lavado'].nombre
//EXTRAS.lavado["nombre"] 

const DESCUENTO_MIEMBROS = 0.05;
const CODIGO_CUPON = 'ELADIO10';
const CUPON_DESCUENTO = 0.10;

const servicesGrid = document.querySelector('#servicesGrid');
const serviceSelect = document.querySelector('#serviceSelect');
const bookingForm = document.querySelector('#bookingForm');
const ticketContent= document.querySelector('#ticketContent');
const formMessage= document.querySelector('#formMessage');

function formatearPrecio(importe) {

    Intl.NumberFormat

}
