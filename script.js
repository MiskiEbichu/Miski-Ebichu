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

/* Finalizar compra */
function finalizarCompra() {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }

  let mensaje = "Hola, quiero realizar el siguiente pedido:%0A";
  carrito.forEach(p => {
    mensaje += `- ${p.nombre} (S/. ${p.precio})%0A`;
  });

  window.open(`https://wa.me/51990662988?text=${mensaje}`, "_blank");
}
