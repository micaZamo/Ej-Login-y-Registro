const express=require("express");
const app=express();
const path=require("path")
const PUERTO=4101

// Middleware para poner el contenido de un form post en req.body
app.use(express.urlencoded({ extended: true }));

// Middleware para archivos de recursos estáticos (css,html)
app.use(express.static(__dirname));

//GET inicial retorna a la pagina de login
app.get("/",function(req,res){
    res.sendFile(path.join(__dirname,"login.html"))
})



//Inicio el servidor
app.listen(PUERTO,function(){
    console.log(`Iniciando servidor en el puerto ${PUERTO}`)
})