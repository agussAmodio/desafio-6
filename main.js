const cors = require('cors');
const express = require("express");
const app = express();
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static('views'))
const { Server: SocketServer } = require("socket.io");
const { Server: HttpServer } = require("http");
const httpServer = new HttpServer(app);
const io = new SocketServer(httpServer);


const productos = [{"tittle": "Monitor" , "price": 50000 , "thumbnail": "www.monitor.com.ar"}, {"tittle": "Teclado" , "price": 10000 , "thumbnail": "www.teclado.com.ar"} , {"tittle": "Joystick" , "price": 15000 , "thumbnail": "www.joystick.com.ar"},{"tittle": "celular", "price": 50000 , "thumbnail": "www.celular.com.ar" }]
const mensajes = []

// socket.io

io.on("connection", (socket) => {
    console.log(`conectado: ${socket.id}`);
    socket.emit("mensajes", mensajes);
})
//Escuchar los mensajes nuevos

socket.on('mensaje' , (data)=>{
    console.log(data);
    mensajes.push({socketid: socket.id , mensaje: data })
})


//Asignacion de id
for (let i=0; i<productos.length; i++){
    if (i === 0){
        const id = 1
        productos[i].id = id
    }else{
        let ultimoProducto = productos[i-1]
        let idActual = ultimoProducto.id
        id = idActual + 1
        productos[i].id = id
    }
}

//Muesta todos los productos 
app.get('/productos' , async (req , res) =>{
    res.send(productos)
})


//Agrega productos
app.post('/productos' ,  (req , res) => {
    const {tittle , price , thumbnail} = req.body
    console.log(req.body);
    let ultimoProducto = productos[productos.length - 1 ]
    let id = ultimoProducto.id + 1
    const productoRecibido = {tittle, price , thumbnail, id}
    productos.push(productoRecibido)
    return res.redirect("/")
    res.send(`el producto fue agregado exitosamente`)
})

app.listen(8080 , ()=> {
    console.log("conectado!");
})
