const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const productosEnStock = ["banana", "cebollas", "lechuga", "pimenton", "papas", "tomate"]
let cantidad = 0;
let carrito = [];

app.listen(3000, () => console.log("El servidor está inicializado en el puerto 3000"));

app.use(express.static('assets'));

app.engine("handlebars", exphbs.engine({
  layoutsDir: __dirname + "/views",
  partialsDir: __dirname + "/views/components/",
}));

app.set("view engine", "handlebars");

app.use("/css", express.static(__dirname + "/node_modules/bootstrap/dist/css"));

app.get("/", (req, res) => {
  res.render("Inicio", {
    layout: "Inicio",
    cantidad: cantidad
  });
});

app.get("/Productos", (req, res) => {
  res.render("Productos", {
    layout: "Productos",
    productos: productosEnStock,
    cantidad: cantidad
  });
});

app.get("/Carro", (req, res) => {
  res.render("Carro", {
    layout: "Carro",
    cantidad: cantidad,
    carrito: carrito
  });
});

app.get("/Productos/:producto", (req, res) => {
  const { producto } = req.params;
  cantidad = cantidad + 1
  carrito.push(producto);
  carrito.sort();
  res.render("Productos", {
    layout: "Productos",
    productos: productosEnStock,
    cantidad: cantidad
  });
});

app.get("/Carro/:eliminar", (req, res) => {
  const eliminarProducto = req.params.eliminar;
  if (cantidad > 0 && carrito.includes(eliminarProducto)) {
    const indiceProducto = carrito.findIndex(e => e == eliminarProducto);
    carrito.splice(indiceProducto, 1);
    cantidad = cantidad - 1;
    res.render("Carro", {
      layout: "Carro",
      cantidad: cantidad,
      carrito: carrito
    });
  }
})

app.get('*', (req, res) => {
  res.send('<center><h1>Esta página no existe...</h1> </center>')
})