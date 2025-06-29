let almacenComprado = false;
let cabanaComprada = false;
let granjaComprada = false;
let mercadoComprado = false;
let botonAlmacen = document.getElementsByName("boton_almacen")[0];
let cabana = document.getElementsByClassName("cabana")[0];
let granja = document.getElementsByClassName("granja")[0];
let mercado = document.getElementsByClassName("mercado")[0];
let establos = document.getElementsByClassName("establos")[0];
let marcador = document.getElementsByClassName("marcador_recursos")[0];
let botonRecoger = document.getElementsByClassName("boton_recoger")[0];
let botonCabana = document.getElementsByName("boton_cabana")[0];
let botonGranja = document.getElementsByName("boton_granja")[0];
let botonMercado = document.getElementsByName("boton_mercado")[0];



import { guardarMonedas } from "./panel_principal.js";
import { actualizarMarcador } from "./panel_principal.js";
import { sonido } from './panel_principal.js';

//efecto sonido compra de edificios
const sonidoMejora = new Audio("./sonidos/mejora.mp3");
sonidoMejora.preload = "auto";
sonidoMejora.volume = 0.7;


//llamo a funcion para comprar almacen
document.addEventListener("DOMContentLoaded", comprarAlmacen);

//llamo a funcion para comprar cabaña
document.addEventListener("DOMContentLoaded", comprarCabana);

//llamo a funcion para comprar granja
document.addEventListener("DOMContentLoaded", comprarGranja);

//llamo a funcion para comprar mercado
document.addEventListener("DOMContentLoaded", comprarMercado);

//funcion comprar almacen
function comprarAlmacen() {
  botonAlmacen.addEventListener("click", function () {
    if (!almacenComprado) {
      // traigo monedas   //parseo a int porque se guardan como string
      let monedas = parseInt(localStorage.getItem("monedas"));
      monedas -= 2;
      guardarMonedas(monedas);
      actualizarMarcador();
      reproducirEfectoCompra();
      alert("Has comprado el almacén!!!");
      almacenComprado = true;
      //muestro estos edificios
      cabana.hidden = false;
      granja.hidden = false;
      mercado.hidden = false;
      marcador.style.zIndex = 1;
      botonRecoger.hidden = false;

      // let texto_monedas = document.querySelector(".texto_monedas p");
      // texto_monedas.innerText = "Monedas: " + monedas;
    } else {
      alert("Ya has comprado este edificio");
    }
  });
}

//funcion comprar cabaña
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
      let costes = document.querySelectorAll(".cabana .coste span span");
      costes.forEach((element) => {
        let texto = parseInt(element.innerText);
        texto += 5;
        element.innerText = texto;
      });

      actualizarMarcador();
      reproducirEfectoCompra();
      alert("Has comprado una cabaña!!!");
      cabanaComprada = true;
      contador++;
    }
  });
}

//funcion comprar granja
function comprarGranja() {
  botonGranja.addEventListener("click", function () {
    if (!granjaComprada) {
      //traigo recursos
      let monedas = parseInt(localStorage.getItem("monedas"));
      let piedras = parseInt(localStorage.getItem("piedra"));
      let madera = parseInt(localStorage.getItem("madera"));

      if (monedas < 8 || piedras < 9 || madera < 5) {
        alert("No tienes suficientes recursos");
      } else {
        monedas -= 8;
        piedras -= 9;
        madera -= 5;

        //la granja proporciona uno de trigo cada 20 segundos
        let trigo = parseInt(localStorage.getItem("trigo"));
        let temporizador = setInterval(() => {
          trigo++;
          localStorage.setItem("trigo", trigo);
          actualizarMarcador();
        }, 20000);

        guardarMonedas(monedas);
        localStorage.setItem("piedra", piedras);
        localStorage.setItem("madera", madera);
        reproducirEfectoCompra();
        alert("Has comprado una granja!!!");
        actualizarMarcador();
        granjaComprada = true;

        //muestro establos
        establos.hidden = false;
      }
    } else {
      alert("Ya has comprado la granja!");
    }
  });
}

//funcion comprar mercado
function comprarMercado() {
  botonMercado.addEventListener("click", function () {
    if (!mercadoComprado) {
      let piedras = parseInt(localStorage.getItem("piedra"));
      let madera = parseInt(localStorage.getItem("madera"));

      if (piedras < 8 || madera < 9) {
        alert("No tienes suficientes recursos");
      } else {
        piedras -= 8;
        madera -= 9;
        localStorage.setItem("piedra", piedras);
        localStorage.setItem("madera", madera);
        reproducirEfectoCompra();
        alert("Has comprado el mercado!!!");
        actualizarMarcador();
        mercadoComprado = true;
        let boton_mercado_principal = document.getElementsByClassName(
          "boton_mercado_principal"
        )[0];
        boton_mercado_principal.hidden = false;

      }
    } else {
      alert("Ya has comprado el mercado");
    }
  });
}

function reproducirEfectoCompra() {
   if (sonido.activado) {
    sonidoMejora.currentTime = 0;
    sonidoMejora.play();
  }
}