const express = require("express");
const app = express();
const path = require("path");
const PUERTO = 4237;

let clientes = [
  {
    usuario: "maria",
    contrasenia: "1234",
  },
  {
    usuario: "pepe",
    contrasenia: "1122",
  },
];

// Middleware para poner el contenido de un form post en req.body
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos de recursos estáticos (css,html)
app.use(express.static(`${__dirname}/cliente`));

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
      console.log("Logeado correctamente");
      break;
    } else {
      res.sendFile(path.join(__dirname, "cliente/login.html"));
      break;
    }
  }
});

//GET cuando quiere registrarse deriva a html de registro
app.get("/registro", function (req, res) {
  res.sendFile(path.join(__dirname, "cliente/registro.html"));
});

//POST registro
app.post("/registro", function (req, res) {
  const usuarioNvo = req.body.usuarioNvo;
  const contNva = req.body.contNueva;
  const contRepet = req.body.contRep;

  for (i = 0; i <= clientes.length; i++) {
    if (
      usuarioNvo === clientes[i].usuario ||
      (usuarioNvo !== clientes[i].usuario && contNva !== contRepet)
    ) {
      res.sendFile(path.join(__dirname, "cliente/registro.html"));
      break;
    } else {
      clientes.push({ usuario: usuarioNvo, contrasenia: contNva });
      res.sendFile(path.join(__dirname, "cliente/login.html"));
    }
  }
});

//Inicio el servidor
app.listen(PUERTO, function () {
  console.log(`Iniciando servidor en el puerto ${PUERTO}`);
});
