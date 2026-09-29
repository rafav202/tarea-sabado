// Inicializamos EmailJS al cargar el archivo
emailjs.init("EGydEeLzJ0xWQib6Q");

const SERVICE_ID = "service_cc7scnd";
const TEMPLATE_ID = "template_r3qtmol";

document.addEventListener('DOMContentLoaded', () => {
    const carrito = [];
    let totalCompra = 0;

    // Referencias del DOM
    const contenedorItems = document.getElementById('carrito-items');
    const totalPrecioDOM = document.getElementById('total-precio');
    const contadorDOM = document.getElementById('contador-carrito');
    const panelCarrito = document.getElementById('carrito-panel');
    const overlay = document.getElementById('overlay');
    
    // Referencias del Checkout
    const modalCheckout = document.getElementById('checkout-modal');
    const btnProcederPago = document.querySelector('.btn-pagar');
    const formPago = document.getElementById('form-pago');
    const modalTotalDOM = document.getElementById('modal-total');

    // 1. Abrir/Cerrar Carrito
    document.getElementById('abrir-carrito').addEventListener('click', () => {
        panelCarrito.classList.add('abierto');
        overlay.classList.add('activo');
    });

    const cerrarPanel = () => {
        panelCarrito.classList.remove('abierto');
        overlay.classList.remove('activo');
    };
    document.getElementById('cerrar-carrito').addEventListener('click', cerrarPanel);
    overlay.addEventListener('click', cerrarPanel);

    // 2. Agregar al Carrito
    document.querySelectorAll('.btn-agregar').forEach(boton => {
        boton.addEventListener('click', (e) => {
            const tarjeta = e.target.closest('.tarjeta-producto');
            carrito.push({
                nombre: tarjeta.dataset.nombre,
                precio: parseInt(tarjeta.dataset.precio)
            });
            actualizarCarritoHTML();
            
            boton.textContent = '¡Añadido ✓!';
            boton.style.backgroundColor = '#d4af37';
            boton.style.color = 'black';
            setTimeout(() => {
                boton.textContent = 'Añadir al carrito';
                boton.style.backgroundColor = ''; boton.style.color = '';
            }, 1000);
        });
    });

    // 3. Dibujar Carrito
    function actualizarCarritoHTML() {
        contenedorItems.innerHTML = '';
        totalCompra = 0;
        carrito.forEach((producto, index) => {
            totalCompra += producto.precio;
            contenedorItems.innerHTML += `
                <div class="item-carrito">
                    <div class="item-info">
                        <h4>${producto.nombre}</h4>
                        <p>$${producto.precio.toLocaleString('es-CO')}</p>
                    </div>
                    <button class="btn-eliminar" onclick="eliminarProducto(${index})"><i class="fas fa-trash"></i></button>
                </div>
            `;
        });
        totalPrecioDOM.textContent = totalCompra.toLocaleString('es-CO');
        contadorDOM.textContent = carrito.length;
    }

    window.eliminarProducto = (index) => {
        carrito.splice(index, 1);
        actualizarCarritoHTML();
    }

    // 4. LÓGICA DE CHECKOUT Y CORREOS
    btnProcederPago.addEventListener('click', () => {
        if (carrito.length === 0) return alert('El carrito está vacío');
        cerrarPanel();
        modalTotalDOM.textContent = totalCompra.toLocaleString('es-CO');
        modalCheckout.classList.add('activo');
    });

    document.getElementById('cerrar-checkout').addEventListener('click', () => {
        modalCheckout.classList.remove('activo');
    });

    // Procesar el pago y enviar correos
    formPago.addEventListener('submit', (e) => {
        e.preventDefault();
        const btnConfirmar = document.querySelector('.btn-confirmar');
        btnConfirmar.textContent = "Procesando pago y enviando correos...";
        btnConfirmar.disabled = true;

        let detalleCompra = "";
        carrito.forEach(p => detalleCompra += `- ${p.nombre} ($${p.precio.toLocaleString('es-CO')})\n`);

        const datosCorreo = {
            nombre_cliente: document.getElementById('nombre').value,
            correo_cliente: document.getElementById('correo').value,
            direccion: document.getElementById('direccion').value,
            detalle_productos: detalleCompra,
            total_pagado: totalCompra.toLocaleString('es-CO')
        };

        emailjs.send(SERVICE_ID, TEMPLATE_ID, datosCorreo)
            .then(() => {
                alert('¡Compra exitosa! Revisa tu correo para ver el recibo.');
                carrito.length = 0;
                actualizarCarritoHTML();
                formPago.reset();
                modalCheckout.classList.remove('activo');
                btnConfirmar.textContent = `Pagar $${totalCompra.toLocaleString('es-CO')}`;
                btnConfirmar.disabled = false;
            })
            .catch((error) => {
                alert('Hubo un error enviando el correo. Revisa la consola.');
                console.error('Error de EmailJS:', error);
                btnConfirmar.textContent = `Pagar $${totalCompra.toLocaleString('es-CO')}`;
                btnConfirmar.disabled = false;
            });
    });
});