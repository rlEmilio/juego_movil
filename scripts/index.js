let monedas = 0;

function guardarMonedas() {
  localStorage.setItem('monedas', JSON.stringify(monedas));
}

window.onload = function () {
  let boton_alquimia = document.getElementsByName("alquimia")[0];
  //console.log(boton_alquimia);
  boton_alquimia.addEventListener("click", function () {
    generarMoneda(boton_alquimia);
  });
};

//cada vez que se genera una moneda la carga tarda mas, para ello
//uso un timer
function generarMoneda(boton_alquimia) {
  //traigo referencias
  let caldero = document.querySelector(".caldero img");
  let intervalo = 500 + monedas * 100;
  let texto_monedas = document.querySelector(".texto_monedas p");
  let moneda = document.querySelector(".moneda");
  let moneda_img = document.querySelector(".moneda img");
  let edificios = document.querySelector(".boton_edificios");

  //cambio visibilidades
  caldero.hidden = false;
  boton_alquimia.disabled = true;
  moneda_img.hidden = true;
  texto_monedas.hidden = true;

  monedas++;
  guardarMonedas();
  texto_monedas.innerText = "Número de monedas: " + (monedas);

  //temporizador
  let timer = setTimeout(() => {
    boton_alquimia.disabled = false;
    caldero.hidden = true;
    texto_monedas.hidden = false;
    moneda_img.hidden = false;

    //añadir animacion moneda
    moneda_img.hidden = false;
    moneda.classList.add("animacion_moneda");

    //terminar animacion
    moneda.addEventListener("animationend", function () {
      moneda.classList.remove("animacion_moneda");
      moneda_img.hidden = true;
    });
   
    if(monedas>=2){
      edificios.hidden=false;   
    }
   
  }, intervalo);

 

}


