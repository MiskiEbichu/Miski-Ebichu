// Carrito simple
let carrito = [];

function comprarProducto(nombre) {
  carrito.push(nombre);
  alert(`Producto agregado: ${nombre}`);
}

function enviarFormulario() {
  const nombre = document.getElementById('nombre').value;
  const email = document.getElementById('email').value;
  const mensaje = document.getElementById('mensaje').value;

  if (!nombre || !email || !mensaje) {
    alert('Por favor complete todos los campos');
    return;
  }

  const texto = `Hola, soy ${nombre}.%0AEmail: ${email}.%0AMensaje: ${mensaje}.%0AProductos: ${carrito.join(', ')}`;
  const whatsappURL = `https://wa.me/51990662988?text=${texto}`;

  window.open(whatsappURL, '_blank');
}
