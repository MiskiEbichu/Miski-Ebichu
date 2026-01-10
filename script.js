let carrito = [];
let carritoAbierto = false;

/* Abrir / cerrar carrito */
function toggleCarrito() {
  const panel = document.getElementById("panel-carrito");
  carritoAbierto = !carritoAbierto;
  panel.style.right = carritoAbierto ? "0" : "-380px";
}

/* Agregar producto */
function agregarAlCarrito(nombre, precio, imagen) {
  carrito.push({ nombre, precio, imagen });
  actualizarCarrito();
}

/* Eliminar producto */
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

/* Actualizar carrito */
function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalEl = document.getElementById("total-carrito");
  const contador = document.getElementById("contador-carrito");

  lista.innerHTML = "";
  let total = 0;

  carrito.forEach((p, index) => {
    total += p.precio;
    lista.innerHTML += `
      <div class="item-carrito">
        <img src="${p.imagen}" alt="${p.nombre}">
        <div class="info">
          <strong>${p.nombre}</strong>
          <span>S/. ${p.precio.toFixed(2)}</span>
        </div>
        <button onclick="eliminarProducto(${index})">❌</button>
      </div>
    `;
  });

  contador.textContent = carrito.length;
  totalEl.textContent = `Total: S/. ${total.toFixed(2)}`;
}

/* Comprar directo */
function comprarDirecto(nombre, precio) {
  const mensaje = `Hola, quiero comprar:%0A- ${nombre} (S/. ${precio})`;
  window.open(`https://wa.me/51990662988?text=${mensaje}`, "_blank");
}

function finalizarCompra(metodo) {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }

  let total = 0;
  let mensaje = "Hola, quiero realizar el siguiente pedido:%0A%0A";

  carrito.forEach(p => {
    total += p.precio;
    mensaje += `- ${p.nombre} (S/. ${p.precio})%0A`;
  });

  mensaje += `%0ATotal: S/. ${total.toFixed(2)}%0A`;
  mensaje += `Método de pago: ${metodo}%0A`;
  mensaje += `Número para pago: 990 662 988%0A`;
  mensaje += `Espero confirmación, gracias 💖`;

  window.open(`https://wa.me/51990662988?text=${mensaje}`, "_blank");
}
function mostrarTicket(metodoPago) {
  const ticket = document.getElementById("boleta-ticket");
  const lista = document.getElementById("ticket-productos");

  lista.innerHTML = "";

  let total = 0;

  carrito.forEach(item => {
    const linea = document.createElement("div");
    linea.className = "ticket-item";
    linea.innerHTML = `
      <span>${item.nombre} x${item.cantidad}</span>
      <span>S/. ${(item.precio * item.cantidad).toFixed(2)}</span>
    `;
    lista.appendChild(linea);
    total += item.precio * item.cantidad;
  });

  document.getElementById("ticket-total").textContent =
    "S/. " + total.toFixed(2);

  document.getElementById("ticket-fecha").textContent =
    "Fecha: " + new Date().toLocaleString("es-PE");

  document.getElementById("ticket-numero").textContent =
    "Boleta N° MB-" + Date.now();

  document.getElementById("ticket-pago").textContent =
    "Pago: " + metodoPago;

  ticket.classList.remove("oculto");
}
function imprimirTicket() {
  const contenido = document.querySelector(".ticket-contenido").innerHTML;
  const ventana = window.open("", "", "width=300,height=600");

  ventana.document.write(`
    <html>
    <head>
      <title>Boleta</title>
      <style>
        body { font-family: monospace; }
      </style>
    </head>
    <body>${contenido}</body>
    </html>
  `);

  ventana.document.close();
  ventana.print();
}
function cerrarTicket() {
  document.getElementById("boleta-ticket").classList.add("oculto");
}
function finalizarCompra(metodoPago) {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío");
    return;
  }

  mostrarTicket(metodoPago);

  carrito = [];
  actualizarCarrito();
}
