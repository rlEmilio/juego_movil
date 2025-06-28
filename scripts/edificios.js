let almacenComprado = false;
let cabanaComprada = false;
let botonAlmacen = document.getElementsByName("boton_almacen")[0];
let cabana = document.getElementsByClassName("cabana")[0];
let granja = document.getElementsByClassName("granja")[0];
let mercado = document.getElementsByClassName("mercado")[0];
let marcador = document.getElementsByClassName("marcador_recursos")[0];
let boton_recoger = document.getElementsByClassName("boton_recoger")[0];
let botonCabana = document.getElementsByName("boton_cabana")[0];

import { guardarMonedas } from "./panel_principal.js";
import { actualizarMarcador } from "./panel_principal.js";

//llamo a funcion para comprar almacen
document.addEventListener("DOMContentLoaded", comprarAlmacen);

//llamo a funcion para comprar cabaña
document.addEventListener("DOMContentLoaded", comprarCabana);

//funcion comprar almacen
function comprarAlmacen() {
  botonAlmacen.addEventListener("click", function () {
    if (!almacenComprado) {
      // traigo monedas   //parseo a int porque se guardan como string
      let monedas = parseInt(localStorage.getItem("monedas"));
      monedas -= 2;
      guardarMonedas(monedas);
      actualizarMarcador();
      alert("Has comprado el almacén!!!");
      almacenComprado = true;
      //muestro estos edificios
      cabana.hidden = false;
      granja.hidden = false;
      mercado.hidden = false;
      marcador.style.zIndex = 1;
      boton_recoger.hidden = false;

      // let texto_monedas = document.querySelector(".texto_monedas p");
      // texto_monedas.innerText = "Monedas: " + monedas;
    } else {
      alert("Ya has comprado este edificio");
    }
  });
}

function comprarCabana() {
  botonCabana.addEventListener("click", function () {
    //traigo piedras y monedas
    let monedas = parseInt(localStorage.getItem("monedas"));
    let piedras = parseInt(localStorage.getItem("piedra"));
    let contador = 1;
    let coste = 6;
    if (cabanaComprada) {
      for (let i = 0; i < contador; i++) {
        coste += 5;
      }
    }

    if (monedas < coste || piedras < coste) {
      alert("No tienes suficientes recursos");
    } else {
      monedas -= coste;
      piedras -= coste;
      guardarMonedas(monedas);
      localStorage.setItem("piedra", piedras);
      let artesanos = parseInt(localStorage.getItem("artesanos"));
      artesanos += 5;

      //actualizar costes de cabaña en interfaz
      localStorage.setItem("artesanos", artesanos);
      let costes = document.querySelectorAll(".cabana .coste span");
      costes.forEach((element) => {
        let texto = parseInt(element.innerText);
        texto += 5;
        element.innerText = texto;
      });

      actualizarMarcador();
      alert("Has comprado una cabaña!!!");
      cabanaComprada = true;
      contador++;
    }
  });
}
