function enviarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre && email && mensaje) {
        alert(`Gracias, ${nombre}! Hemos recibido tu mensaje.`);
        document.getElementById('nombre').value = '';
        document.getElementById('email').value = '';
        document.getElementById('mensaje').value = '';
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

function comprarProducto(nombreProducto) {
    const mensaje = encodeURIComponent(`Hola, estoy interesado en comprar el producto: ${nombreProducto}`);
    window.open(`https://wa.me/51902023598?text=${mensaje}`, '_blank');
}