const imagenes = [
    "../img/hollow.png",
    "../img/hornet.png",
    "../img/sherma.png",
    "../img/zote.png"
];

function fondoHollow(colorBase) {
    return `radial-gradient(circle at top, ${colorBase}, #020617)`;
}

// Cuando el DOM esté listo
$(function () {
    const $contenedor = $("#contenedor");
    const $colorPicker = $("#colorPicker");
    const $btnColor = $("#btnColor");
    const $btnAdd = $("#btnAdd");

    function imagenAleatoria() {
        return imagenes[Math.floor(Math.random() * imagenes.length)];
    }

    function crearElemento() {
        const colorActual = $colorPicker.val();

        const $div = $(`
            <div class="item">
                <img src="${imagenAleatoria()}" width="150">
                <br>
                <button class="cambiar">Cambiar</button>
                <button class="borrar">Borrar</button>
            </div>
        `);

        $div.css("background", fondoHollow(colorActual));

        return $div;
    }

    // Cambiar color
    $btnColor.on("click", function () {
        const nuevoColor = $colorPicker.val();
        $(".item").css("background", fondoHollow(nuevoColor));
    });

    // Añadir elemento 
    $btnAdd.on("click", function () {
        $contenedor.append(crearElemento());
    });

    // Cambiar imagen
    $contenedor.on("click", ".cambiar", function () {
        const $item = $(this).closest(".item");
        const $img = $item.find("img");
        $img.attr("src", imagenAleatoria());
    });

    // Borrar
    $contenedor.on("click", ".borrar", function () {
        $(this).closest(".item").remove();
    });

    // 3 para empezar
    for (let i = 0; i < 3; i++) {
        $contenedor.append(crearElemento());
    }
});
