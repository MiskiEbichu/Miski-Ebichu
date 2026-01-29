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
function abrirImagen(src) {
  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  img.src = src;
  lightbox.style.display = "flex";
}

function cerrarImagen() {
  document.getElementById("lightbox").style.display = "none";
}
let galeria = [];
let indiceActual = 0;

/* Abrir galería */
function abrirGaleria(imagenes) {
  galeria = imagenes;
  indiceActual = 0;

  const lightbox = document.getElementById("lightbox");
  const img = document.getElementById("lightbox-img");

  img.src = galeria[indiceActual];
  lightbox.classList.add("activo");
}

/* Cerrar */
function cerrarGaleria() {
  document.getElementById("lightbox").classList.remove("activo");
}

/* Navegación */
function imagenSiguiente() {
  indiceActual = (indiceActual + 1) % galeria.length;
  animarCambio();
}

function imagenAnterior() {
  indiceActual = (indiceActual - 1 + galeria.length) % galeria.length;
  animarCambio();
}

/* Animación */
function animarCambio() {
  const img = document.getElementById("lightbox-img");
  img.classList.remove("animar");
  void img.offsetWidth; // reset animación
  img.src = galeria[indiceActual];
  img.classList.add("animar");
}

/* Swipe móvil */
let startX = 0;

document.getElementById("lightbox").addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

document.getElementById("lightbox").addEventListener("touchend", e => {
  const endX = e.changedTouches[0].clientX;
  if (startX - endX > 50) imagenSiguiente();
  if (endX - startX > 50) imagenAnterior();
});
let galeria = [];
let indiceActual = 0;
let nombreProducto = "";
let precioProducto = 0;

/* Abrir */
function abrirGaleria(imagenes, nombre, precio) {
  galeria = imagenes;
  indiceActual = 0;
  nombreProducto = nombre;
  precioProducto = precio;

  document.getElementById("lightbox-img").src = galeria[0];
  document.getElementById("lightbox-nombre").textContent = nombre;
  document.getElementById("lightbox-precio").textContent = `Precio: S/. ${precio.toFixed(2)}`;

  const mensaje = `Hola 😊 quiero comprar el producto:\n${nombre}\nPrecio: S/. ${precio}`;
  document.getElementById("lightbox-whatsapp").href =
    `https://wa.me/51990662988?text=${encodeURIComponent(mensaje)}`;

  document.getElementById("lightbox").classList.add("activo");
}

/* Cerrar */
function cerrarGaleria() {
  document.getElementById("lightbox").classList.remove("activo");
}

/* Navegar */
function imagenSiguiente() {
  indiceActual = (indiceActual + 1) % galeria.length;
  cambiarImagen();
}

function imagenAnterior() {
  indiceActual = (indiceActual - 1 + galeria.length) % galeria.length;
  cambiarImagen();
}

/* Animación */
function cambiarImagen() {
  const img = document.getElementById("lightbox-img");
  img.classList.remove("animar");
  void img.offsetWidth;
  img.src = galeria[indiceActual];
  img.classList.add("animar");
}

/* 👉 Swipe móvil */
let inicioX = 0;

document.getElementById("lightbox").addEventListener("touchstart", e => {
  inicioX = e.touches[0].clientX;
});

document.getElementById("lightbox").addEventListener("touchend", e => {
  const finX = e.changedTouches[0].clientX;
  const diferencia = inicioX - finX;

  if (diferencia > 40) imagenSiguiente();   // swipe izquierda
  if (diferencia < -40) imagenAnterior();  // swipe derecha
});
