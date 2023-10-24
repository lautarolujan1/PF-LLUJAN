class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class CarritoDeCompras {
    constructor() {
        this.productos = JSON.parse(localStorage.getItem('productos')) || [];
        this.total = 0;
        this.actualizarListaProductosEnTiempoReal();
    }

    agregarProducto(nombre, precio) {
        if (!isNaN(precio)) {
            const producto = new Producto(nombre, precio);
            this.productos.push(producto);
            this.actualizarLocalStorage();
            this.actualizarListaProductosEnTiempoReal();
            console.log(`Producto agregado: ${producto.nombre} - $${producto.precio}`);
        } else {
            this.mostrarError("El precio ingresado no es válido.");
        }
    }

    eliminarProducto(index) {
        this.productos.splice(index, 1);
        this.actualizarListaProductosEnTiempoReal();
        this.actualizarLocalStorage();
    }

    calcularTotal() {
        this.total = this.productos.reduce((acumulador, producto) => acumulador + producto.precio, 0);
        document.getElementById("total").textContent = this.total.toFixed(2);
        console.log(`Total calculado: $${this.total.toFixed(2)}`);
    }

    iniciarCarrito() {
        this.productos = [];
        this.total = 0;
        this.actualizarListaProductosEnTiempoReal();
        this.actualizarLocalStorage();
        this.calcularTotal();
    }

    actualizarListaProductosEnTiempoReal() {
        const productosDiv = document.getElementById("productos");
        productosDiv.innerHTML = "";

        this.productos.forEach((producto, index) => {
            productosDiv.innerHTML += `<p>${producto.nombre}: $${producto.precio} <button data-index="${index}">Eliminar</button></p>`;
        });

        if (this.total !== 0) {
            this.calcularTotal();
        }
    }

    actualizarLocalStorage() {
        localStorage.setItem('productos', JSON.stringify(this.productos));
    }

    mostrarError(mensaje) {
        const errorDiv = document.getElementById("error");
        errorDiv.textContent = mensaje;
    }
}

const carrito = new CarritoDeCompras();

function agregarProducto() {
    const nombreInput = document.getElementById("nombreProducto");
    const precioInput = document.getElementById("precioProducto");

    const nombre = nombreInput.value;
    const precio = parseFloat(precioInput.value);

    if (nombre && !isNaN(precio)) {
        carrito.agregarProducto(nombre, precio);
        nombreInput.value = "";
        precioInput.value = "";
    } else {
        carrito.mostrarError("Ingresa un nombre y un precio válidos.");
    }
}

document.getElementById("agregarProducto").addEventListener("click", agregarProducto);

document.getElementById("calcularTotal").addEventListener("click", function () {
    carrito.calcularTotal();
});

document.getElementById("iniciar").addEventListener("click", function () {
    carrito.iniciarCarrito();
});

document.getElementById("productos").addEventListener("click", function (event) {
    if (event.target && event.target.tagName === "BUTTON") {
        const index = event.target.dataset.index;
        carrito.eliminarProducto(index);
    }
});
