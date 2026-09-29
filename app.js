document.addEventListener('DOMContentLoaded', () => {
    const boton = document.getElementById('btn-mensaje');
    if (boton) {
        boton.addEventListener('click', () => {
            alert('¡Felicidades! HTML, CSS y JS se han integrado con éxito 🚀');
        });
    }
});