const imagenes = [
    "../img/hollow.png",
    "../img/hornet.png",
    "../img/sherma.png",
    "../img/zote.png"
];

const contenedor = document.getElementById("contenedor");
const colorPicker = document.getElementById("colorPicker");
const btnColor = document.getElementById("btnColor");
const btnAdd = document.getElementById("btnAdd");

function fondoHollow(colorBase) {
    return `radial-gradient(circle at top, ${colorBase}, #020617)`;
}

function imagenAleatoria() {
    return imagenes[Math.floor(Math.random() * imagenes.length)];
}

function crearElemento() {
    const div = document.createElement("div");
    div.className = "item";
    div.style.background = fondoHollow(colorPicker.value);

    div.innerHTML =
        `<img src="${imagenAleatoria()}" width="150">
        <br>
        <button class="cambiar">Cambiar</button>
        <button class="borrar">Borrar</button>`;

    div.querySelector(".cambiar").addEventListener("click", () => {
        div.querySelector("img").src = imagenAleatoria();
    });

    div.querySelector(".borrar").addEventListener("click", () => {
        div.remove();
    });

    return div;
}

btnColor.addEventListener("click", () => {
    const nuevoColor = colorPicker.value;
    document.querySelectorAll(".item").forEach(item => {
        item.style.background = fondoHollow(nuevoColor); // aquí también
    });
});

btnAdd.addEventListener("click", () => {
    contenedor.appendChild(crearElemento());
});
for (let i = 0; i < 3; i++) {
    contenedor.appendChild(crearElemento());
}
