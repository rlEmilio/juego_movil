
let monedas = 30; 
let artesanos = 0;
let madera = 0;
let trigo = 0;
let piedra = 50;
let caballos = 0;
let cuero = 0;
let pan = 0;

localStorage.setItem("monedas", monedas);
localStorage.setItem("artesanos", artesanos);
localStorage.setItem("madera", madera);
localStorage.setItem("trigo", trigo);
localStorage.setItem("piedra", piedra);
localStorage.setItem("caballos", caballos);
localStorage.setItem("cuero", cuero);
localStorage.setItem("pan", pan);

let pagina_principal;
let pagina_edificios;

export function guardarMonedas(monedas) {
  localStorage.setItem("monedas", monedas);
}

window.onload = function () {
  //referencias a paginas
  let pagina_comienzo = document.getElementsByClassName("panel_comienzo")[0];
  pagina_comienzo.addEventListener("click", () => {
    pagina_comienzo.classList.add("animar");
    pagina_comienzo.addEventListener(
      "animationend",
      () => {
        pagina_comienzo.style.display = "none";
      },
      { once: true }
    );
    musica.play();
  });

  pagina_edificios = document.getElementsByClassName("contenedor_edificios")[0];
  pagina_principal = document.getElementsByClassName("contenedor_principal")[0];
  //boton generar monedas
  let boton_alquimia = document.getElementsByName("alquimia")[0];
  //boton recoger
  let boton_recoger = document.getElementsByName("recoger")[0];

  boton_alquimia.addEventListener("click", function () {
    generarMoneda(boton_alquimia);
  });

  boton_recoger.addEventListener("click", function () {
    recoger(boton_recoger);
  });

  //boton en pagina edificios para volver a la principal
  let boton_volver = document.querySelector(".volver img");
  boton_volver.addEventListener("click", function () {
    pagina_edificios.style.zIndex = "-1";
    pagina_principal.style.zIndex = "1";
  });
};

//cada vez que se genera una moneda la carga tarda mas, para ello
//uso un timer
function generarMoneda(boton_alquimia) {
  //traigo referencias
  let caldero = document.querySelector(".caldero img");
  let intervalo = 500 + monedas * 100;
  // let texto_monedas = document.querySelector(".texto_monedas p");
  let moneda = document.querySelector(".moneda");
  let moneda_img = document.querySelector(".moneda img");
  let edificios = document.querySelector(".boton_edificios");

  //cambio visibilidades
  caldero.hidden = false;
  boton_alquimia.hidden = true;
  moneda_img.hidden = true;
  // texto_monedas.hidden = true;

  monedas = localStorage.getItem("monedas");
  monedas++;
  guardarMonedas(monedas);
  // texto_monedas.innerText =
  //   "Monedas: " + parseInt(localStorage.getItem("monedas"));

  //temporizador
  let timer = setTimeout(() => {
    //añadir animacion moneda
    moneda_img.hidden = false;
    moneda.classList.add("animacion_moneda");

    caldero.hidden = true;
    // texto_monedas.hidden = false;
    moneda_img.hidden = false;

    //terminar animacion
    moneda.addEventListener("animationend", function () {
      moneda.classList.remove("animacion_moneda");
      moneda_img.hidden = true;
      boton_alquimia.hidden = false;
      //hago que aparezca el boton para acceder al panel de edificios si el numero de monedas es igual o mayor a 2
      if (monedas >= 2) {
        edificios.hidden = false;
        edificios.addEventListener("click", function () {
          pagina_edificios.style.zIndex = "1";
          pagina_principal.style.zIndex = "-1";
        });
      }
      actualizarMarcador();
    });
  }, intervalo);
}

//obtengo un numero aleatorio de madera y piedra entre 0 y numero de trabajadores+2
//creo un tiempo de espera hasta que se vuelva a habilitar el boton
function recoger(boton_recoger) {
  artesanos = parseInt(localStorage.getItem("artesanos"));

  madera = parseInt(localStorage.getItem("madera"));
  madera += Math.floor(Math.random() * (artesanos + 3));
  piedra = parseInt(localStorage.getItem("piedra"));
  piedra += Math.floor(Math.random() * (artesanos + 3));
  localStorage.setItem("piedra", piedra);
  localStorage.setItem("madera", madera);

  let tiempo = Math.max ((1 - artesanos),1) * 1000;
  boton_recoger.disabled = true;
  //uso un contador para indicar el tiempo que falta hasta que pueda pulsarse el boton

  let contador = document.getElementsByClassName("contador")[0];
  contador.hidden = false;


  //tiempo hasta activar boton
  let tempo = setTimeout(() => {
    boton_recoger.disabled = false;
      actualizarMarcador();
  }, tiempo + 300);

  //intervalo para contador
  let segundos = tiempo / 1000;
  contador.innerText = "Disponible en: " + segundos;

  let intervalo = setInterval(() => {
    contador.innerText = "Disponible en: " + (segundos - 1);
    segundos--;

    if (segundos == 0) {
      clearInterval(intervalo);
      contador.hidden = true;
    }
  }, 1000);
}

//funcion para actualizar recursos en marcador visual 
export function actualizarMarcador() {
  let recursos = document.querySelectorAll(".tabla_marcador span");
  let monedaMarcador = recursos[0];
  let piedraMarcador = recursos[1];
  let maderaMarcador = recursos[2];
  let trabajadorMarcador = recursos[3];
  let trigoMarcador = recursos[4];
  let cueroMarcador = recursos[5];
  let caballoMarcador = recursos[6];
  let panMarcador = recursos[7];

  monedaMarcador.innerText = parseInt(localStorage.getItem("monedas"));
  piedraMarcador.innerText = parseInt(localStorage.getItem("piedra"));
  maderaMarcador.innerText = parseInt(localStorage.getItem("madera"));
  trabajadorMarcador.innerText = parseInt(localStorage.getItem("artesanos"));
  trigoMarcador.innerText = parseInt(localStorage.getItem("trigo"));
  cueroMarcador.innerText = parseInt(localStorage.getItem("cuero"));
  caballoMarcador.innerText = parseInt(localStorage.getItem("caballos"));
  panMarcador.innerText = parseInt(localStorage.getItem("pan"));
}

//funcion para controlar musica del juego
const musica = document.getElementById("musica_fondo");
const botonMusica = document.getElementById("boton_musica");

botonMusica.addEventListener("click", () => {
  if (musica.paused) {
    musica.play();
    botonMusica.textContent = "🔊";
  } else {
    musica.pause();
    botonMusica.textContent = "🔇";
  }
});
