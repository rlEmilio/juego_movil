let monedas = 1;

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
  let barra_progreso = document.querySelector(".barra_progreso progress");
  barra_progreso.hidden = false;
  let intervalo = (monedas*0.25)*100;
  boton_alquimia.disabled = true;
  let terminado = false;
  monedas++;

  let timer = setInterval(() => {
    barra_progreso.value += 10;
    if (barra_progreso.value >= 100) {
      boton_alquimia.disabled = false;
      barra_progreso.hidden = true;
     
      barra_progreso.value = 0;
      console.log(intervalo+"en milisegundos");
      clearInterval(timer);
      terminado=true;
      if(terminado){
        let texto_monedas = document.querySelector(".monedas p");
        texto_monedas.hidden=false;
       
          texto_monedas.innerText= "Número de monedas: "+(monedas-1);
        
       
        
      }
     
    }
  }, intervalo);

 
}
