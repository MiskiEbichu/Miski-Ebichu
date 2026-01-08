export let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

export function guardarCarrito() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}

export function agregarAlCarrito(nombre, precio) {
    const existente = carrito.find(i => i.nombre === nombre);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push({ nombre, precio, cantidad: 1 });
    }
    guardarCarrito();
    actualizarContador();
    alert(`${nombre} agregado al carrito`);
}

export function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(i => i.nombre !== nombre);
    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
}

export function vaciarCarrito() {
    carrito = [];
    guardarCarrito();
    mostrarCarrito();
    actualizarContador();
}

export function calcularTotal() {
    return carrito.reduce((s, i) => s + i.precio * i.cantidad, 0);
}

export function actualizarContador() {
    const total = carrito.reduce((s, i) => s + i.cantidad, 0);
    document.getElementById('contador-carrito').textContent = total;
}

export function mostrarCarrito() {
    const itemsDiv = document.getElementById('carrito-items');
    const totalDiv = document.getElementById('total-precio');

    if (carrito.length === 0) {
        itemsDiv.innerHTML = '<p>Tu carrito está vacío.</p>';
        totalDiv.textContent = '0.00';
        return;
    }

    let html = '';
    let total = 0;

    carrito.forEach(item => {
        const subtotal = item.precio * item.cantidad;
        total += subtotal;
        html += `
            <div class="item-carrito">
                <span>${item.nombre} x${item.cantidad}</span>
                <span>S/. ${subtotal.toFixed(2)}</span>
                <button data-producto="${item.nombre}" class="eliminar">Eliminar</button>
            </div>
        `;
    });

    itemsDiv.innerHTML = html;
    totalDiv.textContent = total.toFixed(2);

    document.querySelectorAll('.eliminar').forEach(btn => {
        btn.addEventListener('click', () =>
            eliminarDelCarrito(btn.dataset.producto)
        );
    });
}

import { carrito, calcularTotal, vaciarCarrito } from './carrito.js';

const NUMERO_YAPE = '51990662988';
const NUMERO_PLIN = '51902023598';

export function procesarPago(metodo) {
    if (carrito.length === 0) {
        alert('El carrito está vacío');
        return;
    }

    const total = calcularTotal().toFixed(2);

    let detalle = carrito.map(i =>
        `${i.nombre} x${i.cantidad} = S/. ${(i.precio * i.cantidad).toFixed(2)}`
    ).join('%0A');

    let numero = metodo === 'yape' ? NUMERO_YAPE : NUMERO_PLIN;

    const mensaje = `
Hola, deseo pagar con ${metodo.toUpperCase()}.
Pedido:
${detalle}

Total: S/. ${total}
    `;

    const url = `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
    window.open(url, '_blank');

    vaciarCarrito();
}
export function iniciarFormulario() {
    const form = document.getElementById('form-contacto');

    if (!form) return;

    form.addEventListener('submit', e => {
        e.preventDefault();

        const nombre = form.nombre.value.trim();
        const email = form.email.value.trim();
        const mensaje = form.mensaje.value.trim();

        if (!nombre || !email || !mensaje) {
            alert('Completa todos los campos');
            return;
        }

        alert(`Gracias ${nombre}, mensaje enviado`);
        form.reset();
    });
}
import { mostrarCarrito, actualizarContador } from './carrito.js';
import { procesarPago } from './pagos.js';
import { iniciarFormulario } from './formulario.js';

document.addEventListener('DOMContentLoaded', () => {
    actualizarContador();
    mostrarCarrito();
    iniciarFormulario();

    document.getElementById('btn-yape')?.addEventListener('click', () =>
        procesarPago('yape')
    );

    document.getElementById('btn-plin')?.addEventListener('click', () =>
        procesarPago('plin')
    );
});
<script type="module" src="js/main.js"></script>

<button id="btn-yape">Pagar con Yape</button>
<button id="btn-plin">Pagar con Plin</button>

<span id="contador-carrito">0</span>
<div id="carrito-items"></div>
<strong>Total: S/. <span id="total-precio">0.00</span></strong>

    <div class="carrito-float" onclick="enviarCarritoWhatsApp()">
function enviarCarritoWhatsApp() {
  const mensaje = `Hola, quiero hacer un pedido:%0A- ${carrito.join('%0A- ')}`;
  window.open(`https://wa.me/51990662988?text=${mensaje}`, '_blank');
}
<button onclick="comprarYEnviar('Vestido Largo')">Comprar</button>
function comprarYEnviar(producto) {
  const mensaje = `Hola, quiero comprar: ${producto}`;
  window.open(`https://wa.me/51990662988?text=${mensaje}`, '_blank');
}
