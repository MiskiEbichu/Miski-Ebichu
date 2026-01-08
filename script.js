// Carrito en localStorage para persistencia
let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function actualizarContador() {
  const totalItems = carrito.reduce((sum, item) => sum + item.cantidad, 0);
  document.getElementById('contador-carrito').textContent = totalItems;
  actualizarPanelCarrito();
}

function agregarAlCarrito(nombre, precio, imagen) {
  const existente = carrito.find(item => item.nombre === nombre);
  if (existente) {
    existente.cantidad += 1;
  } else {
    carrito.push({ nombre, precio, imagen, cantidad: 1 });
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
  alert(`${nombre} agregado al carrito`);
}

function cambiarCantidad(index, cambio) {
  carrito[index].cantidad += cambio;
  if (carrito[index].cantidad <= 0) {
    carrito.splice(index, 1);
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
}

function quitarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem('carrito', JSON.stringify(carrito));
  actualizarContador();
}

function actualizarPanelCarrito() {
  const lista = document.getElementById('lista-carrito');
  lista.innerHTML = '';

  if (carrito.length === 0) {
    lista.innerHTML = '<p class="vacío">El carrito está vacío</p>';
    document.getElementById('total-carrito').textContent = 'Total: S/. 0.00';
    return;
  }

  let total = 0;
  carrito.forEach((item, index) => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;

    const div = document.createElement('div');
    div.className = 'item-carrito';
    div.innerHTML = `
      <img src="${item.imagen}" alt="${item.nombre}">
      <div class="detalles-item">
        <strong>${item.nombre}</strong><br>
        S/. ${item.precio.toFixed(2)} x ${item.cantidad} = S/. ${subtotal.toFixed(2)}
        <div class="cantidad">
          <button onclick="cambiarCantidad(${index}, -1)">-</button>
          <span>${item.cantidad}</span>
          <button onclick="cambiarCantidad(${index}, 1)">+</button>
        </div>
      </div>
      <button class="quitar-item" onclick="quitarDelCarrito(${index})">Quitar</button>
    `;
    lista.appendChild(div);
  });

  document.getElementById('total-carrito').textContent = `Total: S/. ${total.toFixed(2)}`;
}

function toggleCarrito() {
  const panel = document.getElementById('panel-carrito');
  panel.classList.toggle('abierto');
  if (panel.classList.contains('abierto')) {
    actualizarPanelCarrito();
  }
}

function finalizarCompra() {
  if (carrito.length === 0) {
    alert('El carrito está vacío');
    return;
  }

  let mensaje = "¡Hola! Quiero hacer el siguiente pedido:%0A%0A";
  let total = 0;

  carrito.forEach(item => {
    const subtotal = item.precio * item.cantidad;
    total += subtotal;
    mensaje += `• ${item.nombre} x${item.cantidad} = S/. ${subtotal.toFixed(2)}%0A`;
  });

  mensaje += `%0ATotal: S/. ${total.toFixed(2)}%0A%0AGracias!`;

  const url = `https://wa.me/51990662988?text=${mensaje}`;
  window.open(url, '_blank');
}

// Inicializar contador al cargar la página
document.addEventListener('DOMContentLoaded', actualizarContador);
