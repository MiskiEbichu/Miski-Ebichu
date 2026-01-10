// ==============================
// CARRITO DE COMPRAS - MISKI EBICHU
// ==============================

let carrito = [];
let carritoAbierto = false;

// FIX para eventos táctiles móviles
document.addEventListener("touchstart", function(){}, true);

// ------------------------------
// ABRIR / CERRAR CARRITO
// ------------------------------
function toggleCarrito() {
  const panel = document.getElementById("panel-carrito");
  carritoAbierto = !carritoAbierto;

  if (carritoAbierto) {
    panel.classList.add("abierto");
  } else {
    panel.classList.remove("abierto");
  }
}

// ------------------------------
// AGREGAR PRODUCTO
// ------------------------------
function agregarAlCarrito(nombre, precio, imagen) {
  const producto = carrito.find(p => p.nombre === nombre);

  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({
      nombre,
      precio,
      imagen,
      cantidad: 1
    });
  }

  actualizarCarrito();
}

// ------------------------------
// ELIMINAR PRODUCTO
// ------------------------------
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

// ------------------------------
// ACTUALIZAR CARRITO
// ------------------------------
function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const totalEl = document.getElementById("total-carrito");
  const contador = document.getElementById("contador-carrito");

  lista.innerHTML = "";

  let total = 0;
  let cantidadTotal = 0;

  carrito.forEach((p, index) => {
    const subtotal = p.precio * p.cantidad;
    total += subtotal;
    cantidadTotal += p.cantidad;

    lista.innerHTML += `
      <div class="item-carrito">
        <img src="${p.imagen}" alt="${p.nombre}">
        <div class="info">
          <strong>${p.nombre}</strong>
          <span>${p.cantidad} x S/. ${p.precio.toFixed(2)}</span>
        </div>
        <button type="button" onclick="eliminarProducto(${index})">❌</button>
      </div>
    `;
  });

  contador.textContent = cantidadTotal;
  totalEl.textContent = `Total: S/. ${total.toFixed(2)}`;
}

// ------------------------------
// COMPRAR DIRECTO
// ------------------------------
function comprarDirecto(nombre, precio) {
  carrito = [{
    nombre,
    precio,
    cantidad: 1,
    imagen: ""
  }];

  actualizarCarrito();
  toggleCarrito();
}

// ------------------------------
// FINALIZAR COMPRA (BOLETA)
// ------------------------------
function finalizarCompra(metodo) {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }

  let total = 0;
  let mensaje = "🧾 *BOLETA - MISKI EBICHU*%0A%0A";

  carrito.forEach(p => {
    const subtotal = p.precio * p.cantidad;
    total += subtotal;
    mensaje += `• ${p.nombre} x${p.cantidad} - S/. ${subtotal.toFixed(2)}%0A`;
  });

  mensaje += `%0A💰 Total: S/. ${total.toFixed(2)}%0A`;
  mensaje += `💳 Pago: ${metodo}%0A`;
  mensaje += `📲 Número: 990 662 988%0A`;
  mensaje += `🙏 Gracias por tu compra 💖`;

  const url = `https://wa.me/51990662988?text=${mensaje}`;
  window.open(url, "_blank");

  carrito = [];
  actualizarCarrito();
  toggleCarrito();
}
