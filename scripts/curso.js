
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class CarritoDeCompras {
    constructor() {
        // Carga productos desde localStorage o crea un array vacío si no existe.
        this.productos = JSON.parse(localStorage.getItem('productos')) || [];
    }

    agregarProducto(nombre, precio) {
        if (!isNaN(precio)) {
            const producto = new Producto(nombre, precio);
            this.productos.push(producto);
            this.actualizarListaProductos();
            this.actualizarLocalStorage(); // Actualiza el localStorage
            console.log(`Producto agregado: ${producto.nombre} - $${producto.precio}`);
        } else {
            alert("El precio ingresado no es válido.");
        }
    }

    eliminarProducto(index) {
        this.productos.splice(index, 1);
        this.actualizarListaProductos();
        this.actualizarLocalStorage();
    }

    actualizarListaProductos() {
        const productosDiv = document.getElementById("productos");
        productosDiv.innerHTML = "";
        this.productos.forEach((producto, index) => {
            productosDiv.innerHTML += `<p>${producto.nombre}: $${producto.precio} <button onclick="eliminarProducto(${index})">Eliminar</button></p>`;
        });
    }

    calcularTotal() {
        const total = this.productos.reduce((acumulador, producto) => acumulador + producto.precio, 0);
        document.getElementById("total").textContent = total.toFixed(2);
        console.log(`Total calculado: $${total.toFixed(2)}`);
    }

    actualizarLocalStorage() {
        localStorage.setItem('productos', JSON.stringify(this.productos));
    }
}

const carrito = new CarritoDeCompras();

function agregarProducto() {
    const nombre = prompt("Ingrese el nombre del producto:");
    if (nombre !== null && nombre !== "") {
        const precio = parseFloat(prompt("Ingrese el precio del producto:"));
        carrito.agregarProducto(nombre, precio);
    }
}

function eliminarProducto(index) {
    carrito.eliminarProducto(index);
}
