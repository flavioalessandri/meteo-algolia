/**
 * First we will load all of this project's JavaScript dependencies which
 * includes Vue and other libraries. It is a great starting point when
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');

window.Vue = require('vue');

window.$ = require('jquery');

import { algoliaSearch } from './search.js';

import { getLatLong } from './search.js';

import { getLatLongLocation } from './search.js';

import { getWeatherForecast } from './search.js';

import { printResults } from './search.js';


function init() {
    algoliaSearch();
}


// -------------------------------- funzione non utilizzata

// function init2() {

//     algoliaSearch2();    


//     $('#findPlace').on('click',function (){

//         $('#carousel-target').html('');
    
//         var address = $('#address-input').val();

//         getLatLongLocation2(address)
//         .then(getWeatherForecast2)
//         .catch(console.log)
//         .then(printResults2)
//         .catch(console.log);
    
//     }); 
// }



$(document).ready(init);


// Vue.component('example-component', require('./components/ExampleComponent.vue').default);


// const app = new Vue({
//     el: '#app',
// });


