const express = require("express");
const app = express();
const path = require("path");
const PUERTO = 4101;

const clientes = [
  {
    usuario: "maria",
    contrasenia: 1234,
  },
  {
    usuario: "pepe",
    contrasenia: 1111,
  },
];
// Middleware para poner el contenido de un form post en req.body
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos de recursos estáticos (css,html)
app.use(express.static(path.join(__dirname, "cliente")));

//GET inicial retorna a la pagina de login
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "cliente/login.html"));
});

//POST verifica los datos ingresados por el cliente al iniciar sesion
app.post("/login", function (req, res) {
  const usuarioIngresado = req.body.usuario;
  const contIngresada = req.body.contrasenia;
  for (let i = 0; i < clientes.length; i++) {
    if (
      usuarioIngresado === clientes[i].usuario &&
      contIngresada === clientes[i].contrasenia
    ) {
      res.sendFile(path.join(__dirname, "cliente/bienvenida.html"));
    } else {
      console.log("Usuario y/o contraseña incorrectas");
      res.sendFile(path.join(__dirname, "cliente/login.html"));
    }
  }
});

//Inicio el servidor
app.listen(PUERTO, function () {
  console.log(`Iniciando servidor en el puerto ${PUERTO}`);
});
