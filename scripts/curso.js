
class Producto {
    constructor(nombre, precio) {
        this.nombre = nombre;
        this.precio = precio;
    }
}

class CarritoDeCompras {
    constructor() {
        this.productos = [];
    }

    agregarProducto(nombre, precio) {
        if (!isNaN(precio)) {
            const producto = new Producto(nombre, precio);
            this.productos.push(producto);
            this.actualizarListaProductos();
            console.log(`Producto agregado: ${producto.nombre} - $${producto.precio}`);
        } else {
            alert("El precio ingresado no es válido.");
        }
    }

    actualizarListaProductos() {
        const productosDiv = document.getElementById("productos");
        productosDiv.innerHTML = "";
        this.productos.forEach(producto => {
            productosDiv.innerHTML += `<p>${producto.nombre}: $${producto.precio}</p>`;
        });
    }

    calcularTotal() {
        const total = this.productos.reduce((acumulador, producto) => acumulador + producto.precio, 0);
        document.getElementById("total").textContent = total.toFixed(2);
        console.log(`Total calculado: $${total.toFixed(2)}`);
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