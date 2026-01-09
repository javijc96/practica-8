const panel = document.getElementById("panel");
const mensaje = document.getElementById("mensaje");
const resultado = document.getElementById("resultado");


let estado = "inicial";
let tiempoInicio = null;
let timeoutId = null;

function setEstadoVisual(clase) {
  panel.classList.remove("panel-inicial", "panel-esperando", "panel-rojo");
  panel.classList.add(clase);
}

function mostrarInicial() {
  estado = "inicial";
  setEstadoVisual("panel-inicial");
  mensaje.textContent = "Haz clic para empezar";
  resultado.textContent = "";
}

function empezarEsperaAleatoria() {
  clearTimeout(timeoutId);
  timeoutId = null;

  estado = "esperando";
  setEstadoVisual("panel-esperando");
  mensaje.textContent = "Espera a que la pantalla se ponga ROJA...";
  resultado.textContent = "";

  const delay = Math.floor(Math.random() * 3000) + 1500;

  timeoutId = setTimeout(() => {
    estado = "rojo";
    setEstadoVisual("panel-rojo");
    mensaje.textContent = "Pulsa ahora";
    resultado.textContent = "";
    tiempoInicio = performance.now();
  }, delay);
}

function mostrarResultado(tiempo) {
  estado = "final";
  setEstadoVisual("panel-inicial");
  mensaje.textContent = `Tu tiempo de reacción: ${Math.round(tiempo)} ms`;
  resultado.textContent = "Haz clic para volver a intentarlo.";
}

function mostrarFallo() {
  estado = "fallo";
  clearTimeout(timeoutId);
  timeoutId = null;
  setEstadoVisual("panel-inicial");
  mensaje.textContent = "¡Has pulsado antes de tiempo!";
  resultado.textContent = "Haz clic para volver a intentarlo.";
}

panel.addEventListener("click", () => {
  console.log("click, estado:", estado);

  if (estado === "inicial" || estado === "final" || estado === "fallo") {
    empezarEsperaAleatoria();
  } else if (estado === "esperando") {
    mostrarFallo();
  } else if (estado === "rojo") {
    const tiempoFin = performance.now();
    const reaccion = tiempoFin - tiempoInicio;
    mostrarResultado(reaccion);
  }
});

mostrarInicial();
