/* ======================
   CARRITO DE COMPRAS
====================== */

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

/* Guardar carrito */
function guardarCarrito() {
  localStorage.setItem("carrito", JSON.stringify(carrito));
}

/* Actualizar carrito */
function actualizarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const contador = document.getElementById("contador-carrito");
  const total = document.getElementById("total-carrito");

  lista.innerHTML = "";
  let suma = 0;

  carrito.forEach((item, index) => {
    suma += item.precio * item.cantidad;

    const div = document.createElement("div");
    div.className = "item-carrito";
    div.innerHTML = `
      <img src="${item.imagen}">
      <div>
        <strong>${item.nombre}</strong><br>
        S/. ${item.precio} x ${item.cantidad}
      </div>
      <button onclick="eliminarProducto(${index})">❌</button>
    `;
    lista.appendChild(div);
  });

  contador.textContent = carrito.reduce((a, b) => a + b.cantidad, 0);
  total.textContent = `Total: S/. ${suma.toFixed(2)}`;

  guardarCarrito();
}

/* Agregar */
function agregarAlCarrito(nombre, precio, imagen) {
  const existente = carrito.find(p => p.nombre === nombre);

  if (existente) {
    existente.cantidad++;
  } else {
    carrito.push({ nombre, precio, imagen, cantidad: 1 });
  }

  actualizarCarrito();
}

/* Eliminar */
function eliminarProducto(index) {
  carrito.splice(index, 1);
  actualizarCarrito();
}

/* Abrir / cerrar carrito */
function toggleCarrito() {
  document.getElementById("panel-carrito").classList.toggle("activo");
}

/* Comprar directo */
function comprarDirecto(nombre, precio) {
  const mensaje = `Hola 💖 quiero comprar:\n${nombre}\nPrecio: S/. ${precio}`;
  window.open(`https://wa.me/51990662988?text=${encodeURIComponent(mensaje)}`, "_blank");
}

/* Finalizar compra */
function finalizarCompra(metodo = "WhatsApp") {
  if (carrito.length === 0) {
    alert("Tu carrito está vacío 🥺");
    return;
  }

  let mensaje = `Hola 💕 quiero comprar:\n\n`;
  carrito.forEach(p => {
    mensaje += `${p.nombre} x${p.cantidad} - S/. ${p.precio}\n`;
  });

  mensaje += `\nMétodo de pago: ${metodo}`;

  window.open(`https://wa.me/51990662988?text=${encodeURIComponent(mensaje)}`, "_blank");
}

/* Cargar al iniciar */
actualizarCarrito();
function toggleCarrito() {
  const panel = document.getElementById("panel-carrito");
  panel.classList.toggle("activo");
}
document.querySelectorAll('.slider-producto').forEach(slider => {
  let index = 0;
  const imgs = slider.querySelectorAll('img');
  let startX = 0;

  function mostrar(i) {
    imgs.forEach(img => img.classList.remove('activo'));
    imgs[i].classList.add('activo');
    index = i;
  }

  // CLIC (PC)
  slider.addEventListener('click', () => {
    mostrar((index + 1) % imgs.length);
  });

  // DESLIZAR (MÓVIL)
  slider.addEventListener('touchstart', e => {
    startX = e.touches[0].clientX;
  });

  slider.addEventListener('touchend', e => {
    const endX = e.changedTouches[0].clientX;
    if (startX - endX > 40) {
      mostrar((index + 1) % imgs.length);
    }
    if (endX - startX > 40) {
      mostrar((index - 1 + imgs.length) % imgs.length);
    }
  });
});

