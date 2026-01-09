$(function () {
    const $panel = $("#panel");
    const $mensaje = $("#mensaje");
    const $resultado = $("#resultado");


    let estado = "inicial";
    let tiempoInicio = null;
    let timeoutId = null;

    function setEstadoVisual(clase) {
        $panel.removeClass("panel-inicial panel-esperando panel-rojo").addClass(clase);
    }

    function mostrarInicial() {
        estado = "inicial";
        setEstadoVisual("panel-inicial");
        $mensaje.text("Haz clic para empezar");
        $resultado.text("");
    }

    function empezarEsperaAleatoria() {
        clearTimeout(timeoutId);
        timeoutId = null;

        estado = "esperando";
        setEstadoVisual("panel-esperando");
        $mensaje.text("Espera a que la pantalla se ponga roja");
        $resultado.text("");

        const delay = Math.floor(Math.random() * 3000) + 1500;

        timeoutId = setTimeout(function () {
            estado = "rojo";
            setEstadoVisual("panel-rojo");
            $mensaje.text("Pulsa ahora");
            $resultado.text("");
            tiempoInicio = performance.now();
        }, delay);
    }

    function mostrarResultado(tiempo) {
        estado = "final";
        setEstadoVisual("panel-inicial");
        $mensaje.text(`Tu tiempo de reacción: ${Math.round(tiempo)} ms`);
        $resultado.text("Haz clic para volver a intentarlo.");
    }

    function mostrarFallo() {
        estado = "fallo";
        clearTimeout(timeoutId);
        timeoutId = null;

        setEstadoVisual("panel-inicial");
        $mensaje.text("Has pulsado antes de tiempo");
        $resultado.text("Haz clic para volver a intentarlo.");
    }

    $panel.on("click", function () {
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
});
