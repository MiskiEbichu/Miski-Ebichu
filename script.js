function enviarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre && email && mensaje) {
        alert(`Gracias, ${nombre}! Hemos recibido tu mensaje.`);
        document.getElementById('nombre').value = '';
        document.getElementById('email').value = '';
        document.getElementById('mensaje').value = '';
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

function comprarProducto(nombreProducto) {
    const mensaje = encodeURIComponent(`Hola, estoy interesado en comprar el producto: ${nombreProducto}`);
    window.open(`https://wa.me/51990662988?text=${mensaje}`, '_blank');
}

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];

function enviarFormulario() {
    const nombre = document.getElementById('nombre').value;
    const email = document.getElementById('email').value;
    const mensaje = document.getElementById('mensaje').value;

    if (nombre && email && mensaje) {
        alert(`Gracias, ${nombre}! Hemos recibido tu mensaje.`);
        document.getElementById('nombre').value = '';
        document.getElementById('email').value = '';
        document.getElementById('mensaje').value = '';
    } else {
        alert('Por favor, completa todos los campos.');
    }
}

function agregarAlCarrito(nombre, precio) {
    const item = { nombre, precio, cantidad: 1 };
    const existente = carrito.find(i => i.nombre === nombre);
    if (existente) {
        existente.cantidad++;
    } else {
        carrito.push(item);
    }
    localStorage.setItem('carrito', JSON.stringify(carrito));
    actualizarContador();
    alert(`${nombre} agregado al carrito.`);
}

function eliminarDelCarrito(nombre) {
    carrito = carrito.filter(i => i.nombre !== nombre);
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContador();
}

function vaciarCarrito() {
    carrito = [];
    localStorage.setItem('carrito', JSON.stringify(carrito));
    mostrarCarrito();
    actualizarContador();
}

function actualizarContador() {
    const totalItems = carrito.reduce((sum, i) => sum + i.cantidad, 0);
    document.getElementById('contador-carrito').textContent = totalItems;
}

function toggleCarrito() {
    const modal = document.getElementById('carrito');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    mostrarCarrito();
}

