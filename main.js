// Mostrar saludo dinámico en la página de inicio
window.addEventListener("DOMContentLoaded", () => {
    const saludo = document.getElementById("saludo");
    if (saludo) {
        const hora = new Date().getHours();
        let mensaje;
        if (hora >= 5 && hora < 12) {
            mensaje = "¡Buenos días!\nGracias por visitarnos.";
        } else if (hora >= 12 && hora < 18) {
            mensaje = "¡Buenas tardes!\nDisfruta tu recorrido por la galería.";
        } else if (hora >= 18 && hora <= 23) {
            mensaje = "¡Buenas noches!\nEsperamos que encuentres inspiración.";
        } else {
            mensaje = "¡Hola noctámbulo!\nBienvenido a nuestra galería 24/7.";
        }
        saludo.textContent = mensaje;
    }

    // Redirección desde botones "Comprar" a la página de contacto
    function redireccionarAContacto() {
        window.location.href = "contacto.html";
    }

    const comprarLouis = document.getElementById("comprarLouis");
    const comprarVicent = document.getElementById("comprarVicent");
    const comprarEdvard = document.getElementById("comprarEdvard");

    if (comprarLouis) comprarLouis.addEventListener("click", redireccionarAContacto);
    if (comprarVicent) comprarVicent.addEventListener("click", redireccionarAContacto);
    if (comprarEdvard) comprarEdvard.addEventListener("click", redireccionarAContacto);

    // Modal interactivo en galería
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalDesc = document.getElementById("modal-desc");
    const span = document.getElementsByClassName("close")[0];

    function abrirModal(src, alt) {
        modal.style.display = "block";
        modalImg.src = src;
        modalDesc.textContent = alt;
    }

    function cerrarModal() {
        modal.style.display = "none";
    }

    if (span) {
        span.onclick = cerrarModal;
    }

    window.onclick = function (event) {
        if (event.target == modal) {
            cerrarModal();
        }
    };
    // Validación del formulario de contacto
    const form = document.getElementById("formulario-contacto");

    if (form) {
        form.addEventListener("submit", function (event) {
            event.preventDefault();

            const nombre = document.getElementById("nombre").value.trim();
            const email = document.getElementById("email").value.trim();
            const mensaje = document.getElementById("mensaje").value.trim();
            const tipo = document.getElementById("tipo");
            const mensajeDiv = document.getElementById("mensaje-confirmacion");

            if (!nombre || !email || !mensaje) {
                mostrarMensaje("Todos los campos son obligatorios.", "error");
                return;
            }

            if (mensaje.toLowerCase().includes("compra")) {
                tipo.value = "compra";
            } else if (mensaje.toLowerCase().includes("venta")) {
                tipo.value = "venta";
            }

            mostrarMensaje("Formulario enviado correctamente.", "exito");
        });
    }

    function mostrarMensaje(texto, tipo) {
        const mensajeDiv = document.getElementById("mensaje-confirmacion");
        mensajeDiv.textContent = texto;
        mensajeDiv.className = tipo;
    }
});
window.addEventListener("DOMContentLoaded", () => {
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modal-img");
const modalDesc = document.getElementById("modal-desc");
const span = document.querySelector(".close");

function abrirModal(src, alt) {
    modal.style.display = "block";
    modalImg.src = src;
    modalDesc.textContent = alt;
}

function cerrarModal() {
    modal.style.display = "none";
}

if (span) {
    span.onclick = cerrarModal;
}

window.onclick = function (e) {
    if (e.target == modal) {
    cerrarModal();
    }
};

  // 👉 Recorre todas las imágenes ya cargadas en el HTML
document.querySelectorAll("#galeria .imagen-container").forEach(div => {
    const img = div.querySelector("img");
    const btn = div.querySelector(".btn-eliminar");

    // Al hacer clic en la imagen, abrir modal
    img.onclick = () => abrirModal(img.src, img.alt);

    // Al hacer clic en "Eliminar", quitar el bloque
    btn.onclick = () => div.remove();
});
});

