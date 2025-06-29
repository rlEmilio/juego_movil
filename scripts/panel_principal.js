//efecto sonido compra en mercado
const sonidoCompra = new Audio("./sonidos/compra.mp3");
sonidoCompra.preload = "auto";
sonidoCompra.volume = 0.7;

//efecto sonido generar moneda
const sonidoMoneda = new Audio("./sonidos/moneda.mp3");
sonidoMoneda.preload = "auto";
sonidoMoneda.volume = 0.7;

//exporto objeto con estado de sonido que se comparte en tiempo real entre archivos
export const sonido = {
  activado: true
};


let monedas = 20;
let artesanos = 0;
let madera = 20;
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
let pagina_mercado;

export function guardarMonedas(monedas) {
  localStorage.setItem("monedas", monedas);
}

window.onload = function () {
  //pagina de comienzo y animacion
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
  pagina_mercado = document.getElementsByClassName("panel_mercado")[0];
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
  let boton_volver = document.querySelectorAll(".volver img");
  boton_volver.forEach((element) => {
    element.addEventListener("click", function () {
      pagina_edificios.style.zIndex = "-1";
      pagina_mercado.style.zIndex = "-1";
      pagina_principal.style.zIndex = "1";
    });
  });
};

//cada vez que se genera una moneda la carga tarda mas, para ello
//uso un timer
function generarMoneda(boton_alquimia) {
  let caldero = document.querySelector(".caldero img");
  monedas = parseInt(localStorage.getItem("monedas"));
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
    reproducirEfecto(sonidoMoneda);

    caldero.hidden = true;
    // texto_monedas.hidden = false;
    moneda_img.hidden = false;

    //terminar animacion
    moneda.addEventListener("animationend", function () {
      moneda.classList.remove("animacion_moneda");
      moneda_img.hidden = true;
      boton_alquimia.hidden = false;
      actualizarMarcador();
      //hago que aparezca el boton para acceder al panel de edificios si el numero de monedas es igual o mayor a 2
      if (monedas >= 2) {
        edificios.hidden = false;
        edificios.addEventListener("click", function () {
          pagina_edificios.style.zIndex = "1";
          pagina_principal.style.zIndex = "-1";
        });
      }
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

  let tiempo = Math.max(45 - artesanos, 1) * 1000;
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

let boton_mercado = document.getElementsByName("mercado_principal")[0];
boton_mercado.addEventListener("click", function () {
  pagina_principal.style.zIndex = "-1";
  pagina_mercado.style.zIndex = "1";
});

//compras dentro de mercado
let boton_cuero = document.getElementsByName("boton_cuero")[0];
let boton_piedra = document.getElementsByName("boton_piedra")[0];
let boton_madera = document.getElementsByName("boton_madera")[0];

boton_cuero.addEventListener("click", function () {
  let monedas = parseInt(localStorage.getItem("monedas"));
  if (monedas < 3) {
    alert("No tienes suficientes monedas");
  } else {
    let cuero = parseInt(localStorage.getItem("cuero"));
    reproducirEfecto(sonidoCompra);
    cuero++;
    monedas -= 3;
    localStorage.setItem("monedas", monedas);
    localStorage.setItem("cuero", cuero);
    actualizarMarcador();
  }
});

boton_piedra.addEventListener("click", function () {
  let monedas = parseInt(localStorage.getItem("monedas"));
  if (monedas < 1) {
    alert("No tienes suficientes monedas");
  } else {
    let piedra = parseInt(localStorage.getItem("piedra"));
    reproducirEfecto(sonidoCompra);
    piedra++;
    monedas--;
    localStorage.setItem("monedas", monedas);
    localStorage.setItem("piedra", piedra);
    actualizarMarcador();
  }
});

boton_madera.addEventListener("click", function () {
  let monedas = parseInt(localStorage.getItem("monedas"));
  if (monedas < 1) {
    alert("No tienes suficientes monedas");
  } else {
    let madera = parseInt(localStorage.getItem("madera"));
    reproducirEfecto(sonidoCompra);
    madera++;
    monedas--;
    localStorage.setItem("monedas", monedas);
    localStorage.setItem("madera", madera);
    actualizarMarcador();
  }
});

//funcion para controlar musica del juego
const musica = document.getElementById("musica_fondo");
const botonMusica = document.getElementById("boton_musica");

botonMusica.addEventListener("click", () => {
  if (musica.paused) {
    
    musica.play();
    botonMusica.textContent = "🔊";
    sonido.activado = true;
  } else {
    musica.pause();
    botonMusica.textContent = "🔇";
    sonido.activado = false;
  }
});

//funcion reproducir sonido compra
function reproducirEfecto(efecto) {
  if (sonido.activado) {
    efecto.currentTime = 0; // reinicia si ya estaba sonando
    efecto.play();
  }
}
