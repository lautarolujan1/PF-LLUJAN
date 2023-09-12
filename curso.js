
let total = 0;
const productos = [];

function agregarProducto() {
    const nombre = prompt("Ingrese el nombre del producto:");
    if (nombre !== null && nombre !== "") {
        const precio = parseFloat(prompt("Ingrese el precio del producto:"));
        if (!isNaN(precio)) {
            productos.push({ nombre, precio });
            actualizarListaProductos();
            console.log("Producto agregado: " + nombre + " - $" + precio);
        } else {
            alert("El precio ingresado no es válido.");
        }
    }
}

function actualizarListaProductos() {
   const productosDiv = document.getElementById("productos");
   productosDiv.innerHTML = "";
   let indice = 0;

   while (indice < productos.length) {
       const producto = productos[indice];
       productosDiv.innerHTML += `<p>${producto.nombre}: $${producto.precio}</p>`;
       indice++;
   }
}

function calcularTotal() {
   total = 0;
   let indice = 0;

   while (indice < productos.length) {
       total += productos[indice].precio;
       indice++;
   }

   document.getElementById("total").textContent = total.toFixed(2);
   console.log("Total calculado: $" + total.toFixed(2));
}