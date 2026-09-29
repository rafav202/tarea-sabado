document.addEventListener('DOMContentLoaded', () => {
    // Seleccionamos todos los botones y el contador del carrito
    const botonesAgregar = document.querySelectorAll('.btn-agregar');
    const contadorCarrito = document.getElementById('contador-carrito');
    
    let cantidadProductos = 0;

    // Le damos una función a cada botón de la página
    botonesAgregar.forEach(boton => {
        boton.addEventListener('click', () => {
            // 1. Aumentar el contador
            cantidadProductos++;
            contadorCarrito.textContent = cantidadProductos;
            
            // 2. Efecto visual de confirmación en el botón
            const textoOriginal = boton.textContent;
            boton.textContent = '¡Añadido ✓!';
            boton.style.backgroundColor = '#28a745'; // Color verde
            boton.style.color = 'white';

            // 3. Devolver el botón a su estado normal después de 1.5 segundos
            setTimeout(() => {
                boton.textContent = textoOriginal;
                boton.style.backgroundColor = ''; // Regresa al color de CSS
                boton.style.color = '';
            }, 1500);
        });
    });
});