function mostrarCarrito() {
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
                <button onclick="eliminarDelCarrito('${item.nombre}')">Eliminar</button>
            </div>
        `;
    });
    itemsDiv.innerHTML = html;
    totalDiv.textContent = total.toFixed(2);
}

function procederAlPago() {
    if (carrito.length === 0) {
        alert('Tu carrito está vacío.');
        return;
    }
    toggleCarrito();
    toggleCheckout();
}

function toggleCheckout() {
    const modal = document.getElementById('checkout');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
    actualizarDetallesPago();
}

function actualizarDetallesPago() {
    const metodo = document.getElementById('metodo-pago').value;
    const detallesDiv = document.getElementById('detalles-pago');
    if (metodo === 'tarjeta') {
        detallesDiv.innerHTML = `
            <p>Redirigiendo a pasarela segura (Visa/Mastercard via PayU o Stripe).</p>
            <p>Total a pagar: S/. ${calcularTotal().toFixed(2)}</p>
        `;
    } else if (metodo === 'yape') {
        detallesDiv.innerHTML = `
            <p>Escanea el QR de Yape con tu app.</p>
            <p>Total a pagar: S/. ${calcularTotal().toFixed(2)} a +51 990662988</p>
        `;
    } else if (metodo === 'plin') {
        detallesDiv.innerHTML = `
            <p>Usa Plin para enviar a +51 902023598.</p>
            <p>Total a pagar: S/. ${calcularTotal().toFixed(2)}</p>
        `;
    } else if (metodo === 'mercado-pago') {
        detallesDiv.innerHTML = `
            <p>Redirigiendo a Mercado Pago.</p>
            <p>Total a pagar: S/. ${calcularTotal().toFixed(2)}</p>
        `;
    } else {
        detallesDiv.innerHTML = '';
    }
}

function calcularTotal() {
    return carrito.reduce((sum, i) => sum + (i.precio * i.cantidad), 0);
}

document.getElementById('metodo-pago').addEventListener('change', actualizarDetallesPago);

document.getElementById('form-pago').addEventListener('submit', function(e) {
    e.preventDefault();
    const metodo = document.getElementById('metodo-pago').value;
    const total = calcularTotal();
    let url = '';
    if (metodo === 'tarjeta') {
        url = 'https://sandbox.payu.com/'; // Ejemplo; integra API real
        alert('Redirigiendo a pago con tarjeta. Total: S/. ' + total.toFixed(2));
    } else if (metodo === 'yape') {
        url = 'https://yapeapp.pe/990662988' + total; // Abre app Yape
    } else if (metodo === 'plin') {
        url = 'https://plin.com/pay?phone=51902023598&amount=' + total; // Simular Plin
    } else if (metodo === 'mercado-pago') {
        url = 'https://www.mercadopago.com.pe/checkout/v1/redirect?pref_id=SIMULADO'; // Integra real
    }
    if (url) {
        window.open(url, '_blank');
        vaciarCarrito();
        toggleCheckout();
    } else {
        alert('Selecciona un método de pago.');
    }
});

// Inicializar carrito al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    actualizarContador();
});

// Registro e Inicio de Sesión
function toggleRegister() {
    const modal = document.getElementById('register');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function toggleLogin() {
    const modal = document.getElementById('login');
    modal.style.display = modal.style.display === 'block' ? 'none' : 'block';
}

function actualizarEstadoUsuario() {
    const user = JSON.parse(localStorage.getItem('user')) || auth.currentUser;
    const userName = document.getElementById('user-name');
    const btnLogin = document.getElementById('btn-login');
    const btnRegister = document.getElementById('btn-register');
    const btnLogout = document.getElementById('btn-logout');

    if (user) {
        userName.textContent = `Bienvenido, ${user.displayName || user.nombre || 'Usuario'}`;
        btnLogin.style.display = 'none';
        btnRegister.style.display = 'none';
        btnLogout.style.display = 'inline-block';
    } else {
        userName.textContent = 'Inicia Sesión';
        btnLogin.style.display = 'inline-block';
        btnRegister.style.display = 'inline-block';
        btnLogout.style.display = 'none';
    }
}

document.getElementById('form-register').addEventListener('submit', function(e) {
    e.preventDefault();
    const nombre = document.getElementById('register-nombre').value;
    const email = document.getElementById('register-email').value;
    const password = document.getElementById('register-password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    if (users.find(u => u.email === email)) {
        alert('Este correo ya está registrado.');
        return;
    }
    users.push({ nombre, email, password });
    localStorage.setItem('users', JSON.stringify(users));
    localStorage.setItem('user', JSON.stringify({ nombre, email }));
    alert('Registro exitoso. ¡Inicia sesión!');
    toggleRegister();
    actualizarEstadoUsuario();
});

document.getElementById('form-login').addEventListener('submit', function(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;

    let users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        alert('Inicio de sesión exitoso.');
        toggleLogin();
        actualizarEstadoUsuario();
    } else {
        alert('Correo o contraseña incorrectos.');
    }
});

function loginWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            localStorage.setItem('user', JSON.stringify({
                nombre: result.user.displayName,
                email: result.user.email
            }));
            toggleLogin();
            toggleRegister();
            actualizarEstadoUsuario();
            alert('Inicio de sesión con Google exitoso.');
        })
        .catch(error => {
            alert('Error al iniciar con Google: ' + error.message);
        });
}

function loginWithFacebook() {
    const provider = new firebase.auth.FacebookAuthProvider();
    auth.signInWithPopup(provider)
        .then(result => {
            localStorage.setItem('user', JSON.stringify({
                nombre: result.user.displayName,
                email: result.user.email
            }));
            toggleLogin();
            toggleRegister();
            actualizarEstadoUsuario();
            alert('Inicio de sesión con Facebook exitoso.');
        })
        .catch(error => {
            alert('Error al iniciar con Facebook: ' + error.message);
        });
}

function cerrarSesion() {
    localStorage.removeItem('user');
    auth.signOut().then(() => {
        actualizarEstadoUsuario();
        alert('Sesión cerrada.');
    });
}

// Inicializar al cargar
document.addEventListener('DOMContentLoaded', function() {
    actualizarContador();
    actualizarEstadoUsuario();
});
