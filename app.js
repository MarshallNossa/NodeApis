import {createServer} from "http";

//Creamos el servidor, lo metemos en una variable y le mandamos un mensaje
let myServer = createServer((req, res)=>{
    let datos = "";
    //Le decimos al request que renderice todo lo que entre y cuando finaliza manda la promesa y la muestra
    req.on("data", (chunk)=>{
        datos += chunk;
    })
    req.on("end", ()=>{
        res.end(datos);
    })
})

//Creamos una variable con la configuración del server
const config = {
    hostname: "127.9.0.128",
    port: 5687
}

//Levantamos el servidor
myServer.listen(config, ()=>{
    /* console.log(`http://${config.hostname}:${config.port}/`); */
})