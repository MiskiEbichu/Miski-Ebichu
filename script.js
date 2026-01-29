// ==============================
// CARRITO DE COMPRAS - MISKI EBICHU
// ==============================

let carrito = [];

// FIX eventos táctiles móviles
document.addEventListener("touchstart", function(){}, true);

// ==============================
// ABRIR / CERRAR CARRITO (SIN ESTADO FALSO)
// ==============================
function abrirCarrito() {
  document.getElementById("panel-carrito").classList.add("abierto");
}

function cerrarCarrito() {
  document.getElementById("panel-carrito").classList.remove("abierto");
}

function toggleCarrito() {
  const panel = document.getElementById("panel-carrito");
  panel.classList.toggle("abierto");
}

// ==============================
// AGREGAR PRODUCTO
// ==============================
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

// ==============================
// COMPRAR DIRECTO (FIX)
// ==============================
function comprarDirecto(nombre, precio, imagen = "") {
  carrito = [{
    nombre,
    precio,
    imagen,
    cantidad: 1
  }];

  actualizarCarrito();
  abrirCarrito(); // 👈 AHORA SÍ SE ABRE
}

// ==============================
// ACTUALIZAR CARRITO
// ==============================
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
        <strong>${p.nombre}</strong><br>
        ${p.cantidad} x S/. ${p.precio.toFixed(2)}
        <button type="button" onclick="eliminarProducto(${index})">❌</button>
      </div>
    `;
  });

  contador.textContent = cantidadTotal;
  totalEl.textContent = `Total: S/. ${total.toFixed(2)}`;
}

// ==============================
// ELIMINAR PRODUCTO
// ==============================
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();

  if (carrito.length === 0) {
    cerrarCarrito();
  }
}

// ==============================
// FINALIZAR COMPRA
// ==============================
function finalizarCompra(metodo) {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🛒");
    return;
  }

  let total = 0;
  let mensaje = "🧾 *BOLETA - MISKI EBICHU*\n\n";

  carrito.forEach(p => {
    const subtotal = p.precio * p.cantidad;
    total += subtotal;
    mensaje += `• ${p.nombre} x${p.cantidad} - S/. ${subtotal.toFixed(2)}\n`;
  });

  mensaje += `\n💰 Total: S/. ${total.toFixed(2)}`;
  mensaje += `\n💳 Pago: ${metodo}`;
  mensaje += `\n🙏 Gracias por tu compra 💖`;

  window.open(
    `https://wa.me/51990662988?text=${encodeURIComponent(mensaje)}`,
    "_blank"
  );

  carrito = [];
  actualizarCarrito();
  cerrarCarrito();
}
function cambiarImagen(idImagen, nuevaSrc) {
  document.getElementById(idImagen).src = nuevaSrc;
}
