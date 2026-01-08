let carrito = [];

// AGREGAR AL CARRITO
function agregarAlCarrito(nombre, precio) {
  carrito.push({ nombre, precio });
  actualizarContador();
}

// ACTUALIZAR CONTADOR
function actualizarContador() {
  document.getElementById('contador-carrito').textContent = carrito.length;
}

// COMPRAR DIRECTO
function comprarDirecto(nombre, precio) {
  const mensaje = `Hola, quiero comprar:%0A- ${nombre} (S/. ${precio})`;
  window.open(`https://wa.me/51990662988?text=${mensaje}`, '_blank');
}

// ABRIR CARRITO
function abrirCarrito() {
  const modal = document.getElementById('modal-carrito');
  const lista = document.getElementById('lista-carrito');
  lista.innerHTML = '';

  carrito.forEach(p => {
    const li = document.createElement('li');
    li.textContent = `${p.nombre} - S/. ${p.precio}`;
    lista.appendChild(li);
  });

  modal.style.display = 'block';
}

// CERRAR CARRITO
function cerrarCarrito() {
  document.getElementById('modal-carrito').style.display = 'none';
}

// ENVIAR CARRITO A WHATSAPP
function enviarCarritoWhatsApp() {
  if (carrito.length === 0) {
    alert('El carrito está vacío');
    return;
  }

  let mensaje = 'Hola, quiero hacer el siguiente pedido:%0A';
  carrito.forEach(p => {
    mensaje += `- ${p.nombre} (S/. ${p.precio})%0A`;
  });

  window.open(`https://wa.me/51990662988?text=${mensaje}`, '_blank');
}
