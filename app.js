document.addEventListener('DOMContentLoaded', () => {
    // Referencias a los elementos del HTML
    const carrito = []; // Aquí guardaremos los productos
    const contenedorItems = document.getElementById('carrito-items');
    const totalPrecioDOM = document.getElementById('total-precio');
    const contadorDOM = document.getElementById('contador-carrito');
    
    // Controles del Panel
    const panelCarrito = document.getElementById('carrito-panel');
    const overlay = document.getElementById('overlay');
    const btnAbrir = document.getElementById('abrir-carrito');
    const btnCerrar = document.getElementById('cerrar-carrito');

    // 1. Funciones para Abrir y Cerrar el panel
    btnAbrir.addEventListener('click', () => {
        panelCarrito.classList.add('abierto');
        overlay.classList.add('activo');
    });

    const cerrarPanel = () => {
        panelCarrito.classList.remove('abierto');
        overlay.classList.remove('activo');
    };
    btnCerrar.addEventListener('click', cerrarPanel);
    overlay.addEventListener('click', cerrarPanel);

    // 2. Lógica para Agregar al Carrito
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', (e) => {
            // Buscamos el contenedor padre (la tarjeta) para sacar sus datos
            const tarjeta = e.target.closest('.tarjeta-producto');
            
            const producto = {
                id: tarjeta.dataset.id,
                nombre: tarjeta.dataset.nombre,
                precio: parseInt(tarjeta.dataset.precio) // Convertimos el texto a número
            };

            agregarProducto(producto);
            
            // Efecto visual en el botón
            boton.textContent = '¡Añadido ✓!';
            boton.style.backgroundColor = '#d4af37';
            boton.style.color = 'black';
            setTimeout(() => {
                boton.textContent = 'Añadir al carrito';
                boton.style.backgroundColor = '';
                boton.style.color = '';
            }, 1000);
        });
    });

    // 3. Función principal que gestiona el Array
    function agregarProducto(prod) {
        carrito.push(prod);
        actualizarCarritoHTML();
    }

    // 4. Dibujar el carrito en la pantalla
    function actualizarCarritoHTML() {
        // Limpiamos el HTML para no duplicar
        contenedorItems.innerHTML = '';
        
        let total = 0;

        carrito.forEach((producto, index) => {
            // Sumamos el precio al total
            total += producto.precio;

            // Creamos el diseño del producto en el carrito
            const div = document.createElement('div');
            div.classList.add('item-carrito');
            div.innerHTML = `
                <div class="item-info">
                    <h4>${producto.nombre}</h4>
                    <p>$${producto.precio.toLocaleString('es-CO')}</p>
                </div>
                <button class="btn-eliminar" onclick="eliminarProducto(${index})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            contenedorItems.appendChild(div);
        });

        // Actualizamos los números en pantalla
        totalPrecioDOM.textContent = total.toLocaleString('es-CO');
        contadorDOM.textContent = carrito.length;
    }

    // 5. Función para eliminar (Debe estar disponible globalmente)
    window.eliminarProducto = (index) => {
        carrito.splice(index, 1); // Quitamos 1 elemento en la posición "index"
        actualizarCarritoHTML(); // Volvems a dibujar
    }
});