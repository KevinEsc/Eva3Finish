document.addEventListener("DOMContentLoaded", () => {
    // ------------------------------
    // SALUDO DINÁMICO EN INICIO
    // ------------------------------
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

    // ------------------------------
    // REDIRECCIÓN DE BOTONES "COMPRAR"
    // ------------------------------
    function redireccionarAContacto() {
        window.location.href = "contacto.html";
    }

    ["comprarLouis", "comprarVicent", "comprarEdvard"].forEach(id => {
        const boton = document.getElementById(id);
        if (boton) {
            boton.addEventListener("click", redireccionarAContacto);
        }
    });

    // ------------------------------
    // FUNCIONALIDAD MODAL EN GALERÍA
    // ------------------------------
    const modal = document.getElementById("modal");
    const modalImg = document.getElementById("modal-img");
    const modalDesc = document.getElementById("modal-desc");
    const closeBtn = document.querySelector(".close");

    function abrirModal(src, alt) {
        if (modal && modalImg && modalDesc) {
            modal.style.display = "block";
            modalImg.src = src;
            modalDesc.textContent = alt;
        }
    }

    function cerrarModal() {
        if (modal) modal.style.display = "none";
    }

    if (closeBtn) {
        closeBtn.onclick = cerrarModal;
    }

    window.onclick = function (e) {
        if (e.target === modal) cerrarModal();
    };

    // ------------------------------
    // GALERÍA - ELIMINAR IMAGEN
    // ------------------------------
    document.querySelectorAll("#galeria .imagen-container").forEach(div => {
        const img = div.querySelector("img");
        const btn = div.querySelector(".btn-eliminar");

        if (img) {
            img.onclick = () => abrirModal(img.src, img.alt);
        }

        if (btn) {
            btn.onclick = () => div.remove();
        }
    });

    // ------------------------------
    // FORMULARIO DE CONTACTO
    // ------------------------------
    const form = document.getElementById("formulario-contacto");
    const nombre = document.getElementById("nombre");
    const apellido = document.getElementById("apellido");
    const correo = document.getElementById("correo");
    const comentario = document.getElementById("comentario");
    const tipo = document.getElementById("tipo");
    const mensajeDiv = document.getElementById("mensaje-confirmacion");

    function mostrarMensaje(texto, tipo) {
        if (mensajeDiv) {
            mensajeDiv.textContent = texto;
            mensajeDiv.style.color = tipo === "error" ? "red" : "green";
            setTimeout(() => {
                mensajeDiv.textContent = "";
            }, 4000);
        }
    }
    
    // Validación de email sin regex susceptible a backtracking
    function isValidEmail(email) {
        if (!email) return false;
        // límites razonables para evitar evaluaciones costosas
        if (email.length > 254) return false;
        if (email.indexOf(' ') !== -1) return false;
        const parts = email.split('@');
        if (parts.length !== 2) return false;
        const [local, domain] = parts;
        if (local.length === 0 || local.length > 64) return false;
        if (domain.length === 0 || domain.length > 255) return false;
        if (domain.indexOf('.') === -1) return false;
        // Validaciones simples por parte para evitar expresiones regulares complejas
        const localSafe = /^[A-Za-z0-9.!#$%&'*+\/=\?^_`{|}~-]+$/;
        const domainSafe = /^[A-Za-z0-9.-]+$/;
        if (!localSafe.test(local) || !domainSafe.test(domain)) return false;
        const domainParts = domain.split('.');
        if (domainParts.some(p => p.length === 0)) return false;
        const tld = domainParts[domainParts.length - 1];
        if (tld.length < 2) return false;
        return true;
    }
    if (tipo) {
        tipo.selectedIndex = 0;
    }
    // Bandera para bloquear la detección automática una vez que se haya establecido
    let autoDetectLocked = false;
    if (tipo) {
        tipo.addEventListener('change', () => {
            // Si el usuario cambia manualmente la opción, bloqueamos la detección automática
            autoDetectLocked = true;
        });
    }
    // Mensaje de comentarios 
    if (comentario && tipo) {
        comentario.addEventListener("input", () => {
            const texto = comentario.value.toLowerCase();
            
            // Actualizar contador de caracteres
            const contadorDiv = document.getElementById("contador-caracteres");
            if (contadorDiv) {
                contadorDiv.textContent = `${comentario.value.length}/1000 caracteres`;
            }

            // Auto-detectar tipo de solicitud (solo si no está bloqueado)
            if (!autoDetectLocked) {
                const idxCompra = texto.indexOf("compra");
                const idxCompraVar = texto.indexOf("comprar");
                const idxVenta = texto.indexOf("venta");
                const idxVender = texto.indexOf("vender");
                const idxConsulta = Math.min(
                    texto.indexOf("consulta") === -1 ? Infinity : texto.indexOf("consulta"),
                    texto.indexOf("pregunta") === -1 ? Infinity : texto.indexOf("pregunta"),
                    texto.indexOf("duda") === -1 ? Infinity : texto.indexOf("duda")
                );

                // Buscar el primer índice válido entre las variantes
                const indices = [
                    { k: 'Compra', i: idxCompra },
                    { k: 'Compra', i: idxCompraVar },
                    { k: 'Venta', i: idxVenta },
                    { k: 'Venta', i: idxVender },
                    { k: 'Consulta', i: isFinite(idxConsulta) ? idxConsulta : -1 }
                ].filter(o => o.i !== -1 && o.i !== Infinity);

                if (indices.length > 0) {
                    indices.sort((a, b) => a.i - b.i);
                    tipo.value = indices[0].k;
                    // Bloquear detección automática tras la primera coincidencia encontrada
                    autoDetectLocked = true;
                }
            }
        });
    }

    // Validación en tiempo real para nombre
    if (nombre) {
        nombre.addEventListener("input", () => {
            const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
            if (nombre.value && !soloLetrasRegex.test(nombre.value)) {
                nombre.classList.add("is-invalid");
                nombre.classList.remove("is-valid");
            } else {
                nombre.classList.remove("is-invalid");
            }
        });
        
        nombre.addEventListener("blur", () => {
            const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            if (nombre.value.trim() && !soloLetrasRegex.test(nombre.value.trim())) {
                nombre.classList.add("is-invalid");
            } else if (nombre.value.trim().length >= 2) {
                nombre.classList.add("is-valid");
                nombre.classList.remove("is-invalid");
            } else {
                nombre.classList.remove("is-valid", "is-invalid");
            }
        });
    }

    // Validación en tiempo real para apellido
    if (apellido) {
        apellido.addEventListener("input", () => {
            const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]*$/;
            if (apellido.value && !soloLetrasRegex.test(apellido.value)) {
                apellido.classList.add("is-invalid");
                apellido.classList.remove("is-valid");
            } else {
                apellido.classList.remove("is-invalid");
            }
        });
        
        apellido.addEventListener("blur", () => {
            const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
            if (apellido.value.trim() && !soloLetrasRegex.test(apellido.value.trim())) {
                apellido.classList.add("is-invalid");
            } else if (apellido.value.trim().length >= 2) {
                apellido.classList.add("is-valid");
                apellido.classList.remove("is-invalid");
            } else {
                apellido.classList.remove("is-valid", "is-invalid");
            }
        });
    }

    // Validación en tiempo real para email
    if (correo) {
        correo.addEventListener("blur", () => {
            const val = correo.value.trim();
            if (val && !isValidEmail(val)) {
                correo.classList.add("is-invalid");
            } else if (val) {
                correo.classList.add("is-valid");
                correo.classList.remove("is-invalid");
            } else {
                correo.classList.remove("is-valid", "is-invalid");
            }
        });
    }


    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            enviarWhatsApp(); // Llama directamente a la función de WhatsApp
        });
    }

    // ------------------------------
    // FUNCIÓN ENVIAR WHATSAPP CON VALIDACIONES
    // ------------------------------
    function enviarWhatsApp() {
        const nombreVal = nombre.value.trim();
        const apellidoVal = apellido.value.trim();
        const correoVal = correo.value.trim();
        const tipoVal = tipo.value;
        const comentarioVal = comentario.value.trim();

        // Validar que todos los campos estén completos
        if (!nombreVal || !apellidoVal || !correoVal || !tipoVal || !comentarioVal) {
            mostrarMensaje("Por favor, complete todos los campos.", "error");
            return;
        }

        // Validar que el nombre solo contenga letras y espacios
        const soloLetrasRegex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/;
        if (!soloLetrasRegex.test(nombreVal)) {
            mostrarMensaje("El nombre solo debe contener letras y espacios.", "error");
            nombre.focus();
            return;
        }

        // Validar que el apellido solo contenga letras y espacios
        if (!soloLetrasRegex.test(apellidoVal)) {
            mostrarMensaje("El apellido solo debe contener letras y espacios.", "error");
            apellido.focus();
            return;
        }

        // Validar longitud mínima del nombre
        if (nombreVal.length < 2) {
            mostrarMensaje("El nombre debe tener al menos 2 caracteres.", "error");
            nombre.focus();
            return;
        }

        // Validar longitud mínima del apellido
        if (apellidoVal.length < 2) {
            mostrarMensaje("El apellido debe tener al menos 2 caracteres.", "error");
            apellido.focus();
            return;
        }

        // Validar email con función segura para evitar backtracking
        if (!isValidEmail(correoVal)) {
            mostrarMensaje("El correo electrónico no es válido. Ej: usuario@dominio.com", "error");
            correo.focus();
            return;
        }

        // Validar longitud mínima del comentario
        if (comentarioVal.length < 10) {
            mostrarMensaje("La solicitud debe tener al menos 10 caracteres.", "error");
            comentario.focus();
            return;
        }

        // Validar longitud máxima del comentario
        if (comentarioVal.length > 1000) {
            mostrarMensaje("La solicitud no puede exceder 1000 caracteres.", "error");
            comentario.focus();
            return;
        }

        // Validar que se haya seleccionado un tipo
        if (!tipoVal) {
            mostrarMensaje("Por favor, seleccione un tipo de solicitud.", "error");
            tipo.focus();
            return;
        }

        // Construir el mensaje para WhatsApp
        const mensaje =
            `*Formulario de Contacto*\n\n` +
            `*Nombre:* ${nombreVal} ${apellidoVal}\n` +
            `*Correo:* ${correoVal}\n` +
            `*Tipo de Solicitud:* ${tipoVal}\n` +
            `*Mensaje:*\n${comentarioVal}`;

        const numeroWhatsApp = "56971307840"; // Reemplaza por tu número real
        const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensaje)}`;

        window.open(url, "_blank");

        mostrarMensaje("✓ Solicitud enviada correctamente. Redirigiendo a WhatsApp...", "success");
        form.reset();
    }
});

